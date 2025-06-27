// --- Image Imports ---
import zLogoWhite from "../../../assets/images/Z-Logo-White.png"

import styles from "./CustomFuelLogo.module.css"

const CustomFuelLogo = ({ fuelType, isMobile = true }) => {
  // Configuration for each fuel type display
  const fuelConfig = {
    91: {
      className: styles.fuel91,
      display: "91",
    },
    95: {
      className: styles.fuel95,
      display: "X 95",
    },
    Diesel: {
      // Use different className based on mobile or desktop for Diesel
      className: isMobile ? styles.fuelDieselMobile : styles.fuelDiesel,
      display: "D",
    },
  }[fuelType] || {
    className: styles.fuelDefault,
    display: fuelType,
  }

  return (
    <div className={`${styles.fuelLogoContainer} ${fuelConfig.className}`}>
      <div className={styles.zLogoImgContainer}>
        <img src={zLogoWhite} alt="Z Logo" className={styles.zLogo} />
      </div>
      <div className={styles.fuelTypeContainer}>
        <span className={styles.fuelType}>{fuelConfig.display}</span>
      </div>
    </div>
  )
}

export default CustomFuelLogo
