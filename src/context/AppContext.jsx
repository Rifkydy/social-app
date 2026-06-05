import { createContext, useState, useContext } from 'react';

// Membuat context untuk state global (likes & follows)
const AppContext = createContext();

export function AppProvider({ children }) {
  const [likedUsers, setLikedUsers] = useState({});
  const [followedUsers, setFollowedUsers] = useState({});

  // Toggle like untuk user tertentu berdasarkan id
  const toggleLike = (userId) => {
    setLikedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // Toggle follow untuk user tertentu berdasarkan id
  const toggleFollow = (userId) => {
    setFollowedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <AppContext.Provider value={{ likedUsers, followedUsers, toggleLike, toggleFollow }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook agar mudah digunakan di component lain
export function useAppContext() {
  return useContext(AppContext);
}
