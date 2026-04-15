function SearchBar({ username, setUsername, onSearch, loading }) {
  return (
    <div className="search-box">
       <div className="input-group">
      <label htmlFor="username-input" className="input-label" >GitHub Username :</label>

      <input
        id="username-input"
        type="text"
        placeholder="Search for a GitHub user"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading && username.trim()) onSearch();
        }}
      />
       </div>
      <button onClick={onSearch} disabled={loading || !username.trim()}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;