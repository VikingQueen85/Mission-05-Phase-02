
import React, { useState, useEffect } from 'react';
import './homepage.css';

function Homepage() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStations, setShowStations] = useState(false);

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
        setError("Failed to load stations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleShowStations = () => {
    setShowStations(!showStations);
  };

  if (loading) {
    return (
      <div className="homepage-container">
        <p className="homepage-intro-text">Loading stations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage-container">
        <p className="homepage-intro-text error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      <h2 className="homepage-heading">Find a Z Petrol Station</h2>
      <p className="homepage-intro-text">Click the button below to see available Z petrol stations</p>

      <button onClick={handleShowStations} className="find-stations-button">
        {showStations ? "Hide Stations" : "Show Stations"}
      </button>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/services" className="find-stations-button">
          Go to Services Page
        </Link>
      </div>

      {showStations && (
        <div className="stations-list">
          {stations.length > 0 ? (
            <ul>
              {stations.map((station) => (
                <li key={station._id || station.name} className="station-item">
                  <h3 className="station-name">{station.name}</h3>
                  <p className="station-address">{station.address}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No stations found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Homepage;