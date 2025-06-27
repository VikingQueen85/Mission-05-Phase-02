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
  isMobile = true, // prop to handle web layout styles
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
    <div
      className={`${styles.searchContainer} ${
        !isMobile ? styles.webSearchContainer : ""
      }`}
      ref={dropdownRef}>
      <form
        onSubmit={handleSubmit}
        className={`${styles.searchForm} ${
          !isMobile ? styles.webSearchForm : ""
        }`}>
        {/* Changes to input style if dropdown is visible */}
        <input
          className={`${styles.searchInput} ${
            !isMobile && dropdownVisible && results?.length > 0
              ? styles.webSearchInputWithDropdown
              : !isMobile
              ? styles.webSearchInput
              : ""
          }`}
          type="text"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
        />

        {/* Search Icon for mobile and Search Button for desktop */}
        {isMobile ? (
          <button
            type="submit"
            className={styles.searchButton}
            disabled={isLoading}>
            <img src={searchIcon} alt="search-icon" />
          </button>
        ) : (
          <button
            type="submit"
            className={styles.webSearchButton}
            disabled={isLoading}>
            Search
          </button>
        )}
      </form>

      {/*========== Results Dropdown ==========*/}
      {/* Show selections of Z stations from search */}
      {dropdownVisible && results.length > 0 && (
        <div
          className={`${styles.resultsDropdown} ${
            !isMobile ? styles.webResultsDropdown : ""
          }`}>
          {/* Inner scroll container */}
          <div className={styles.scrollContainer}>
            {results.map(station => (
              <div
                key={station.id}
                className={`${styles.resultItem} ${
                  selectedValue === station.slug ? styles.selected : ""
                }`}
                onClick={() => handleSelectStation(station.slug)}>
                <div
                  className={`${styles.stationName} ${
                    !isMobile ? styles.webStationName : ""
                  }`}>
                  {station.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
