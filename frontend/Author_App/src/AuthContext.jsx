import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // 🔴 add this

  const refresh = async () => {
    try {
      const res = await fetch('http://localhost:3000/refresh', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.accessToken);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error('Refresh failed', err);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false); // ✅ done loading
    }
  };

  const login = (userData) => {
    setUser(userData.user);
    setToken(userData.accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    refresh(); // Refresh on first load
  }, []);

  if (loading) return <p>Loading...</p>; // or a spinner

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
