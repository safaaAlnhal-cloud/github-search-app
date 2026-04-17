import { useState } from 'react';
import SearchBar from './components/SearchBar.js';
import UserCard from './components/UserCard.js';
import ThemeToggle from './components/ThemeToggle.js';
import { useTheme } from './hooks/useTheme.js';
import { useGitHubUser } from './hooks/useGitHubUser.js';
import './App.css';

function App() {
  const [username, setUsername] = useState<string>('');
  const { theme, setTheme } = useTheme();
  const { userData, loading, error, searchUser } = useGitHubUser();

  return (
    <div className={`app ${theme}`}>
      <h1 className="title">GitHub User Search App</h1>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <SearchBar
        username={username}
        setUsername={setUsername}
        onSearch={() => searchUser(username)}
        loading={loading}
      />

      {loading && <div className="loading">🔄 Searching GitHub... </div>}
      {error && <div className="error-box"> {error}</div>}
      {!userData && !loading && !error && (
        <div className="empty-state">
          <h3>👋 Welcome!</h3>
          <p>Search for a GitHub user to view profile details</p>
        </div>
      )}
      {userData && <UserCard user={userData} />}
    </div>
  );
}
export default App;
