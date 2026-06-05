import UserCard from './UserCard';

// UserList merender daftar UserCard berdasarkan data users yang sudah difilter
function UserList({ users, loading, error }) {
  if (loading) {
    return (
      <div className="status-container">
        <div className="spinner" aria-label="Memuat data..."></div>
        <p>Memuat data user...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container error">
        <p>&#9888; Gagal memuat data: {error}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="status-container">
        <p>Tidak ada user yang cocok dengan pencarian.</p>
      </div>
    );
  }

  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
