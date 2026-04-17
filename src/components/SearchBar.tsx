type Props = {
  username: string;
  setUsername: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
   onReset: () => void;
}
function SearchBar({ username, setUsername, onSearch, loading , onReset  }:Props) {
  return (
    <div className="search-box">
       <div className="input-group">
      <label htmlFor="username-input" className="input-label" >GitHub Username :</label>

      <input
        id="username-input"
        type="text"
        placeholder="Search for a GitHub user"
        value={username}
        onChange={(e) => {setUsername(e.target.value);
          if (e.target.value === "") {
           onReset();          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading ) onSearch();
        }}
      />
       </div>
      <button onClick={onSearch} disabled={loading }>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;