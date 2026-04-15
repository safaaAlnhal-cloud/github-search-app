import {useState ,useEffect} from 'react'
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from "./hooks/useTheme";
import { useGitHubUser } from "./hooks/useGitHubUser";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";


function App() {
   const [username, setUsername] = useState('')
   const debouncedUsername = useDebounce(username, 500)
   const { theme, setTheme } = useTheme()
   const { userData, loading, error, searchUser } = useGitHubUser()
  useEffect(() => {
    if (debouncedUsername.trim()) {
      searchUser(debouncedUsername);
     }
    }, [debouncedUsername]);

  return (
    <div className={`app ${theme}`}>
       <h1 className="title" >GitHub User Search App</h1>
       <ThemeToggle theme={theme} setTheme={setTheme} />
       <SearchBar
         username={username}
         setUsername={setUsername}
         onSearch={() => searchUser(debouncedUsername)}
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