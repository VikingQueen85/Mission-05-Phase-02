import { useState, useEffect } from "react"
import axios from "axios"

// --- Component Imports ---
import SearchBar from "./SearchBar"
import StationCard from "./StationCard"

// --- Image Imports ---
import loadingImgSrc from "../../../assets/images/Loading.png"

import styles from "./StationColumn.module.css"

// Constants
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const FALLBACK_STATIONS = [
  {
    name: "Z Shirley",
    address: "123 Main St, Christchurch",
    slug: "437-z-shirley",
    fuels: [
      { fuelType: "91", price: 2.55 },
      { fuelType: "95", price: 2.75 },
      { fuelType: "Diesel", price: 1.85 },
    ],
  },
  {
    name: "Z Moorhouse",
    address: "456 Moorhouse Ave, Christchurch",
    slug: "1602-z-moorhouse",
    fuels: [
      { fuelType: "91", price: 2.59 },
      { fuelType: "95", price: 2.79 },
      { fuelType: "Diesel", price: 1.89 },
    ],
  },
]

const StationColumn = ({ initialSlug, isMobile = true }) => {
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
    // --- Column display for mobile and row display for desktop ---
    <div
      className={`${styles.stationColumn} ${
        !isMobile ? styles.stationRows : ""
      }`}>
      <SearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSearch={handleSearch}
        results={searchResults}
        selectedValue={selectedStationSlug}
        onSelect={handleStationSelect}
        isLoading={isLoading && searchResults.length === 0} // Only show loading for search
        placeholder="Enter Address"
        isMobile={isMobile} // For desktop styling
      />

      {/* Overlay message without affecting layout */}
      {/* Shows the loading and error message for search*/}
      <div
        className={`${!isMobile ? styles.webMessageArea : styles.messageArea}`}>
        {isLoading && (
          <img
            src={loadingImgSrc}
            alt="Loading..."
            className={`${!isMobile ? styles.webSpinner : styles.spinner}`}
          />
        )}
        {error && (
          <p className={`${styles.error} ${!isMobile ? styles.webError : ""}`}>
            {error}
          </p>
        )}
      </div>

      <div className={`${!isMobile ? styles.webCardsWrapper : ""}`}>
        {/* Show station name and address as header only for desktop */}
        {!isMobile && stationDetails && (
          <div className={styles.stationInfoHeader}>
            <h2 className={styles.stationInfoName}>{stationDetails.name}</h2>
            <p className={styles.stationInfoAddress}>
              {stationDetails.address}
            </p>
          </div>
        )}

        {/*========== Card Section ==========*/}
        <div
          className={`${styles.cardsContainer} ${
            !isMobile ? styles.webCardsContainer : ""
          }`}>
          {stationDetails?.fuels.map(fuel => (
            <StationCard
              key={fuel.fuelType}
              stationName={stationDetails.name}
              stationAddress={stationDetails.address}
              fuel={fuel}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StationColumn
