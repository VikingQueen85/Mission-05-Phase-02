import { useState } from "react"
import styles from "./SearchBar.module.css" // Using CSS Module for consistency

const SearchBar = ({ onSearch, isLoading, placeholder = "Enter Address" }) => {
  const [query, setQuery] = useState("")

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
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
      />
      {/* No search button for mobile version */}
      {/* Search triggers on Enter */}
    </form>
  )
}

export default SearchBar
