import { Link } from 'react-router-dom';
const Advertise = () => {
  const features = [
    { icon: '🔍', title: 'Smart Search', desc: 'Find exactly what you want with powerful filters — make, model, budget, location, and more.' },
    { icon: '💰', title: 'Budget Tool', desc: 'Tell us what you can spend and we\'ll show you the best deals within your range.' },
    { icon: '🛡️', title: 'Secure Payments', desc: 'Every transaction is protected through Stripe. Your money stays safe until you\'re satisfied.' },
    { icon: '📸', title: 'Rich Listings', desc: 'Sellers showcase their cars with multiple photos, detailed specs, and honest descriptions.' },
    { icon: '💬', title: 'Direct Messaging', desc: 'Talk to sellers instantly through our built-in messaging system. No phone tag.' },
    { icon: '📋', title: 'Plate Marketplace', desc: 'Rare and custom license plates available for purchase. Build your collection.' },
  ];
  const steps = [
    { num: '1', title: 'Browse', desc: 'Explore thousands of listings with photos, prices, and details.' },
    { num: '2', title: 'Connect', desc: 'Message sellers directly, ask questions, and negotiate.' },
    { num: '3', title: 'Buy Safely', desc: 'Complete your purchase through our secure checkout.' },
    { num: '4', title: 'Drive Away', desc: 'Pick up your car and enjoy the open road.' },
  ];
  return (
    <div className="advertise-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-logo">
            <svg width="56" height="56" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#dc2626"/>
              <path d="M8 14h12M14 8v12M6 10l16 4M6 18l16-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="14" cy="14" r="10" stroke="#fff" strokeWidth="1.5" fill="none"/>
            </svg>
            <h1>AutoVault</h1>
          </div>
          <p className="hero-tagline">The smarter way to buy and sell used cars.</p>
          <p className="hero-sub">Thousands of verified listings. Transparent pricing. Secure transactions.</p>
          <div className="hero-actions">
            <Link to="/" className="hero-btn-primary">Browse Vehicles</Link>
            <Link to="/sell" className="hero-btn-secondary">List Your Car</Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-item">
          <span className="stat-number">5,000+</span>
          <span className="stat-label">Listings</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50k+</span>
          <span className="stat-label">Monthly Visitors</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">Satisfied Sellers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50 States</span>
          <span className="stat-label">Coverage</span>
        </div>
      </section>

      <section className="features-section">
        <h2>Why AutoVault?</h2>
        <p className="section-sub">Everything you need for a stress-free car buying and selling experience.</p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-section">
        <h2>How It Works</h2>
        <p className="section-sub">Buying a car on AutoVault is simple.</p>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to sell your car?</h2>
          <p>List it on AutoVault and reach thousands of serious buyers. It's free to get started.</p>
          <Link to="/sell" className="hero-btn-primary">Start Selling</Link>
        </div>
        <div className="cta-card">
          <h2>Looking for your next ride?</h2>
          <p>Browse thousands of vehicles in your area. Find the perfect match today.</p>
          <Link to="/" className="hero-btn-primary">Start Browsing</Link>
        </div>
      </section>
    </div>
  );
};
export default Advertise;
