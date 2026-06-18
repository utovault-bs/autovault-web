import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { pathname, search } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const active = (path) => pathname + search === path ? 'active' : '';
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ marginRight: 8, verticalAlign: 'middle' }}>
          <rect width="28" height="28" rx="6" fill="#111"/>
          <path d="M8 14h12M14 8v12M6 10l16 4M6 18l16-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="14" cy="14" r="10" stroke="#fff" strokeWidth="1.5" fill="none"/>
        </svg>
        AutoVault
      </Link>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span className={menuOpen ? 'open' : ''}></span>
        <span className={menuOpen ? 'open' : ''}></span>
        <span className={menuOpen ? 'open' : ''}></span>
      </button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className={active('/')} onClick={() => setMenuOpen(false)}>Vehicles</Link>
        <div className="budget-nav-item" onMouseEnter={() => setBudgetOpen(true)} onMouseLeave={() => setBudgetOpen(false)}>
          <button className="budget-nav-btn" onClick={() => setBudgetOpen(!budgetOpen)}>Budget ▾</button>
          <div className={`budget-nav-dropdown ${budgetOpen ? 'open' : ''}`}>
            <Link to="/budget/5000" onClick={() => { setBudgetOpen(false); setMenuOpen(false); }}>$5,000 & Under</Link>
            <Link to="/budget/10000" onClick={() => { setBudgetOpen(false); setMenuOpen(false); }}>$10,000 & Under</Link>
            <Link to="/budget/15000" onClick={() => { setBudgetOpen(false); setMenuOpen(false); }}>$15,000 & Under</Link>
            <Link to="/budget/20000" onClick={() => { setBudgetOpen(false); setMenuOpen(false); }}>$20,000 & Under</Link>
          </div>
        </div>
        <Link to="/plates" onClick={() => setMenuOpen(false)}>Plates</Link>
        <Link to="/sell" onClick={() => setMenuOpen(false)}>Sell Car</Link>
        <Link to="/plates/sell" onClick={() => setMenuOpen(false)}>Sell Plate</Link>
        <div className="mobile-budget-group">
          <span className="mobile-budget-label">Budget</span>
          <Link to="/budget/5000" onClick={() => setMenuOpen(false)}>$5,000 & Under</Link>
          <Link to="/budget/10000" onClick={() => setMenuOpen(false)}>$10,000 & Under</Link>
          <Link to="/budget/15000" onClick={() => setMenuOpen(false)}>$15,000 & Under</Link>
          <Link to="/budget/20000" onClick={() => setMenuOpen(false)}>$20,000 & Under</Link>
        </div>
        {user ? (
          <>
            <Link to="/my-listings" onClick={() => setMenuOpen(false)}>My Listings</Link>
            <Link to="/messages" onClick={() => setMenuOpen(false)}>Messages</Link>
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
