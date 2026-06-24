import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' }); const [error, setError] = useState('');
  const { login } = useAuth(); const navigate = useNavigate();
  const handleSubmit = async (e) => { e.preventDefault(); try { await login(form.email, form.password); navigate('/'); } catch (err) { setError(err.response?.data?.message || 'Invalid credentials'); } };
  return <div className="auth-page"><form onSubmit={handleSubmit}><h2>Sign In</h2>{error && <div className="error-msg">{error}</div>}<input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /><input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required /><button type="submit">Sign In</button><p>Don't have an account? <Link to="/register">Create one</Link></p></form></div>;
};
export default Login;
