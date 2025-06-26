import { useState } from "react"
import { Link } from "react-router-dom"

// Component and File Imports
import StationColumn from "./components/StationColumn" // Import the new component
import { useViewportSize } from "../../hooks/useViewportSize"

// Image Imports
import HomeIcon from "../../assets/images/Home-Icon.png"

// CSS Imports
import styles from "./PriceComparison.module.css"

// Constants
const DEFAULT_STATIONS = ["437-z-shirley", "1602-z-moorhouse"]

const PriceComparison = () => {
  const { isMobile } = useViewportSize()

  // This state will be used for the desktop view
  const [webStations, setWebStations] = useState([
    { slug: DEFAULT_STATIONS[0] },
    { slug: DEFAULT_STATIONS[1] },
  ])

  // Add another comparison row for desktop view
  const addComparisonRow = () => {
    setWebStations([...webStations, { slug: "" }])
  }

  return (
    <div className={styles.container}>
      {/* Banner and hero section will only be in the DOM on desktop */}
      {!isMobile && (
        <>
          <div className={styles.banner}></div>
          <div className={styles.hero}></div>
        </>
      )}

      {isMobile ? (
        // MOBILE VIEW
        <>
          <div className={styles.titleContainer}>
            <Link to="/" className={styles.homeLink}>
              <img src={HomeIcon} alt="Home" className={styles.homeIcon} />
            </Link>
            <h1 className={styles.title}>Price Comparison</h1>
          </div>
          <div className={styles.comparisonContainer}>
            {/* Render two self-contained columns - Comparing two stations - Mobile Version */}
            <StationColumn initialSlug={DEFAULT_STATIONS[0]} />
            <StationColumn initialSlug={DEFAULT_STATIONS[1]} />
          </div>
        </>
      ) : (
        // DESKTOP VIEW
        <div className={styles.contentWrapper}>
          <h2 className={styles.desktopTitle}>
            Compare Prices Across Stations
          </h2>

          {/* Desktop comparison section with rows */}
          <div className={styles.webComparisonContainer}>
            {/* Map through web stations - each is a row - Send initial slug */}
            {webStations.map((station, index) => (
              <div
                key={`station-index-${index}`}
                className={styles.comparisonRow}>
                <StationColumn initialSlug={station.slug} isMobile={isMobile} />
              </div>
            ))}

            {/* "Add Another Station" button if less than 4 comparison rows */}
            {webStations.length < 4 && (
              <div className={styles.buttonContainer}>
                <button
                  className={styles.addStationButton}
                  onClick={addComparisonRow}>
                  Add Another Station
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PriceComparison
