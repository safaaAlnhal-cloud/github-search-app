const BASE_URL = import.meta.env.VITE_GITHUB_API as string;
export async function fetchGitHubUser(username:string) {
  const response = await fetch(`${BASE_URL}/${username}`)
  const data = await response.json()

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}