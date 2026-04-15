import { useState } from "react";
import { fetchGitHubUser } from "../services/githubService";

export function useGitHubUser() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchUser = async (username) => {
    setUserData(null);

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await fetchGitHubUser(username);

      if (!result.ok) {
        if (result.status === 404) {
          setError("User not found ❌");
        } else {
          setError("GitHub API error ❌");
        }
        return;
      }

      setUserData(result.data);
    } 
    catch (err) {
      if (err.name === "TypeError") {
        setError("🌐 No internet connection");
      } 
      else if (err.message.includes("Failed to fetch")) {
        setError("⚠️ Network error - please try again");
      } 
      else {
        setError("❌ Unexpected error occurred");
      }
    } 
    finally {
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