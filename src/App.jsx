import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import Footer from './components/Footer';
import './App.css';

function App() {
  // useState: menyimpan daftar semua user dari API
  const [users, setUsers] = useState([]);
  // useState: menyimpan kata kunci pencarian
  const [searchQuery, setSearchQuery] = useState('');
  // useState: status loading saat fetch data
  const [loading, setLoading] = useState(true);
  // useState: menyimpan pesan error jika fetch gagal
  const [error, setError] = useState(null);

  // useEffect: fetch data user dari API saat pertama kali component dimount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // array kosong = hanya dijalankan sekali saat mount

  // Filter user berdasarkan nama, username, atau email
  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) ||
      user.username.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q)
    );
  });

  return (
    // AppProvider menyediakan context (likes & follows) ke seluruh component di dalamnya
    <AppProvider>
      <div className="app-wrapper">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="main-content">
          <div className="page-header">
            <h1>Temukan Teman</h1>
            <p className="page-subtitle">
              {!loading && !error && (
                <>Menampilkan <strong>{filteredUsers.length}</strong> dari <strong>{users.length}</strong> user</>
              )}
            </p>
          </div>
          <UserList users={filteredUsers} loading={loading} error={error} />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
