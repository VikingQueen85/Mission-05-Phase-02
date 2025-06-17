
import React, { useState, useEffect, useMemo } from 'react';
import './Services.css';

function Services() {
  const [allStations, setAllStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedService, setSelectedService] = useState('');
  const [selectedTown, setSelectedTown] = useState('');

  // Fetch station data from the backend when the component mounts
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/stations');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllStations(data);
      } catch (error) {
        console.error("Error fetching stations for services:", error);
        setError("Failed to load station data for services. Please check your backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  // Memoize stations with extracted town for performance
  const stationsWithTowns = useMemo(() => {
    return allStations.map(station => {
      const parts = station.address.split(',').map(part => part.trim());
      const town = parts.length > 1 ? parts[parts.length - 1] : '';
      return { ...station, town };
    });
  }, [allStations]);

  // Memoize unique towns available based on the currently selected service
  const uniqueTownsAvailable = useMemo(() => {
    const relevantStations = selectedService
      ? stationsWithTowns.filter(station =>
          station.services && station.services.includes(selectedService)
        )
      : stationsWithTowns;

    const towns = new Set(relevantStations.map(station => station.town).filter(Boolean));
    return Array.from(towns).sort();
  }, [stationsWithTowns, selectedService]);

  const handleServiceChange = (event) => {
    const service = event.target.value;
    setSelectedService(service);
    setSelectedTown('');
  };

  const handleTownChange = (event) => {
    setSelectedTown(event.target.value);
  };

  // Filter stations based on selected service and then by selected town
  const filteredStations = useMemo(() => {
    let currentFiltered = stationsWithTowns.filter(station =>
      selectedService === '' || (station.services && station.services.includes(selectedService))
    );

    if (selectedTown) {
      currentFiltered = currentFiltered.filter(station => station.town === selectedTown);
    }
    return currentFiltered;
  }, [selectedService, selectedTown, stationsWithTowns]);

  if (loading) {
    return (
      <div className="services-container">
        <p className="service-info-text">Loading services data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-container">
        <p className="service-info-text error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="services-container">
      <h2 className="services-heading">Services</h2>
      <div className="service-dropdown-wrapper">
        <label htmlFor="service-select" className="service-label">
          Choose a service:
        </label>
        <select
          id="service-select"
          name="service"
          className="service-select"
          value={selectedService}
          onChange={handleServiceChange}
        >
          <option value="">--Select a Service--</option>

          <option value="LPG SWAP'n'GO">LPG SWAP'n'GO</option>
          <option value="24/7 Pay at Pump">24/7 Pay at Pump</option>
          <option value="Pay in App">Pay in App</option>
          <option value="Z Espress Coffee & Fresh Food">Z Espress Coffee & Fresh Food</option>
          <option value="Z2O Carwash">Z2O Carwash</option>
          <option value="Trailer Hire">Trailer Hire</option>
          <option value="Bathrooms">Bathrooms</option>
          <option value="ATM">ATM</option>
          <option value="EV Charging">EV Charging</option>
        </select>
      </div>

      {/* Town selection dropdown - now always visible */}
      <div className="town-select-wrapper-services">
        <label htmlFor="town-select" className="town-label-services">
          Select a Town:
        </label>
        <select
          id="town-select"
          name="town"
          className="town-select-services"
          value={selectedTown}
          onChange={handleTownChange}
        >
          <option value="">--Choose a Town--</option>
          {uniqueTownsAvailable.map(town => (
            <option key={town} value={town}>{town}</option>
          ))}
        </select>
      </div>

      {/* Display filtered stations or relevant messages */}
      {(selectedService || selectedTown) ? (
        <div className="filtered-stations-list">
          <h3 className="filtered-list-heading">
            Stations matching criteria:
          </h3>
          {filteredStations.length > 0 ? (
            <ul>
              {filteredStations.map((station) => (
                <li key={station._id || station.name} className="filtered-station-item">
                  <h4 className="filtered-station-name">{station.name}</h4>
                  <p className="filtered-station-address">{station.address}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-stations-found-message">No stations found matching your selection.</p>
          )}
        </div>
      ) : (
        <p className="service-info-text">
          Select a service or a town from the dropdowns above to find stations.
        </p>
      )}
    </div>
  );
}

export default Services;