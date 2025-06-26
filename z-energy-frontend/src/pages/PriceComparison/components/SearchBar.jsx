import { useRef, useState, useEffect } from "react"

// Image Imports
import searchIcon from "../../../assets/icons/search.png"

import styles from "./SearchBar.module.css"

const SearchBar = ({
  query,
  onQueryChange,
  onSearch,
  onSelect,
  results = [],
  selectedValue,
  isLoading,
  placeholder = "Enter Address",
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Show dropdown when there are results
  useEffect(() => {
    if (results && results.length > 0) {
      setDropdownVisible(true)
    }
  }, [results])

  const handleSubmit = e => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSearch(query)
    }
  }

  const handleSelectStation = slug => {
    onSelect(slug)
    setDropdownVisible(false)
  }

  return (
    <div className={styles.searchContainer} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          className={styles.searchInput}
          type="text"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.searchButton}
          disabled={isLoading}>
          <FaSearch className={styles.searchIcon} />
        </button>
      </form>

      {/* Results Dropdown */}
      {dropdownVisible && results.length > 0 && (
        <div className={styles.resultsDropdown}>
          {results.map(station => (
            <div
              key={station.id}
              className={`${styles.resultItem} ${
                selectedValue === station.slug ? styles.selected : ""
              }`}
              onClick={() => handleSelectStation(station.slug)}>
              <div className={styles.stationName}>{station.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
