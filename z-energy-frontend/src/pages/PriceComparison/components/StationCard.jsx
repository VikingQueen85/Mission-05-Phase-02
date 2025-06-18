import styles from "./StationCard.module.css"

const StationCard = ({ stationName, stationAddress, fuel }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {/* Assuming Z-Logo.png is in your public folder */}
        <img src="/Z-Logo.png" alt="Z Logo" className={styles.logo} />
        <div className={styles.stationInfo}>
          <h3 className={styles.name}>{stationName}</h3>
          <p className={styles.address}>{stationAddress}</p>
        </div>
      </div>
      <div className={styles.priceSection}>
        <p className={styles.price}>
          ${fuel.price.toFixed(2)}
          <span className={styles.priceUnit}> / L</span>
        </p>
      </div>
      <div className={styles.fuelSection}>
        <p className={styles.fuelType}>{fuel.fuelType}</p>
      </div>
      <button className={styles.topUpButton}>Top Up</button>
    </div>
  )
}

export default StationCard
