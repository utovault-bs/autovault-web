import { useState, useEffect } from 'react';
import api from '../api/client';
const AdminDashboard = () => {
  const [tab, setTab] = useState('users');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchStats = async () => { try { const { data } = await api.get('/admin/stats'); setStats(data); } catch {} };
  const fetchUsers = async () => { try { const { data } = await api.get('/admin/users'); setUsers(data); } catch {} };
  const fetchCars = async () => { try { const { data } = await api.get('/admin/cars'); setCars(data); } catch {} };
  useEffect(() => { Promise.all([fetchStats(), fetchUsers(), fetchCars()]).finally(() => setLoading(false)); }, []);
  const deleteUser = async (id) => { if (!confirm('Delete this user?')) return; try { await api.delete(`/admin/users/${id}`); fetchUsers(); } catch {} };
  const deleteCar = async (id) => { if (!confirm('Delete this listing?')) return; try { await api.delete(`/admin/cars/${id}`); fetchCars(); } catch {} };
  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);
  if (loading) return <div className="spinner">Loading...</div>;
  return <div className="admin-dashboard"><h1>Admin Dashboard</h1><div className="stats-grid"><div className="stat-card"><h3>Total Cars</h3><div className="value">{stats?.totalCars || 0}</div></div><div className="stat-card"><h3>Active Listings</h3><div className="value">{stats?.activeCars || 0}</div></div><div className="stat-card"><h3>Total Users</h3><div className="value">{stats?.totalUsers || 0}</div></div><div className="stat-card"><h3>Revenue</h3><div className="value">{formatPrice(stats?.totalRevenue || 0)}</div></div></div><div className="admin-tabs"><button className={tab === 'users' ? 'active' : ''} onClick={() => setTab('users')}>Users</button><button className={tab === 'cars' ? 'active' : ''} onClick={() => setTab('cars')}>Listings</button></div>{tab === 'users' ? <table className="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Listings</th><th>Actions</th></tr></thead><tbody>{users.map(u => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.listing_count}</td><td>{u.role !== 'admin' && <button className="delete-btn" onClick={() => deleteUser(u.id)}>Delete</button>}</td></tr>)}</tbody></table> : <table className="admin-table"><thead><tr><th>Listing</th><th>Price</th><th>Seller</th><th>Status</th><th>Actions</th></tr></thead><tbody>{cars.map(c => <tr key={c.id}><td>{c.year} {c.make} {c.model}</td><td>{formatPrice(c.price)}</td><td>{c.seller_name}</td><td>{c.status}</td><td><button className="delete-btn" onClick={() => deleteCar(c.id)}>Delete</button></td></tr>)}</tbody></table>}</div>;
};
export default AdminDashboard;
