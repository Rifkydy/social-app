import { useAppContext } from '../context/AppContext';

// UserCard menampilkan informasi satu user beserta tombol Like dan Follow
function UserCard({ user }) {
  const { likedUsers, followedUsers, toggleLike, toggleFollow } = useAppContext();

  const isLiked = likedUsers[user.id] || false;
  const isFollowed = followedUsers[user.id] || false;

  // Ambil inisial dari nama user untuk avatar
  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`user-card ${isFollowed ? 'followed' : ''}`}>
      <div className="card-header">
        <div className="avatar" aria-hidden="true">
          {initials}
        </div>
        <div className="user-info">
          <h2 className="user-name">{user.name}</h2>
          <p className="user-username">@{user.username}</p>
        </div>
      </div>

      <div className="card-body">
        <p className="user-email">
          <span className="label">Email:</span> {user.email}
        </p>
        <p className="user-company">
          <span className="label">Perusahaan:</span> {user.company.name}
        </p>
        <p className="user-city">
          <span className="label">Kota:</span> {user.address.city}
        </p>
      </div>

      <div className="card-actions">
        <button
          className={`btn btn-like ${isLiked ? 'active' : ''}`}
          onClick={() => toggleLike(user.id)}
          aria-label={isLiked ? 'Batalkan like' : 'Like'}
        >
          {isLiked ? '❤️ Liked' : '🤍 Like'}
        </button>
        <button
          className={`btn btn-follow ${isFollowed ? 'active' : ''}`}
          onClick={() => toggleFollow(user.id)}
          aria-label={isFollowed ? 'Unfollow' : 'Follow'}
        >
          {isFollowed ? '✓ Following' : '+ Follow'}
        </button>
      </div>
    </div>
  );
}

export default UserCard;
