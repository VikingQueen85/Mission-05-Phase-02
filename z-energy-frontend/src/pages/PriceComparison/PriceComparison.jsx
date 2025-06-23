import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import SearchBar from "././components/SearchBar"
import StationCard from "./components/StationCard"
import StationSelector from "./components/StationSelector"
import styles from "./PriceComparison.module.css"

// Constants
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Initial state for a single column
const initialColumnState = {
  searchQuery: "",
  isSearching: false,
  isLoadingDetails: false,
  searchError: "",
  detailsError: "",
  searchResults: [],
  selectedStationSlug: "",
  stationDetails: null,
}

// Default stations to load
const DEFAULT_STATIONS = ["437-z-shirley", "1602-z-moorhouse"]

const PriceComparison = () => {
  // Array to manage state for both columns
  const [columns, setColumns] = useState([
    { ...initialColumnState },
    { ...initialColumnState },
  ])

  // A single function to update a column's state by its index
  const updateColumnState = (index, newState) => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns]
      newColumns[index] = { ...newColumns[index], ...newState }
      return newColumns
    })
  }

  // Handle input changes
  const handleQueryChange = (query, index) => {
    updateColumnState(index, { searchQuery: query })
  }

  // Step 1: Search for a list of stations
  const handleSearch = async (query, index) => {
    // Reset the entire column state and set searching to true
    updateColumnState(index, {
      ...initialColumnState,
      searchQuery: query,
      isSearching: true,
    })

    try {
      const apiUrl = `${API_BASE_URL}/api/station-fuel-prices/search?term=${query}`
      const response = await axios.get(apiUrl)
      const results = response.data

      if (results && results.length > 0) {
        updateColumnState(index, { searchResults: results, isSearching: false })
      } else {
        updateColumnState(index, {
          searchError: "No stations found for your search.",
          isSearching: false,
        })
      }
    } catch (err) {
      console.error("Search Error:", err)
      updateColumnState(index, {
        searchError: "Could not perform search. Please try again.",
        isSearching: false,
      })
    }
  }

  // Step 2: Fetch prices for the selected station
  const handleStationSelect = async (slug, index) => {
    if (!slug) {
      // If the user selects the placeholder, clear the details
      updateColumnState(index, {
        stationDetails: null,
        selectedStationSlug: "",
        detailsError: "",
      })
      return
    }

    updateColumnState(index, {
      isLoadingDetails: true,
      selectedStationSlug: slug,
      stationDetails: null, // Clear previous details
      detailsError: "",
    })

    try {
      const apiUrl = `${API_BASE_URL}/api/station-fuel-prices/prices/${slug}`
      const response = await axios.get(apiUrl)
      updateColumnState(index, {
        stationDetails: response.data,
        isLoadingDetails: false,
        searchQuery: "", // Clear search query after selection
        searchResults: [], // Hides the dropdown after selection
      })
    } catch (err) {
      console.error("Details Fetch Error:", err)
      updateColumnState(index, {
        detailsError: "Could not fetch station prices.",
        isLoadingDetails: false,
      })
    }
  }

  // Load initial station data when the component mounts
  useEffect(() => {
    const loadInitialStations = async () => {
      // Not to load if data already exists (e.g., after a component remount)
      if (columns[0].stationDetails || columns[1].stationDetails) {
        return
      }

      try {
        // Load each default station
        for (let i = 0; i < Math.min(DEFAULT_STATIONS.length, 2); i++) {
          const slug = DEFAULT_STATIONS[i]

          // Set loading state
          updateColumnState(i, {
            isLoadingDetails: true,
            selectedStationSlug: slug,
          })

          // Fetch the station data
          const apiUrl = `${API_BASE_URL}/api/station-fuel-prices/prices/${slug}`
          const response = await axios.get(apiUrl)

          // Update state with fetched data
          updateColumnState(i, {
            stationDetails: response.data,
            isLoadingDetails: false,
            selectedStationSlug: slug,
          })
        }
      } catch (error) {
        console.error("Error loading initial station data:", error)
        // Handle errors if needed
      }
    }

    loadInitialStations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Link to="/" className={styles.homeLink}>
          <img src="/Home-Icon.png" alt="Home" className={styles.homeIcon} />
        </Link>
        <h1 className={styles.title}>Price Comparison</h1>
      </div>

      <div className={styles.comparisonContainer}>
        {columns.map((column, index) => (
          <div key={index} className={styles.stationColumn}>
            <SearchBar
              query={column.searchQuery} // Pass the current query to SearchBar
              onQueryChange={query => handleQueryChange(query, index)}
              onSearch={query => handleSearch(query, index)}
              isLoading={column.isSearching}
              placeholder="Enter Address"
            />

            {/* Conditionally render the station selector */}
            <StationSelector
              results={column.searchResults}
              onSelect={slug => handleStationSelect(slug, index)}
              selectedValue={column.selectedStationSlug}
              isLoading={column.isLoadingDetails}
              disabled={column.isSearching || column.searchResults.length === 0}
            />

            <div className={styles.messageArea}>
              {column.isSearching && <p>Searching for stations...</p>}
              {column.isLoadingDetails && <p>Loading prices...</p>}
              {column.searchError && (
                <p className={styles.error}>{column.searchError}</p>
              )}
              {column.detailsError && (
                <p className={styles.error}>{column.detailsError}</p>
              )}
            </div>

            <div className={styles.cardsContainer}>
              {column.stationDetails &&
                column.stationDetails.fuels.map(fuel => (
                  <StationCard
                    key={fuel.fuelType}
                    stationName={column.stationDetails.name}
                    stationAddress={column.stationDetails.address}
                    fuel={fuel}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PriceComparison
