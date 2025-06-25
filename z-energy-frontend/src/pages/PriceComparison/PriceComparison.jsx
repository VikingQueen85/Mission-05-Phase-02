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

  return (
    <div className={styles.container}>
      {/* This will only be in the DOM on desktop */}
      {!isMobile && (
        <>
          <div className={styles.banner}></div>
          <div className={styles.hero}></div>
        </>
      )}

      {isMobile ? (
        <>
          <div className={styles.titleContainer}>
            <Link to="/" className={styles.homeLink}>
              {/* Use the imported HomeIcon */}
              <img src={HomeIcon} alt="Home" className={styles.homeIcon} />
            </Link>
            <h1 className={styles.title}>Price Comparison</h1>
          </div>
          <div className={styles.comparisonContainer}>
            {/* Render two self-contained columns */}
            <StationColumn initialSlug={DEFAULT_STATIONS[0]} />
            <StationColumn initialSlug={DEFAULT_STATIONS[1]} />
          </div>
        </>
      ) : (
        <div className={styles.contentWrapper}>
          <h2>Compare Prices Across Stations</h2>
        </div>
      )}
    </div>
  )
}

export default PriceComparison
