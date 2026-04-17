import { useState } from 'react';
import { fetchGitHubUser } from '../services/githubService.js';

type GitHubUser = {
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};
export function useGitHubUser() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
   const resetUser = () => {
      setUserData(null);
      setError("");
    };
  const searchUser = async (username: string): Promise<void> => {
   
   

    if (!username.trim()) {
      resetUser();
      setError('Please enter a username');
      return;
    } 
    setUserData(null);

    setLoading(true);
    setError('');
    try {
      const result = await fetchGitHubUser(username);

      if (!result.ok) {
        if (result.status === 404) {
          setError('User not found ❌');
        } else if (result.status === 403) {
          setError("Too many requests. Please try again later.");
        }else {
          setError('GitHub API error ❌');
        }
        return;
      }

      setUserData(result.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'TypeError') {
          setError('🌐 No internet connection');
        } else if (err.message.includes('Failed to fetch')) {
          setError('⚠️ Network error - please try again');
        } else {
          setError('❌ Unexpected error occurred');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    userData,
    loading,
    error,
    searchUser,
    resetUser,

  };
}
