
import React, { useState, useEffect, useRef } from 'react';
import './Locations.css';
import DesktopLocationImg from '../../assets/images/Desktoplocation.png';
import MainFooter from "../../common/MainFooter";

const Locations = () => {
  // -------------------- State --------------------
  const [searchQuery, setSearchQuery] = useState("")
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [mapError, setMapError] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [searchedLocation, setSearchedLocation] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [predictions, setPredictions] = useState([])
  const [showPredictions, setShowPredictions] = useState(false)
  const [locationsLoaded, setLocationsLoaded] = useState(false) // Track if locations are loaded

  // -------------------- Refs --------------------
  const mapRef = useRef(null)
  const googleMapRef = useRef(null)
  const markersRef = useRef([])
  const autocompleteService = useRef(null)
  const hasLoadedLocations = useRef(false)

  // -------------------- Util: Icon per Service --------------------
  const getServiceIcon = service => {
    const iconMap = {
      fuel: "⛽",
      food: "🍔",
      car_wash: "🚿",
      atm: "🏧",
      shop: "🏪",
      coffee: "☕",
      restroom: "🚻",
      parking: "🅿️",
    }
    return iconMap[service] || "🔧"
  }

  // -------------------- Util: Distance Calculator --------------------
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // -------------------- Util: Nearest Location Picker --------------------
  const findNearestLocations = (refLat, refLng, list) => {
    return list
      .map(loc => ({
        ...loc,
        distance: calculateDistance(refLat, refLng, loc.lat, loc.lng),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2)
  }

  // -------------------- Location: User's Current Location // Update getCurrentLocation to accept the locations data:
  const getCurrentLocation = locationsList => {
    const locationsData = locationsList || locations

    if (!navigator.geolocation) {
      console.log("Geolocation not available")
      return
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords
        console.log("Got user location:", latitude, longitude)
        setUserLocation({ lat: latitude, lng: longitude })

        const nearest = findNearestLocations(latitude, longitude, locationsData)
        console.log("Found nearest stations:", nearest.length)

        setFilteredLocations(nearest)

        if (googleMapRef.current) {
          googleMapRef.current.setCenter({ lat: latitude, lng: longitude })
          googleMapRef.current.setZoom(13) // Zoom in a bit more
          addMarkersToMap(nearest)
        }
      },
      err => {
        console.error("Error getting location:", err)
        // Don't override what we've already set in fetchLocations
      }
    )
  }

  // -------------------- Location: Search Text Query --------------------
  const searchLocation = async query => {
    if (!query.trim() || !window.google) return
    setIsSearching(true)

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    )
    const request = { query, fields: ["name", "geometry"] }

    service.textSearch(request, (results, status) => {
      setIsSearching(false)
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results[0]
      ) {
        const place = results[0]
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        setSearchedLocation(location)

        const nearest = findNearestLocations(
          location.lat,
          location.lng,
          locations
        )
        setFilteredLocations(nearest)

        if (googleMapRef.current) {
          googleMapRef.current.setCenter(location)
          googleMapRef.current.setZoom(13)
          addMarkersToMap(nearest)

          new window.google.maps.Marker({
            position: location,
            map: googleMapRef.current,
            title: "Searched Location",
            icon: {
              url: "data:image/svg+xml...%23FF0000...",
              scaledSize: new window.google.maps.Size(35, 35),
            },
          })
        }
      } else {
        console.error("Location search failed:", status)
      }
    })
  }

  // -------------------- Autocomplete Prediction --------------------
  const getPlacePredictions = input => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService()
    }

    if (!autocompleteService.current) return

    autocompleteService.current.getPlacePredictions(
      { input },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setPredictions(predictions)
          setShowPredictions(true)
        } else {
          setPredictions([])
          setShowPredictions(false)
        }
      }
    )
  }

  // Modified version of searchLocationByPlaceId
  const searchLocationByPlaceId = (placeId, description) => {
    if (!window.google || !placeId) return

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    )

    service.getDetails(
      { placeId, fields: ["geometry"] },
      async (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place?.geometry?.location
        ) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }

          setSearchQuery(description)
          setSearchedLocation(location)
          setIsSearching(true)

          try {
            // Use the nearby stations endpoint
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/stations/nearby?lng=${
                location.lng
              }&lat=${location.lat}&radius=20`
            )

            if (!response.ok) throw new Error("Failed to fetch nearby stations")

            const nearbyStations = await response.json()

            // Transform GeoJSON format to flat lat/lng properties
            const transformedStations = nearbyStations
              .map(station => {
                const stationData = station._doc || station

                return {
                  id: stationData._id,
                  name: stationData.name,
                  address: stationData.address,
                  services: stationData.services,
                  phone: stationData.phone,
                  operatingHours: stationData.operatingHours,
                  // Extract coordinates correctly
                  lat: stationData.location?.coordinates
                    ? stationData.location.coordinates[1]
                    : null,
                  lng: stationData.location?.coordinates
                    ? stationData.location.coordinates[0]
                    : null,
                  // Keep the distance if available
                  distance: station.distance,
                }
              })
              .filter(station => station.lat && station.lng)

            // Take the closest stations
            const closest = transformedStations.slice(0, 2)
            setFilteredLocations(closest)

            if (googleMapRef.current) {
              googleMapRef.current.setCenter(location)
              googleMapRef.current.setZoom(13)
              addMarkersToMap(closest)

              // Add marker for searched location
              new window.google.maps.Marker({
                position: location,
                map: googleMapRef.current,
                title: "Searched Location",
                icon: {
                  url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='40' height='40'><circle cx='12' cy='12' r='10' fill='%23FF0000' stroke='%23FFFFFF' stroke-width='2'/></svg>",
                  scaledSize: new window.google.maps.Size(30, 30),
                },
              })
            }
          } catch (error) {
            console.error("Error fetching nearby stations:", error)
            // Fallback to client-side distance calculation if API fails
            const nearest = findNearestLocations(
              location.lat,
              location.lng,
              locations
            )
            setFilteredLocations(nearest)

            if (googleMapRef.current) {
              googleMapRef.current.setCenter(location)
              googleMapRef.current.setZoom(13)
              addMarkersToMap(nearest)
            }
          } finally {
            setIsSearching(false)
          }
        } else {
          console.error("Failed to retrieve location by placeId:", status)
          setIsSearching(false)
        }
      }
    )
  }

  // -------------------- Search Input Events --------------------
  const handleSearch = e => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === "") {
      if (userLocation) {
        const nearest = findNearestLocations(
          userLocation.lat,
          userLocation.lng,
          locations
        )
        setFilteredLocations(nearest)
        if (googleMapRef.current) addMarkersToMap(nearest)
      } else {
        setFilteredLocations(locations.slice(0, 2))
        if (googleMapRef.current) addMarkersToMap(locations.slice(0, 2))
      }
      setSearchedLocation(null)
      setPredictions([])
      setShowPredictions(false)
    } else {
      getPlacePredictions(query)
    }
  }

  const handleSearchSubmit = e => {
    e.preventDefault()
    setShowPredictions(false)
    if (searchQuery.trim() && predictions.length > 0) {
      searchLocationByPlaceId(
        predictions[0].place_id,
        predictions[0].description
      )
    }
  }

  const handlePredictionClick = prediction => {
    searchLocationByPlaceId(prediction.place_id, prediction.description)
  }

  // -------------------- Map Initialization --------------------
  const initializeMap = () => {
    if (!mapRef.current || !window.google) {
      setMapError("Map container not ready or Google Maps not loaded.")
      return
    }

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -36.8485, lng: 174.7633 },
        zoom: 11,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      })

      googleMapRef.current = map
      setMapError(null)

      // addMarkersToMap and getCurrentLocation removed from here - to address issues with multiple fetches
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError("Failed to initialize Google Maps. Please refresh the page.")
    }
  }

  const addMarkersToMap = locationList => {
    if (!googleMapRef.current || !window.google) return

    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    locationList.forEach(location => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: googleMapRef.current,
        title: location.name,
        icon: {
          url: "data:image/svg+xml...%23F37120...",
          scaledSize: new window.google.maps.Size(40, 40),
        },
      })

      marker.addListener("click", () => {
        setSelectedLocation(location)
        googleMapRef.current.setCenter({ lat: location.lat, lng: location.lng })
        googleMapRef.current.setZoom(15)
      })

      markersRef.current.push(marker)
    })
  }

  // -------------------- Click Event: Location Item --------------------
  const handleLocationClick = location => {
    setSelectedLocation(location)
    if (googleMapRef.current) {
      googleMapRef.current.setCenter({ lat: location.lat, lng: location.lng })
      googleMapRef.current.setZoom(15)
    }
  }

  // -------------------- Data Fetching: Location List --------------------
  const fetchLocations = async () => {
    // Only fetch if we haven't already
    if (hasLoadedLocations.current) {
      return
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/stations/with-services`
      )

      if (!res.ok) throw new Error("Failed to fetch locations")

      const data = await res.json()

      // Transform GeoJSON format to flat lat/lng properties
      const transformedData = data
        .map(station => ({
          ...station,
          lat: station.location?.coordinates
            ? station.location.coordinates[1]
            : null,
          lng: station.location?.coordinates
            ? station.location.coordinates[0]
            : null,
        }))
        .filter(station => station.lat && station.lng) // Remove any without valid coordinates

      // Mark as loaded to prevent duplicate fetches
      hasLoadedLocations.current = true

      setLocations(transformedData)

      // Default to showing the first 2 locations immediately (important change)
      setFilteredLocations(transformedData.slice(0, 2))
      setLocationsLoaded(true)

      // If map is ready, show these on map
      if (googleMapRef.current) {
        addMarkersToMap(transformedData.slice(0, 2))
      }

      // Now get user location in the background
      getCurrentLocation(transformedData)

      return transformedData // Return the data for chaining
    } catch (err) {
      console.error("Error fetching locations:", err)

      // sample (fallback)
      const fallbackLocations = [
        {
          id: 1,
          name: "Z Station Papakura",
          address: "26 Clevedon Road, Papakura, Auckland",
          phone: "09-1234-5678",
          lat: -37.0653,
          lng: 174.9447,
          services: ["fuel", "food", "car_wash", "atm", "shop"],
          operatingHours: {
            Sun: "24 Hours",
            Mon: "5:00am-10pm",
            Tue: "5:00am-10pm",
            Wed: "5:00am-10pm",
            Thu: "5:00am-10pm",
            Fri: "5:00am-11pm",
            Sat: "24 Hours",
          },
        },
        {
          id: 2,
          name: "Z Station Auckland CBD",
          address: "123 Queen Street, Auckland CBD",
          phone: "09-2345-6789",
          lat: -36.8485,
          lng: 174.7633,
          services: ["fuel", "coffee", "atm", "restroom"],
          operatingHours: {
            Sun: "6:00am-11pm",
            Mon: "24 Hours",
            Tue: "24 Hours",
            Wed: "24 Hours",
            Thu: "24 Hours",
            Fri: "24 Hours",
            Sat: "24 Hours",
          },
        },
        {
          id: 3,
          name: "Z Station Newmarket",
          address: "45 Broadway, Newmarket, Auckland",
          phone: "09-3456-7890",
          lat: -36.8699,
          lng: 174.7762,
          services: ["fuel", "food", "coffee", "shop", "restroom"],
          operatingHours: {
            Sun: "6:00am-10pm",
            Mon: "5:00am-11pm",
            Tue: "5:00am-11pm",
            Wed: "5:00am-11pm",
            Thu: "5:00am-11pm",
            Fri: "5:00am-11pm",
            Sat: "6:00am-11pm",
          },
        },
        {
          id: 4,
          name: "Z Station Ponsonby",
          address: "78 Ponsonby Road, Ponsonby, Auckland",
          phone: "09-4567-8901",
          lat: -36.8447,
          lng: 174.7339,
          services: ["fuel", "coffee", "atm", "car_wash"],
          operatingHours: {
            Sun: "7:00am-10pm",
            Mon: "24 Hours",
            Tue: "24 Hours",
            Wed: "24 Hours",
            Thu: "24 Hours",
            Fri: "24 Hours",
            Sat: "24 Hours",
          },
        },
      ]

      setLocations(fallbackLocations)
      setFilteredLocations(fallbackLocations.slice(0, 2))
      return fallbackLocations
    }
  }

  const setupLocationDisplay = () => {
    if (locations.length > 0 && googleMapRef.current) {
      console.log(
        "Setting up location display with",
        locations.length,
        "locations"
      )

      // Always show at least the first 2 locations
      if (filteredLocations.length === 0) {
        setFilteredLocations(locations.slice(0, 2))
      }

      // Add markers for whatever is currently in filteredLocations
      addMarkersToMap(filteredLocations)
    }
  }

  // -------------------- useEffect: Init on Mount --------------------
  useEffect(() => {
    console.log("Component mounting...")

    // Load locations first, then handle map
    fetchLocations().then(data => {
      console.log("Locations loaded, initializing map if needed")
      if (googleMapRef.current) {
        setupLocationDisplay()
      }
    })

    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      // Check if the script is already in the process of loading
      const existingScript = document.getElementById("google-maps-script")
      if (existingScript) {
        existingScript.addEventListener("load", initializeMap)
        return
      }

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        setMapError("Google Maps API key is not configured.")
        return
      }

      const script = document.createElement("script")
      script.id = "google-maps-script" // Set id attribute on the script element // Needed for checking script
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        console.log("Google Maps script loaded successfully")
        initializeMap()

        // After map is initialized, check if we have locations data
        if (locationsLoaded) {
          console.log("Locations already loaded, setting up display")
          setupLocationDisplay()
        }
      }
      script.onerror = () => setMapError("Failed to load Google Maps.")
      document.head.appendChild(script)

      return () => {
        // Only remove if we added it in this component
        const scriptToRemove = document.getElementById("google-maps-script")
        if (scriptToRemove && scriptToRemove === script) {
          document.head.removeChild(scriptToRemove)
        }
      }
    }

    loadGoogleMaps()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="banner-container">
        <img
          src={DesktopLocationImg}
          alt="Location Banner"
          className="banner-image"
        />
        <div className="banner-text">Find a fuel station near you</div>
      </div>

      <div className="locations-container">
        <div className="locations-sidebar">
          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Enter Your Location"
                value={searchQuery}
                onChange={handleSearch}
                className="location-search-input"
              />
              <button
                type="submit"
                className="search-button"
                disabled={isSearching}>
                {isSearching ? (
                  <div className="search-loading">⏳</div>
                ) : (
                  <div className="search-icon">🔍</div>
                )}
              </button>
            </form>
          </div>

          <div className="locations-list">
            {filteredLocations.map((location, index) => (
              <div
                key={location.id || `loc-${index}`}
                className={`location-card ${
                  selectedLocation?.id === location.id ? "selected" : ""
                }`}
                onClick={() => handleLocationClick(location)}>
                <div className="location-card-header">
                  <h3 className="location-title">
                    {location.name}
                    {location.distance && (
                      <span className="distance-badge">
                        {location.distance < 1
                          ? `${Math.round(location.distance * 1000)}m`
                          : `${location.distance.toFixed(1)}km`}
                      </span>
                    )}
                  </h3>
                  <p className="location-address">{location.address}</p>
                </div>

                <div className="location-card-content">
                  <div className="location-left-section">
                    <div className="services-section">
                      <h4 className="services-title">Services Offered</h4>
                      <div className="services-icons">
                        {location.services &&
                          location.services.map(service => (
                            <div
                              key={`${location.id}-${service}`}
                              className="service-icon"
                              title={service}>
                              {getServiceIcon(service)}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="contact-section">
                      <h4 className="contact-title">Contact Store</h4>
                      <div className="phone-container">
                        <div className="phone-icon">📞</div>
                        <a
                          href={`tel:${location.phone}`}
                          className="phone-number">
                          {location.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="location-right-section">
                    {/* Revised to handle unexpected data types such as id being displayed */}
                    <div className="hours-section">
                      {location.operatingHours &&
                        typeof location.operatingHours === "object" &&
                        Object.entries(location.operatingHours)
                          .filter(
                            ([key, value]) => key !== "_id" && key !== "id"
                          ) // Filter out ID fields
                          .map(([day, hours]) => (
                            <div key={day} className="hours-row">
                              <span className="day-label">{day}</span>
                              <span className="hours-text">{hours}</span>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="map-container">
          {mapError ? (
            <div className="map-error">
              <div className="error-content">
                <h3>Unable to load map</h3>
                <p>{mapError}</p>
                <button onClick={() => window.location.reload()}>
                  Refresh
                </button>
              </div>
            </div>
          ) : (
            <div ref={mapRef} className="google-map"></div>
          )}
        </div>
      </div>
      <MainFooter />
    </>
  )
}

export default Locations
