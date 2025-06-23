import styles from "./SearchBar.module.css" // Using CSS Module for consistency
import { FaSearch } from "react-icons/fa"

const SearchBar = ({
  query,
  onQueryChange,
  onSearch,
  isLoading,
  placeholder = "Enter Address",
}) => {
  const handleSubmit = e => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSearch(query)
    }
  }

  return (
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
  )
}

export default SearchBar
