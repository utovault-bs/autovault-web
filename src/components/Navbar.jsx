import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return <nav className="navbar">
    <Link to="/" className="logo" onClick={close}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ marginRight: 8, verticalAlign: 'middle' }}>
        <rect width="28" height="28" rx="6" fill="#111"/>
        <path d="M8 14h12M14 8v12M6 10l16 4M6 18l16-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="10" stroke="#fff" strokeWidth="1.5" fill="none"/>
      </svg>
      AutoVault
    </Link>
    <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <div className={`nav-links${menuOpen ? ' open' : ''}`}>
      <Link to="/" onClick={close}>Cars</Link>
      <Link to="/plates" onClick={close}>Plates</Link>
      <Link to="/sell" onClick={close}>Sell Car</Link>
      <Link to="/plates/sell" onClick={close}>Sell Plate</Link>
      {user ? <>
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
