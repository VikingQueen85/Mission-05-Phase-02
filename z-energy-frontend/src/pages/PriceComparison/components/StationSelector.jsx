import styles from "./StationSelector.module.css"

const StationSelector = ({
  results,
  onSelect,
  selectedValue,
  isLoading,
  disabled,
}) => {
  // Don't render anything if there are no search results
  if (results.length === 0) {
    return null
  }

  const handleChange = e => {
    onSelect(e.target.value)
  }

  return (
    <div className={styles.selectorContainer}>
      <select
        className={styles.selector}
        value={selectedValue}
        onChange={handleChange}
        disabled={isLoading || disabled}>
        <option value="">- Select a Station -</option>
        {results.map(station => (
          <option key={station.id} value={station.slug}>
            {station.name} - {station.address}
          </option>
        ))}
      </select>
    </div>
  )
}

export default StationSelector
