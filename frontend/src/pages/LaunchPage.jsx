import { Link } from 'react-router-dom';
const LaunchPage = () => (
  <div className="launch-page">
    <section className="launch-hero">
      <img src="/logo.svg" alt="AutoVault" className="launch-logo" />
      <h1>AutoVault is Live</h1>
      <p className="launch-tagline">The smartest way to buy and sell<br />used cars and license plates</p>
      <div className="launch-ctas">
        <Link to="/" className="launch-btn-primary">Browse Vehicles</Link>
        <Link to="/sell" className="launch-btn-secondary">Start Selling</Link>
      </div>
    </section>
    <section className="launch-features">
      <div className="launch-feature-card">
        <div className="launch-feature-icon">$</div>
        <h3>Budget Search</h3>
        <p>Find cars under $5k, $10k, $15k, or $20k — whatever fits your wallet.</p>
      </div>
      <div className="launch-feature-card">
        <div className="launch-feature-icon">💬</div>
        <h3>Direct Messaging</h3>
        <p>Chat with sellers right on the platform. No third-party hassle.</p>
      </div>
      <div className="launch-feature-card">
        <div className="launch-feature-icon">🏷️</div>
        <h3>License Plates</h3>
        <p>Buy and sell custom and specialty plates alongside vehicles.</p>
      </div>
    </section>
    <section className="launch-steps">
      <h2>How It Works</h2>
      <div className="launch-steps-row">
        <div className="launch-step">
          <span className="launch-step-num">1</span>
          <h4>Search</h4>
          <p>Browse vehicles or plates by category, budget, or location.</p>
        </div>
        <div className="launch-step-arrow">→</div>
        <div className="launch-step">
          <span className="launch-step-num">2</span>
          <h4>Message</h4>
          <p>Connect with sellers directly through the platform.</p>
        </div>
        <div className="launch-step-arrow">→</div>
        <div className="launch-step">
          <span className="launch-step-num">3</span>
          <h4>Drive</h4>
          <p>Meet up and drive away with your new ride.</p>
        </div>
      </div>
    </section>
    <footer className="launch-footer">
      <img src="/logo.svg" alt="AutoVault" className="launch-footer-logo" />
      <p>&copy; {new Date().getFullYear()} AutoVault. All rights reserved.</p>
    </footer>
  </div>
);
export default LaunchPage;
