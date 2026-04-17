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
  const searchUser = async (username: string): Promise<void> => {
    setUserData(null);

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await fetchGitHubUser(username);

      if (!result.ok) {
        if (result.status === 404) {
          setError('User not found ❌');
        } else {
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
  };
}
