
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

function Homepage() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStationsAndFilters, setShowStationsAndFilters] = useState(false);
  const [selectedTown, setSelectedTown] = useState('');

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/stations');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.error("Error fetching stations:", error);
        setError("Failed to load station data. Please ensure your backend is running and accessible at http://localhost:3000/api/stations.");
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleToggleStationsAndFilters = () => {
    setShowStationsAndFilters(!showStationsAndFilters);
    if (!showStationsAndFilters) {
      setSelectedTown('');
    }
  };

  const stationsWithTowns = useMemo(() => {
    return stations.map(station => {
      const parts = station.address.split(',').map(part => part.trim());
      const town = parts.length > 1 ? parts[parts.length - 1] : '';
      return { ...station, town };
    });
  }, [stations]);

  const uniqueTownsAvailable = useMemo(() => {
    const towns = new Set(stationsWithTowns.map(station => station.town).filter(Boolean));
    return Array.from(towns).sort();
  }, [stationsWithTowns]);

  const handleTownChange = (event) => {
    setSelectedTown(event.target.value);
  };

  const filteredStations = useMemo(() => {
    if (!selectedTown) {
      return stationsWithTowns;
    }
    return stationsWithTowns.filter(station => station.town === selectedTown);
  }, [selectedTown, stationsWithTowns]);

  return (
    <div className="homepage-main-container">
      <section className="top-banner-section">
        <h1 className="top-banner-text">Welcome to Z</h1>
      </section>

      {/* Hero Section */}
      <section className="main-image-section"></section>

      <section className="find-station-band">
        <h2 className="find-station-text">Find a Z Station</h2>
        <div className="find-station-icons"></div>
      </section>

      <div className="find-station-toggle-wrapper">
        <button onClick={handleToggleStationsAndFilters} className="find-stations-toggle-button orange-gradient-button">
          {showStationsAndFilters ? "Hide Stations & Filters" : "Show Stations & Filters"}
        </button>
      </div>

      {showStationsAndFilters && (
        <section className="stations-and-filters-section">
          {loading ? (
            <p className="status-message">Loading station data and services...</p>
          ) : error ? (
            <p className="status-message error-message">{error}</p>
          ) : (
            <>
              <div className="town-select-wrapper-homepage">
                <label htmlFor="town-select" className="town-label-homepage">
                  Select a Town:
                </label>
                <select
                  id="town-select"
                  name="town"
                  className="town-select-homepage"
                  value={selectedTown}
                  onChange={handleTownChange}
                >
                  <option value="">--Choose a Town--</option>
                  {uniqueTownsAvailable.map(town => (
                    <option key={town} value={town}>{town}</option>
                  ))}
                </select>
              </div>

              <div className="stations-list">
                <h3 className="filtered-list-heading">
                  {selectedTown ? `Stations in ${selectedTown}:` : "All Stations:"}
                </h3>
                {filteredStations.length > 0 ? (
                  <ul>
                    {filteredStations.map((station) => (
                      <li key={station._id || station.name} className="station-item">
                        <h4 className="station-name">{station.name}</h4>
                        <p className="station-address">{station.address}</p>
                        {station.services && station.services.length > 0 && (
                            <p className="station-services">Services: {station.services.join(', ')}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-stations-found-message">No stations found matching your selection.</p>
                )}
              </div>
            </>
          )}
        </section>
      )}

      <section className="content-blocks-section">
        <div className="content-grid">
          {/* Sharetank Block */}
          <div className="content-block reverse-layout">
            <div className="content-block-image-wrapper">
              <img
                src="/Sharetank.png"
                alt="Sharetank"
                className="content-block-image"
              />
            </div>
            <div className="content-block-text">
              <h3 className="content-block-heading">Sharetank</h3>
              <p className="content-block-description">
                Buy fuel when it's cheap and share it with up to 5 family members or friends. Save more together.
              </p>
              <Link to="/share-tank" className="content-block-button orange-gradient-button">Learn more</Link>
            </div>
          </div>

          {/* Price Comparison Block */}
          <div className="content-block">
            <div className="content-block-image-wrapper">
              <img
                src="/Price-Comparison.png"
                alt="Price Comparison"
                className="content-block-image"
              />
            </div>
            <div className="content-block-text content-block-text-align-right">
              <h3 className="content-block-heading">Price Comparison</h3>
              <p className="content-block-description">
                Compare fuel prices across different Z stations to find the best deals near you. Save money on every fill-up.
              </p>
              <Link to="/price-comparison" className="content-block-button orange-gradient-button">Price comparison</Link>
            </div>
          </div>

          {/* Order Food Online Block */}
          <div className="content-block reverse-layout">
            <div className="content-block-image-wrapper">
              <img
                src="/Order-Food.png"
                alt="Order Food Online"
                className="content-block-image"
              />
            </div>
            <div className="content-block-text">
              <h3 className="content-block-heading">Order Food Online</h3>
              <p className="content-block-description">
                Pre-order your favorite food and coffee from Z Espress and pick it up on the go.
              </p>
              <Link to="/order-food" className="content-block-button orange-gradient-button">Order food</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;