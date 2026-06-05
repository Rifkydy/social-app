# SocialApp — React JS

Proyek ini dibuat untuk memenuhi tugas **Penilaian Akhir Semester** mata pelajaran Rekayasa Perangkat Lunak, SMK Letris Indonesia 2.

Website menampilkan daftar user dari API publik dengan tampilan seperti sosial media sederhana, dilengkapi fitur Like, Follow, dan Search.

---

## Cara Menjalankan

```bash
npm install
npm run dev
```

---

## Struktur Component

```
src/
├── context/
│   └── AppContext.jsx   # Global state (likes & follows) via useContext
├── components/
│   ├── Navbar.jsx       # Header + search bar (menggunakan useRef)
│   ├── UserList.jsx     # Container daftar user + state loading/error
│   ├── UserCard.jsx     # Card satu user: nama, email, username, like, follow
│   └── Footer.jsx       # Footer halaman
├── App.jsx              # Root component: fetch API + filter + layout
└── main.jsx             # Entry point React
```

### Penjelasan Tiap Component

| Component | Fungsi |
|---|---|
| `Navbar` | Menampilkan nama aplikasi dan input pencarian user. Menggunakan `useRef` untuk fokus ke input setelah tombol clear ditekan. |
| `UserList` | Menampilkan grid semua `UserCard`. Menangani kondisi loading, error, dan hasil kosong. |
| `UserCard` | Menampilkan data satu user (nama, username, email, kota, perusahaan) beserta tombol **Like** dan **Follow**. State like/follow diambil dari `AppContext`. |
| `Footer` | Menampilkan copyright dan link ke sumber API. |
| `AppContext` | Menyimpan state global `likedUsers` dan `followedUsers` agar bisa diakses dari `UserCard` tanpa prop drilling. |

---

## Fetch API

Data user diambil dari **JSONPlaceholder**:

```
https://jsonplaceholder.typicode.com/users
```

Proses fetch dilakukan di `App.jsx` menggunakan `useEffect` yang berjalan sekali saat component pertama kali dimount (dependency array kosong `[]`).

```jsx
// App.jsx
useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);
```

---

## Implementasi React Hook

### useState
Digunakan untuk menyimpan state lokal di beberapa tempat:

```jsx
// App.jsx — menyimpan data user, query pencarian, status loading & error
const [users, setUsers] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// AppContext.jsx — menyimpan status like dan follow tiap user
const [likedUsers, setLikedUsers] = useState({});
const [followedUsers, setFollowedUsers] = useState({});
```

### useEffect
Digunakan untuk menjalankan efek samping (side effect), yaitu fetch data dari API ketika component App pertama kali dimuat:

```jsx
// App.jsx
useEffect(() => {
  fetchUsers(); // dipanggil sekali saat mount
}, []);
```

### useContext
Digunakan agar state likes dan follows bisa diakses dari `UserCard` tanpa perlu meneruskan props secara manual (prop drilling).

```jsx
// AppContext.jsx — membuat dan mengekspor context
const AppContext = createContext();
export function AppProvider({ children }) { ... }
export function useAppContext() {
  return useContext(AppContext);
}

// UserCard.jsx — mengonsumsi context
const { likedUsers, followedUsers, toggleLike, toggleFollow } = useAppContext();
```

### useRef
Digunakan di `Navbar.jsx` untuk mendapatkan referensi langsung ke elemen input pencarian, sehingga setelah tombol "clear" ditekan, fokus kembali ke input secara otomatis.

```jsx
// Navbar.jsx
const searchRef = useRef(null);

const handleClear = () => {
  setSearchQuery('');
  searchRef.current.focus(); // akses DOM langsung tanpa re-render
};

<input ref={searchRef} ... />
```

---

## Fitur Interaktivitas

| Fitur | Keterangan |
|---|---|
| **Search** | Filter user berdasarkan nama, username, atau email secara real-time |
| **Like** | Toggle ❤️ pada tiap user card, state tersimpan di context |
| **Follow** | Toggle Follow/Following, card yang di-follow memiliki border berwarna |

---

## Teknologi

- React 19 + Vite
- JSONPlaceholder API
- CSS Variables (light & dark mode)

---

