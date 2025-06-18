import styles from "./StationCard.module.css"

const StationCard = ({ station }) => {
  return (
    <div className={styles.cardStyle}>
      <h3>{station.name}</h3>
      <p>{station.address}</p>
      <h4>Fuel Prices:</h4>
      <ul className={styles.fuelListStyle}>
        {station.fuels.map(fuel => (
          <li key={fuel.fuelType}>
            {fuel.fuelType}: <strong>${fuel.price.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StationCard
