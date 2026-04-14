import {useState} from 'react'
import "./App.css";


function App() {
   const [username, setUsername] = useState('')
   const [userdata, setUserData] = useState(null)
   const [theme, setTheme] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark": "light";}
    );
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState('')

   const fetchUserData = async () => {
      setLoading(true)
      setError('')
   try {
     const response = await fetch(`https://api.github.com/users/${username}`)
     const data = await response.json()

     if (!response.ok) {
      setError("User not found ❌")
      setUserData(null)
      return
     } else {
      setUserData(data)
     }
   } catch (err) {
    setError("Something went wrong ❌")
   } finally {
    setLoading(false)
   }
}
  return (
    <div className={`app ${theme}`}>
       <h1 className="title" >GitHub User Search App</h1>
      
       <button className="theme-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
       </button>
      
     <div className="search-box">
       <input type="text"
        placeholder="Search for a GitHub user" 
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
       <button onClick={fetchUserData}>Search</button>
     </div>

    {loading && <p>Loading...</p>}
    {error && <p style={{color: "red"}}>{error}</p>}
    {userdata && (
     <div className="card">
       <img src={userdata.avatar_url} />

      <div className="info">
        <h2>{userdata.name}</h2>
        <p>{userdata.bio}</p>

      <div className="stats">
        <p>Repos: {userdata.public_repos}</p>
        <p>Followers: {userdata.followers}</p>
        <p>Following: {userdata.following}</p>
      </div>
    </div>
  </div>
)}
    
      
    </div>
  )
}

export default App 