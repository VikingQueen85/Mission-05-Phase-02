import { useState } from "react"
// import axios from "axios"
import SearchBar from "./components/SearchBar"
import SearchResults from "./components/SearchResults" // <-- Import new component
import StationCard from "./components/StationCard"
import styles from "./PriceComparison.module.css"

const PriceComparison = () => {
  // State for the initial search
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  // State for fetching details of a selected station
  const [stationDetails, setStationDetails] = useState(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [detailsError, setDetailsError] = useState("")

  const handleSearch = async query => {
    setIsSearching(true)
    setSearchError("")
    setHasSearched(true)
    setSearchResults([])
    setStationDetails(null) // Clear previous selection
    setDetailsError("")

    try {
      // Make sure this URL points to your running backend
      const apiUrl = `http://localhost:3000/api/station-fuel-prices/search?term=${query}`
      const response = await axios.get(apiUrl)
      setSearchResults(response.data)
    } catch (err) {
      console.error("Search Error:", err)
      setSearchError("Could not perform search. Please check the backend.")
    } finally {
      setIsSearching(false)
    }
  }

  const handleStationSelect = async stationSlug => {
    setIsLoadingDetails(true)
    setDetailsError("")
    setStationDetails(null)

    try {
      const apiUrl = `http://localhost:3000/api/station-fuel-prices/prices/${stationSlug}`
      const response = await axios.get(apiUrl)
      setStationDetails(response.data)
    } catch (err) {
      console.error("Details Fetch Error:", err)
      setDetailsError("Could not fetch station prices.")
    } finally {
      setIsLoadingDetails(false)
    }
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h1>Z Fuel Price Checker</h1>
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />

        <div className={styles.messageArea}>
          {isSearching && <p>Searching...</p>}
          {searchError && <p className={styles.error}>{searchError}</p>}
          {hasSearched && !isSearching && searchResults.length === 0 && (
            <p>No stations found for your search.</p>
          )}
        </div>

        <SearchResults
          results={searchResults}
          onSelect={station => handleStationSelect(station.slug)}
          isLoadingDetails={isLoadingDetails}
        />

        <div className={styles.messageArea}>
          {isLoadingDetails && <p>Loading prices...</p>}
          {detailsError && <p className={styles.error}>{detailsError}</p>}
        </div>

        {stationDetails && (
          <div style={{ marginTop: "30px" }}>
            <StationCard station={stationDetails} />
          </div>
        )}
      </div>
    </div>
  )
}
export default PriceComparison
