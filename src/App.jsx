import {useState , useEffect} from 'react'
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import ThemeToggle from './components/ThemeToggle';
import { fetchGitHubUser } from "./services/githubService";
import "./App.css";



function App() {
   const [username, setUsername] = useState('')
   const [userData, setUserData] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState('')
   const [theme, setTheme] = useState(() => {
   const savedTheme = localStorage.getItem("theme")
      if (savedTheme)
        return savedTheme

         return window.matchMedia("(prefers-color-scheme: dark)").matches? "dark" : "light"
   })

   useEffect(() => {
    localStorage.setItem("theme", theme);
      }, [theme]);

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
    setError("Something went wrong ❌")
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
     
       
    

    {loading && <p>Loading...</p>}
    {error && <p style={{color: "red"}}>{error}</p>}
    {!userData && !loading && !error && (
       <p>Search for a GitHub user 🔍</p>
    )}
   {userData && <UserCard user={userData} />}
    </div>
  )
}

export default App 