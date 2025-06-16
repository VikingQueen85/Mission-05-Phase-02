import { useState } from "react"
import axios from "axios"
import SearchBar from "./components/SearchBar"
import StationCard from "./components/StationCard"
import styles from "./PriceComparison.module.css"

const PriceComparison = () => {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async query => {
    setLoading(true)
    setError("")
    setStations([])
    try {
      // Make sure this URL points to your running backend
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:3000/api/stations"
      const response = await axios.get(`${apiUrl}?search=${query}`)
      setStations(response.data)
    } catch (err) {
      setError("Failed to fetch stations. Please try again.")
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h1>Z Fuel Price Checker</h1>
        <SearchBar onSearch={handleSearch} />

        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && stations.length === 0 && (
          <p>
            No stations found. Try searching for "Greenlane", "Wellington", or
            "25 Verissimo Drive".
          </p>
        )}

        <div className="station-list">
          {stations.map(station => (
            <StationCard key={station._id} station={station} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default PriceComparison
