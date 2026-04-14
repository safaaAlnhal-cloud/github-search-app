function SearchBar({ username, setUsername, onSearch, loading }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search for a GitHub user"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
      <button onClick={onSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;