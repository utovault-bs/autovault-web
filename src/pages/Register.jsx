import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    try { await register(form); navigate('/'); }
    catch (err) { setError(err.response?.data?.message || 'Registration failed'); }
  };
  return <div className="auth-page"><form onSubmit={handleSubmit}><h2>Create Account</h2>{error && <div className="error-msg">{error}</div>}<input type="text" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /><input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /><input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /><input type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required /><button type="submit">Create Account</button><p>Already have an account? <Link to="/login">Sign In</Link></p></form></div>;
};
export default Register;
