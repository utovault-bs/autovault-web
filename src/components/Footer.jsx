import { Link } from 'react-router-dom';
const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-col">
        <h4>AutoVault</h4>
        <p>The smart way to buy & sell used cars and license plates.</p>
        <Link to="/terms" className="footer-terms">Terms &amp; Conditions</Link>
      </div>
      <div className="footer-col">
        <h4>Browse</h4>
        <Link to="/">Vehicles</Link>
        <Link to="/plates">License Plates</Link>
      </div>
      <div className="footer-col">
        <h4>Sell</h4>
        <Link to="/sell">Sell a Car</Link>
        <Link to="/plates/sell">Sell a Plate</Link>
        <Link to="/my-listings">My Listings</Link>
      </div>
    </div>
    <div className="footer-bottom">
      &copy; {new Date().getFullYear()} AutoVault. All rights reserved.
    </div>
  </footer>
);
export default Footer;
