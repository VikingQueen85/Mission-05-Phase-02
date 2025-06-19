import React, { useState, useEffect } from 'react';
import './Location.css';

const Location = () => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  // Sample Z Station locations in New Zealand
  const locations = [
    {
      id: 1,
      name: 'Z Station Auckland CBD',
      address: '123 Queen Street, Auckland CBD',
      lat: -36.8485,
      lng: 174.7633,
      services: ['Fuel', 'Coffee', 'Food', 'Car Wash'],
      hours: '24/7',
      phone: '09-123-4567'
    },
    {
      id: 2,
      name: 'Z Station Newmarket',
      address: '456 Broadway, Newmarket, Auckland',
      lat: -36.8691,
      lng: 174.7774,
      services: ['Fuel', 'Coffee', 'ATM'],
      hours: '6:00 AM - 10:00 PM',
      phone: '09-234-5678'
    },
    {
      id: 3,
      name: 'Z Station Mt Eden',
      address: '789 Mt Eden Road, Mt Eden, Auckland',
      lat: -36.8785,
      lng: 174.7516,
      services: ['Fuel', 'Coffee', 'Food', 'Toilets'],
      hours: '5:30 AM - 11:00 PM',
      phone: '09-345-6789'
    },
    {
      id: 4,
      name: 'Z Station Ponsonby',
      address: '321 Ponsonby Road, Ponsonby, Auckland',
      lat: -36.8582,
      lng: 174.7391,
      services: ['Fuel', 'Coffee', 'Car Wash', 'ATM'],
      hours: '24/7',
      phone: '09-456-7890'
    }
  ];

  // Initialize filtered locations on component mount
  useEffect(() => {
    setFilteredLocations(locations);
  }, []);

  // Filter locations based on search query
  const filterLocations = (query) => {
    if (!query.trim()) {
      return locations;
    }

    return locations.filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.address.toLowerCase().includes(query.toLowerCase()) ||
      location.services.some(service => 
        service.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Handle search input changes with real-time filtering
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredLocations(filterLocations(query));
  };

  // Handle search button click
  const handleSearch = () => {
    setFilteredLocations(filterLocations(searchQuery));
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Initialize Google Maps
  const initializeMap = () => {
    const mapInstance = new window.google.maps.Map(
      document.getElementById('map'),
      {
        center: { lat: -36.8485, lng: 174.7633 }, // Auckland CBD center
        zoom: 12,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          }
        ]
      }
    );

    // Create markers for each location
    locations.forEach(location => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstance,
        title: location.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF6600" width="30" height="30"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
          scaledSize: new window.google.maps.Size(30, 30)
        }
      });

      // Create info window for each marker
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 250px;">
            <h3 style="margin: 0 0 10px 0; color: #FF6600;">${location.name}</h3>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${location.address}</p>
            <p style="margin: 5px 0;"><strong>Hours:</strong> ${location.hours}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${location.phone}</p>
            <p style="margin: 5px 0;"><strong>Services:</strong> ${location.services.join(', ')}</p>
          </div>
        `
      });

      // Add click listener to marker
      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker);
        setSelectedLocation(location);
      });
    });

    setMap(mapInstance);
  };

  // Load Google Maps API and initialize map
  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;//will replace
      script.async = true;
      script.defer = true;
      window.initMap = initializeMap;
      document.head.appendChild(script);
    }
  }, []);

  // Handle location item click from sidebar
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    if (map) {
      map.setCenter({ lat: location.lat, lng: location.lng });
      map.setZoom(15);
    }
  };

  return (
    <div className="locations-container">
      <div className="locations-header">
        <h1>Find Z Station Locations</h1>
        <p>Find your nearest Z station with fuel, food, and services</p>
      </div>

      <div className="locations-content">
        <div className="locations-sidebar">
          <div className="search-section">
            <input
              type="text"
              placeholder="Enter suburb or address..."
              className="location-search"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="search-button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="locations-list">
            <h3>Nearby Stations</h3>
            {filteredLocations.map(location => (
              <div
                key={location.id}
                className={`location-item ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                onClick={() => handleLocationClick(location)}
              >
                <h4>{location.name}</h4>
                <p className="location-address">{location.address}</p>
                <p className="location-hours">Hours: {location.hours}</p>
                <p className="location-phone">Phone: {location.phone}</p>
                <div className="location-services">
                  {location.services.map(service => (
                    <span key={service} className="service-tag">{service}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="map-container">
          <div id="map" className="google-map"></div>
        </div>
      </div>
    </div>
  );
};

export default Location;