import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const { user, logout, isAdmin, isDealer } = useAuth();
  const { pathname, search } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const active = (path) => pathname + search === path ? 'active' : '';
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="/logo.svg" alt="AutoVault" width="130" height="30" style={{ display: 'block' }} />
      </Link>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span className={menuOpen ? 'open' : ''}></span>
        <span className={menuOpen ? 'open' : ''}></span>
        <span className={menuOpen ? 'open' : ''}></span>
      </button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/advertise" onClick={() => setMenuOpen(false)}>Advertise</Link>
        <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
        <Link to="/" className={active('/')} onClick={() => setMenuOpen(false)}>Vehicles</Link>
        <Link to="/budget/5000" className={active('/budget/5000')} onClick={() => setMenuOpen(false)}>Budget</Link>
        <Link to="/plates" onClick={() => setMenuOpen(false)}>Plates</Link>
        <Link to="/sell" onClick={() => setMenuOpen(false)}>Sell Car</Link>
        <Link to="/plates/sell" onClick={() => setMenuOpen(false)}>Sell Plate</Link>
        {user ? (
          <>
            <Link to="/my-listings" onClick={() => setMenuOpen(false)}>My Listings</Link>
            <Link to="/messages" onClick={() => setMenuOpen(false)}>Messages</Link>
            {(isDealer() || isAdmin()) && <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>}
            {isAdmin() && <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>}
            <span className="user-name">{user.name}</span>
            <button onClick={() => { logout(); setMenuOpen(false); }}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
            <Link to="/register" className="btn-primary" onClick={() => setMenuOpen(false)}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
