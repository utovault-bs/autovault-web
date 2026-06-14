import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  return <nav className="navbar"><Link to="/" className="logo">AutoVault</Link><div className="nav-links"><Link to="/">Browse</Link>{user ? <><Link to="/sell">Sell Car</Link><Link to="/messages">Messages</Link>{isAdmin() && <Link to="/admin">Admin</Link>}<span className="user-name">{user.name}</span><button onClick={logout}>Sign Out</button></> : <><Link to="/login">Sign In</Link><Link to="/register" className="btn-primary">Get Started</Link></>}</div></nav>;
};
export default Navbar;
