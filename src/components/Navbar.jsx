import { useRef } from 'react';

// Navbar menerima props searchQuery dan setSearchQuery untuk fitur pencarian
function Navbar({ searchQuery, setSearchQuery }) {
  // useRef digunakan untuk mengakses langsung elemen input pencarian
  const searchRef = useRef(null);

  const handleClear = () => {
    setSearchQuery('');
    searchRef.current.focus(); // fokus kembali ke input setelah clear
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">&#9670;</span>
        <span className="navbar-title">SocialApp</span>
      </div>
      <div className="navbar-search">
        <input
          ref={searchRef}
          type="text"
          placeholder="Cari user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          aria-label="Cari user"
        />
        {searchQuery && (
          <button className="clear-btn" onClick={handleClear} aria-label="Hapus pencarian">
            ✕
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
