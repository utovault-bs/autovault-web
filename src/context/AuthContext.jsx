import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { const token = localStorage.getItem('token'); if (token) fetchUser(); else setLoading(false); }, []);
  const fetchUser = async () => { try { const { data } = await api.get('/auth/me'); setUser(data.user); } catch { localStorage.removeItem('token'); } finally { setLoading(false); } };
  const login = async (email, password) => { const { data } = await api.post('/auth/login', { email, password }); localStorage.setItem('token', data.token); setUser(data.user); return data.user; };
  const register = async (userData) => { const { data } = await api.post('/auth/register', userData); localStorage.setItem('token', data.token); setUser(data.user); return data.user; };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };
  const isAdmin = () => user?.role === 'admin';
  return <AuthContext.Provider value={{ user, login, register, logout, isAdmin, loading }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
