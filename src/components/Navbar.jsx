import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return <nav className="navbar">
    <Link to="/" className="logo" onClick={close}>AutoVault</Link>
    <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <div className={`nav-links${menuOpen ? ' open' : ''}`}>
      <Link to="/" onClick={close}>Browse</Link>
      <Link to="/plates" onClick={close}>Plates</Link>
      {user ? <>
        <Link to="/sell" onClick={close}>Sell Car</Link>
        <Link to="/messages" onClick={close}>Messages</Link>
        {isAdmin() && <Link to="/admin" onClick={close}>Admin</Link>}
        <span className="user-name">{user.name}</span>
        <button onClick={() => { logout(); close(); }}>Sign Out</button>
      </> : <>
        <Link to="/login" onClick={close}>Sign In</Link>
        <Link to="/register" className="btn-primary" onClick={close}>Get Started</Link>
      </>}
    </div>
  </nav>;
};
export default Navbar;
