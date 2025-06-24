import styles from "./StationCard.module.css"

// Image Import Paths
import z91 from "../../../assets/petrol-icons/Z-91.png"
import z95 from "../../../assets/petrol-icons/Z-95.png"
import zDiesel from "../../../assets/petrol-icons/Z-D.png"
import zLogo from "../../../assets/images/Z-Logo-2.png"

const fuelConfig = {
  91: {
    logoSrc: z91,
    colourClass: styles.greenGradient,
  },
  95: {
    logoSrc: z95,
    colourClass: styles.orangeGradient,
  },
  Diesel: {
    logoSrc: zDiesel,
    colourClass: styles.yellowGradient,
  },
}

const StationCard = ({ stationName, stationAddress, fuel }) => {
  // Get specific configuration for the fuel type
  // "{}" provides a fallback in case fuelType is not found
  const config = fuelConfig[fuel.fuelType] || {}

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={zLogo} alt="Z Logo" className={styles.logo} />
        <div className={styles.stationInfo}>
          <h3 className={styles.name}>{stationName} Station</h3>
          <p className={styles.address}>{stationAddress}</p>
        </div>
      </div>
      <div className={styles.priceSection}>
        {/* Use colourClass from config object */}
        <p className={`${styles.price} ${config.colourClass || ""}`}>
          ${fuel.price.toFixed(2)}
          <span className={styles.priceUnit}> per liter</span>
        </p>
      </div>
      <div className={styles.fuelSection}>
        {config.logoSrc ? (
          // If a logo exists in config, use it
          <img
            src={config.logoSrc}
            alt={fuel.fuelType}
            className={styles.fuelLogo}
          />
        ) : (
          // Otherwise, fall back to displaying the text
          <p className={styles.fuelType}>{fuel.fuelType}</p>
        )}
      </div>
      <button className={styles.topUpButton}>Top Up</button>
    </div>
  )
}

export default StationCard
