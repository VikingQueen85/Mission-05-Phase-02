import { useState } from "react"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter Z station name or address..."
        style={{ width: "300px", padding: "10px" }}
      />
      <button type="submit" style={{ padding: "10px" }}>
        Search
      </button>
    </form>
  )
}

export default SearchBar
