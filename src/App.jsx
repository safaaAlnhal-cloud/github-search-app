import {useState , useEffect} from 'react'
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import ThemeToggle from './components/ThemeToggle';
import { fetchGitHubUser } from "./services/githubService";
import { useTheme } from "./hooks/useTheme";
import "./App.css";



function App() {
   const [username, setUsername] = useState('')
   const [userData, setUserData] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState('')
   const { theme, setTheme } = useTheme();

   const fetchUserData = async () => {
     setUserData(null);
   
     if (!username.trim()) {
    setError("Please enter a username")
    return
  }
      setLoading(true)
      setError('')
   try {
    const result = await fetchGitHubUser(username);
    
    if (!result.ok) {
      if (result.status === 404) {
        setError("User not found ❌");
      } else {
        setError("GitHub API error ❌");
       }
      
       }else
         {
      setUserData(result.data)
     }
   } catch (err) {
      if (err.name === "TypeError") {
        setError("Network error ❌ Check your internet");
     } else {
       setError("Unexpected error ❌");
     }
   } finally {
    setLoading(false)
   }
}
  return (
    <div className={`app ${theme}`}>
       <h1 className="title" >GitHub User Search App</h1>
       <ThemeToggle theme={theme} setTheme={setTheme} />
       <SearchBar
         username={username}
         setUsername={setUsername}
         onSearch={fetchUserData}
         loading={loading}
         />
     
       
    

    {loading && (
      <div className="loading">
         🔄 Searching GitHub...  </div>
      )}
    {error && (
      <div className="error-box"> {error}</div>
      )}
    {!userData && !loading && !error && (
     <div className="empty-state">
       <h3>👋 Welcome!</h3>
       <p>Search for a GitHub user to view profile details</p>
     </div>
)}
   {userData && <UserCard user={userData} />}
    </div>
  )
}

export default App 