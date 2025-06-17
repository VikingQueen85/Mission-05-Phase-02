import styles from "./SearchResults.module.css"

const SearchResults = ({ results, onSelect, isLoadingDetails }) => {
  if (results.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      <h4>Select a station to see prices:</h4>
      <ul className={styles.list}>
        {results.map(station => (
          <li key={station.id}>
            <button
              onClick={() => onSelect(station)}
              disabled={isLoadingDetails}>
              <span className={styles.name}>{station.name}</span>
              <span className={styles.address}>{station.address}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResults
