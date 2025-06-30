import React, { useState, useEffect, useRef } from 'react';
import './Locations.css';
import DesktopLocationImg from '../../assets/images/Desktoplocation.png';

const Locations = () => {
 // -------------------- State --------------------
const [searchQuery, setSearchQuery] = useState('');
const [locations, setLocations] = useState([]);
const [filteredLocations, setFilteredLocations] = useState([]);
const [selectedLocation, setSelectedLocation] = useState(null);
const [mapError, setMapError] = useState(null);
const [userLocation, setUserLocation] = useState(null);
const [searchedLocation, setSearchedLocation] = useState(null);
const [isSearching, setIsSearching] = useState(false);
const [predictions, setPredictions] = useState([]);
const [showPredictions, setShowPredictions] = useState(false);

// -------------------- Refs --------------------
const mapRef = useRef(null);
const googleMapRef = useRef(null);
const markersRef = useRef([]);
const autocompleteService = useRef(null);

// -------------------- Util: Icon per Service --------------------
const getServiceIcon = (service) => {
  const iconMap = {
    fuel: '⛽', food: '🍔', car_wash: '🚿', atm: '🏧',
    shop: '🏪', coffee: '☕', restroom: '🚻', parking: '🅿️'
  };
  return iconMap[service] || '🔧';
};

// -------------------- Util: Distance Calculator --------------------
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// -------------------- Util: Nearest Location Picker --------------------
const findNearestLocations = (refLat, refLng, list) => {
  return list
    .map(loc => ({
      ...loc,
      distance: calculateDistance(refLat, refLng, loc.lat, loc.lng)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2);
};

// -------------------- Location: User's Current Location --------------------
const getCurrentLocation = () => {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      setUserLocation({ lat: latitude, lng: longitude });

      const nearest = findNearestLocations(latitude, longitude, locations);
      setFilteredLocations(nearest);

      if (googleMapRef.current) {
        googleMapRef.current.setCenter({ lat: latitude, lng: longitude });
        addMarkersToMap(nearest);
      }
    },
    (err) => {
      console.error('Error getting location:', err);
      setFilteredLocations(locations.slice(0, 2)); // fallback
    }
  );
};

// -------------------- Location: Search Text Query --------------------
const searchLocation = async (query) => {
  if (!query.trim() || !window.google) return;
  setIsSearching(true);

  const service = new window.google.maps.places.PlacesService(document.createElement('div'));
  const request = { query, fields: ['name', 'geometry'] };

  service.textSearch(request, (results, status) => {
    setIsSearching(false);
    if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
      const place = results[0];
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      setSearchedLocation(location);

      const nearest = findNearestLocations(location.lat, location.lng, locations);
      setFilteredLocations(nearest);

      if (googleMapRef.current) {
        googleMapRef.current.setCenter(location);
        googleMapRef.current.setZoom(13);
        addMarkersToMap(nearest);

        new window.google.maps.Marker({
          position: location,
          map: googleMapRef.current,
          title: 'Searched Location',
          icon: {
            url: 'data:image/svg+xml...%23FF0000...',
            scaledSize: new window.google.maps.Size(35, 35),
          }
        });
      }
    } else {
      console.error('Location search failed:', status);
    }
  });
};

// -------------------- Autocomplete Prediction --------------------
const getPlacePredictions = (input) => {
  if (!autocompleteService.current && window.google) {
    autocompleteService.current = new window.google.maps.places.AutocompleteService();
  }

  if (!autocompleteService.current) return;

  autocompleteService.current.getPlacePredictions(
    { input },
    (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setPredictions(predictions);
        setShowPredictions(true);
      } else {
        setPredictions([]);
        setShowPredictions(false);
      }
    }
  );
};

const searchLocationByPlaceId = (placeId, description) => {
  if (!window.google || !placeId) return;

  const service = new window.google.maps.places.PlacesService(document.createElement('div'));
  service.getDetails({ placeId, fields: ['geometry'] }, (place, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      setSearchQuery(description);
      setSearchedLocation(location);

      const nearest = findNearestLocations(location.lat, location.lng, locations);
      setFilteredLocations(nearest);

      if (googleMapRef.current) {
        googleMapRef.current.setCenter(location);
        googleMapRef.current.setZoom(13);
        addMarkersToMap(nearest);
      }
    } else {
      console.error('Failed to retrieve location by placeId:', status);
    }
  });
};

// -------------------- Search Input Events --------------------
const handleSearch = (e) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (query.trim() === '') {
    if (userLocation) {
      const nearest = findNearestLocations(userLocation.lat, userLocation.lng, locations);
      setFilteredLocations(nearest);
      if (googleMapRef.current) addMarkersToMap(nearest);
    } else {
      setFilteredLocations(locations.slice(0, 2));
      if (googleMapRef.current) addMarkersToMap(locations.slice(0, 2));
    }
    setSearchedLocation(null);
    setPredictions([]);
    setShowPredictions(false);
  } else {
    getPlacePredictions(query);
  }
};

const handleSearchSubmit = (e) => {
  e.preventDefault();
  setShowPredictions(false);
  if (searchQuery.trim() && predictions.length > 0) {
    searchLocationByPlaceId(predictions[0].place_id, predictions[0].description);
  }
};

const handlePredictionClick = (prediction) => {
  searchLocationByPlaceId(prediction.place_id, prediction.description);
};

// -------------------- Map Initialization --------------------
const initializeMap = () => {
  if (!mapRef.current || !window.google) {
    setMapError('Map container not ready or Google Maps not loaded.');
    return;
  }

  try {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -36.8485, lng: 174.7633 },
      zoom: 11,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }]
    });

    googleMapRef.current = map;
    setMapError(null);

    if (locations.length > 0) addMarkersToMap(locations.slice(0, 2));
    getCurrentLocation();
  } catch (error) {
    console.error('Error initializing map:', error);
    setMapError('Failed to initialize Google Maps. Please refresh the page.');
  }
};

const addMarkersToMap = (locationList) => {
  if (!googleMapRef.current || !window.google) return;

  markersRef.current.forEach(marker => marker.setMap(null));
  markersRef.current = [];

  locationList.forEach(location => {
    const marker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: googleMapRef.current,
      title: location.name,
      icon: {
        url: 'data:image/svg+xml...%23F37120...',
        scaledSize: new window.google.maps.Size(40, 40),
      }
    });

    marker.addListener('click', () => {
      setSelectedLocation(location);
      googleMapRef.current.setCenter({ lat: location.lat, lng: location.lng });
      googleMapRef.current.setZoom(15);
    });

    markersRef.current.push(marker);
  });
};

// -------------------- Click Event: Location Item --------------------
const handleLocationClick = (location) => {
  setSelectedLocation(location);
  if (googleMapRef.current) {
    googleMapRef.current.setCenter({ lat: location.lat, lng: location.lng });
    googleMapRef.current.setZoom(15);
  }
};

// -------------------- Data Fetching: Location List --------------------
const fetchLocations = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stations`);
    if (!res.ok) throw new Error('Failed to fetch locations');
    const data = await res.json();
    setLocations(data);
    setFilteredLocations(data.slice(0, 2));
    if (googleMapRef.current) addMarkersToMap(data.slice(0, 2));
  } catch (err) {
    console.error('Error fetching locations:', err);

   // sample (fallback)
    const fallbackLocations = [
      {
        id: 1,
        name: 'Z Station Papakura',
        address: '26 Clevedon Road, Papakura, Auckland',
        phone: '09-1234-5678',
        lat: -37.0653,
        lng: 174.9447,
        services: ['fuel', 'food', 'car_wash', 'atm', 'shop'],
        operatingHours: {
          Sun: '24 Hours',
          Mon: '5:00am-10pm',
          Tue: '5:00am-10pm',
          Wed: '5:00am-10pm',
          Thu: '5:00am-10pm',
          Fri: '5:00am-11pm',
          Sat: '24 Hours',
        },
      },
      {
        id: 2,
        name: 'Z Station Auckland CBD',
        address: '123 Queen Street, Auckland CBD',
        phone: '09-2345-6789',
        lat: -36.8485,
        lng: 174.7633,
        services: ['fuel', 'coffee', 'atm', 'restroom'],
        operatingHours: {
          Sun: '6:00am-11pm',
          Mon: '24 Hours',
          Tue: '24 Hours',
          Wed: '24 Hours',
          Thu: '24 Hours',
          Fri: '24 Hours',
          Sat: '24 Hours',
        },
      },
      {
        id: 3,
        name: 'Z Station Newmarket',
        address: '45 Broadway, Newmarket, Auckland',
        phone: '09-3456-7890',
        lat: -36.8699,
        lng: 174.7762,
        services: ['fuel', 'food', 'coffee', 'shop', 'restroom'],
        operatingHours: {
          Sun: '6:00am-10pm',
          Mon: '5:00am-11pm',
          Tue: '5:00am-11pm',
          Wed: '5:00am-11pm',
          Thu: '5:00am-11pm',
          Fri: '5:00am-11pm',
          Sat: '6:00am-11pm',
        },
      },
      {
        id: 4,
        name: 'Z Station Ponsonby',
        address: '78 Ponsonby Road, Ponsonby, Auckland',
        phone: '09-4567-8901',
        lat: -36.8447,
        lng: 174.7339,
        services: ['fuel', 'coffee', 'atm', 'car_wash'],
        operatingHours: {
          Sun: '7:00am-10pm',
          Mon: '24 Hours',
          Tue: '24 Hours',
          Wed: '24 Hours',
          Thu: '24 Hours',
          Fri: '24 Hours',
          Sat: '24 Hours',
        },
      }
    ];

    setLocations(fallbackLocations);
    setFilteredLocations(fallbackLocations.slice(0, 2));
  }
};

// -------------------- useEffect: Init on Mount --------------------
useEffect(() => {
  fetchLocations();

  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setMapError('Google Maps API key is not configured.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    script.onerror = () => setMapError('Failed to load Google Maps.');
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  };

  loadGoogleMaps();
}, []);


  return (
    <>
      <div className="banner-container">
        <img src={DesktopLocationImg} alt="Location Banner" className="banner-image" />
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
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="search-loading">⏳</div>
                ) : (
                  <div className="search-icon">🔍</div>
                )}
              </button>
            </form>
          </div>

          <div className="locations-list">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                className={`location-card ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                onClick={() => handleLocationClick(location)}
              >
                <div className="location-card-header">
                  <h3 className="location-title">
                    {location.name}
                    {location.distance && (
                      <span className="distance-badge">
                        {location.distance < 1
                          ? `${Math.round(location.distance * 1000)}m`
                          : `${location.distance.toFixed(1)}km`
                        }
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
                        {location.services && location.services.map((service) => (
                          <div key={`${location.id}-${service}`} className="service-icon" title={service}>
                            {getServiceIcon(service)}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="contact-section">
                      <h4 className="contact-title">Contact Store</h4>
                      <div className="phone-container">
                        <div className="phone-icon">📞</div>
                        <a href={`tel:${location.phone}`} className="phone-number">
                          {location.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="location-right-section">
                    <div className="hours-section">
                      {location.operatingHours && Object.entries(location.operatingHours).map(([day, hours]) => (
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
                <button onClick={() => window.location.reload()}>Refresh</button>
              </div>
            </div>
          ) : (
            <div ref={mapRef} className="google-map"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Locations;