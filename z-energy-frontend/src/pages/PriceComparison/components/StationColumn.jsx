// src/components/StationColumn.jsx
import { useState, useEffect } from "react"
import axios from "axios"
import SearchBar from "./SearchBar"
import StationCard from "./StationCard"
import StationSelector from "./StationSelector"
import styles from "../PriceComparison.module.css" // Adjust path as needed

// Constants
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const FALLBACK_STATIONS = [
  {
    name: "Z Shirley",
    address: "123 Main St, Christchurch",
    slug: "437-z-shirley",
    fuels: [
      { fuelType: "Unleaded 91", price: 2.55 },
      { fuelType: "Unleaded 95", price: 2.75 },
      { fuelType: "Diesel", price: 1.85 },
    ],
  },
  {
    name: "Z Moorhouse",
    address: "456 Moorhouse Ave, Christchurch",
    slug: "1602-z-moorhouse",
    fuels: [
      { fuelType: "Unleaded 91", price: 2.59 },
      { fuelType: "Unleaded 95", price: 2.79 },
      { fuelType: "Diesel", price: 1.89 },
    ],
  },
]

const StationColumn = ({ initialSlug }) => {
  // State is now self-contained within this component
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedStationSlug, setSelectedStationSlug] = useState(
    initialSlug || ""
  )
  const [stationDetails, setStationDetails] = useState(null)

  // Consolidated loading/error states for simplicity
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Fetch station details based on a slug
  const fetchStationDetails = async (slug, isInitialLoad = false) => {
    if (!slug) {
      setStationDetails(null)
      setError("")
      return
    }

    setIsLoading(true)
    setError("")
    setStationDetails(null) // Clear previous details

    try {
      const apiUrl = `${API_BASE_URL}/api/station-fuel-prices/prices/${slug}`
      const response = await axios.get(apiUrl)
      setStationDetails(response.data)
      setSearchQuery("") // Clear search after successful selection
      setSearchResults([])
    } catch (err) {
      console.error(`Details Fetch Error for ${slug}:`, err)

      // Attempt to use fallback data on initial load failure
      const fallbackData = isInitialLoad
        ? FALLBACK_STATIONS.find(s => s.slug === slug)
        : null
      if (fallbackData) {
        setStationDetails(fallbackData)
      } else {
        setError("Could not fetch station prices.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle selecting a station from the dropdown
  const handleStationSelect = slug => {
    setSelectedStationSlug(slug)
    fetchStationDetails(slug)
  }

  // Handle searching for stations
  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError("")
    setSearchResults([])

    try {
      const apiUrl = `${API_BASE_URL}/api/station-fuel-prices/search?term=${searchQuery}`
      const response = await axios.get(apiUrl)
      if (response.data?.length > 0) {
        setSearchResults(response.data)
      } else {
        setError("No stations found for your search.")
      }
    } catch (err) {
      console.error("Search Error:", err)
      setError("Could not perform search. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Effect for loading the initial station data
  useEffect(() => {
    if (initialSlug) {
      fetchStationDetails(initialSlug, true)
    }
  }, [initialSlug])

  return (
    <div className={styles.stationColumn}>
      <SearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSearch={handleSearch}
        isLoading={isLoading && searchResults.length === 0} // Only show loading for search
        placeholder="Enter Address"
      />

      <StationSelector
        results={searchResults}
        onSelect={handleStationSelect}
        selectedValue={selectedStationSlug}
        isLoading={isLoading}
        disabled={isLoading || searchResults.length === 0}
      />

      <div className={styles.messageArea}>
        {isLoading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.cardsContainer}>
        {stationDetails?.fuels.map(fuel => (
          <StationCard
            key={fuel.fuelType}
            stationName={stationDetails.name}
            stationAddress={stationDetails.address}
            fuel={fuel}
          />
        ))}
      </div>
    </div>
  )
}

export default StationColumn
