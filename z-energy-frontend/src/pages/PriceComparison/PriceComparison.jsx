import { Link } from "react-router-dom"
import StationColumn from "./components/StationColumn" // Import the new component
import styles from "./PriceComparison.module.css"
import HomeIcon from "../../assets/images/Home-Icon.png"

// Constants
const DEFAULT_STATIONS = ["437-z-shirley", "1602-z-moorhouse"]

const PriceComparison = () => {
  return (
    <div className={styles.container}>
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
    </div>
  )
}

export default PriceComparison
