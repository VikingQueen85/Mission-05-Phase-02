// --- Component Imports ---
import CustomFuelLogo from "./CustomFuelLogo"

// --- Image Imports ---
import zLogo from "../../../assets/images/Z-Logo-2.png"
import zLogoWeb from "../../../assets/images/Z-Logo-White.png"

import styles from "./StationCard.module.css"

const StationCard = ({
  stationName,
  stationAddress,
  fuel,
  isMobile = true,
}) => {
  // --- Move fuel config inside component to dynamically render based on screen size ---
  const fuelConfig = {
    91: {
      colourClass: styles.greenGradient,
    },
    95: {
      colourClass: styles.orangeGradient,
    },
    Diesel: {
      colourClass: isMobile ? styles.yellowGradient : styles.blueGradient,
    },
  }

  // Get specific configuration for the fuel type
  // Default to empty object if not fuel type not found
  const config = fuelConfig[fuel.fuelType] || {}

  return (
    <div className={`${styles.card} ${!isMobile ? styles.webCard : ""}`}>
      <div className={`${styles.header} ${!isMobile ? styles.webHeader : ""}`}>
        <img
          src={isMobile ? zLogo : zLogoWeb}
          alt="Z Logo"
          className={isMobile ? styles.logo : styles.webLogo}
        />
        {isMobile && (
          <div className={styles.stationInfo}>
            <h3 className={styles.name}>{stationName} Station</h3>
            <p className={styles.address}>{stationAddress}</p>
          </div>
        )}
      </div>
      <div
        className={`${styles.priceSection} ${
          !isMobile ? styles.webPriceSection : ""
        }`}>
        {/* Use colourClass from config object */}
        <p
          className={`${styles.price} ${!isMobile ? styles.webPrice : ""} ${
            config.colourClass || ""
          }`}>
          ${fuel.price.toFixed(2)}
          <span className={styles.priceUnit}> per liter</span>
        </p>
      </div>
      <div
        className={`${styles.fuelSection} ${
          !isMobile ? styles.webFuelSection : ""
        }`}>
        <CustomFuelLogo fuelType={fuel.fuelType} isMobile={isMobile} />
      </div>

      {/* Top Up Button - Mobile View Only */}
      {isMobile ? <button className={styles.topUpButton}>Top Up</button> : ""}
    </div>
  )
}

export default StationCard
