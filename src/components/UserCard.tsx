type GitHubUser = {
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};
type Props = {
  user: GitHubUser;
};
function UserCard({ user }: Props) {
  return (
    <div className="card">
      <img src={user.avatar_url} alt="user avatar" />

      <div className="info">
        <h2>{user.name || 'No name available'}</h2>
        <p>{user.bio || 'No bio available'}</p>

        <div className="stats">
          <p>Repos: {user.public_repos}</p>
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
