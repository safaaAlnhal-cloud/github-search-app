export async function fetchGitHubUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`)
  const data = await response.json()

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}