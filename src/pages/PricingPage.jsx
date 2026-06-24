import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

const TIERS = [
  { name: 'Free', slug: 'free', price: '$0', priceCents: 0, listings: 1, features: ['1 active listing', 'List cars & plates', 'Messaging', 'Basic search visibility'], cta: 'Get Started', popular: false },
  { name: 'Starter', slug: 'starter', price: '$49', priceCents: 4900, listings: 5, features: ['5 active listings', 'All Free features', 'Dealership profile', 'Priority search placement', 'Listing analytics'], cta: 'Subscribe', popular: false },
  { name: 'Pro', slug: 'pro', price: '$99', priceCents: 9900, listings: 25, features: ['25 active listings', 'All Starter features', 'Bold listing badges', 'Featured carousel eligibility', 'Social media promotion'], cta: 'Subscribe', popular: true },
  { name: 'Enterprise', slug: 'enterprise', price: '$299', priceCents: 29900, listings: 100, features: ['100 active listings', 'All Pro features', 'API access', 'Dedicated support', 'Bulk listing tools', 'Custom dealership page'], cta: 'Subscribe', popular: false }
];

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(null);

  const getStripePriceId = (slug) => {
    if (slug === 'free') return null;
    const map = { starter: 'STRIPE_PRICE_STARTER', pro: 'STRIPE_PRICE_PRO', enterprise: 'STRIPE_PRICE_ENTERPRISE' };
    return import.meta.env[`VITE_${map[slug]}`] || null;
  };

  const handleSubscribe = async (slug) => {
    if (!user) { navigate('/register'); return; }
    if (slug === 'free') { navigate('/dashboard'); return; }
    const priceId = getStripePriceId(slug);
    if (!priceId) { alert('Payment not configured yet. Contact support.'); return; }
    setSubmitting(slug);
    try {
      const { data } = await api.post('/subscription/create-checkout', { priceId });
      window.location.href = data.url;
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to start checkout');
    } finally { setSubmitting(null); }
  };

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p className="pricing-subtitle">Start free, upgrade when you grow. No contracts, cancel anytime.</p>
      </div>

      <div className="pricing-grid">
        {TIERS.map(tier => {
          const isCurrent = user?.tier_slug === tier.slug;
          return (
            <div key={tier.slug} className={`pricing-card ${tier.popular ? 'popular' : ''} ${isCurrent ? 'current' : ''}`}>
              {tier.popular && <div className="pricing-badge">Most Popular</div>}
              {isCurrent && <div className="pricing-badge current-badge">Current Plan</div>}
              <h3 className="pricing-tier-name">{tier.name}</h3>
              <div className="pricing-price">
                <span className="price-amount">{tier.price}</span>
                <span className="price-period">/month</span>
              </div>
              <p className="pricing-limit">{tier.listings} listing{tier.listings > 1 ? 's' : ''}</p>
              <ul className="pricing-features">
                {tier.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button
                className={`pricing-cta ${tier.popular ? 'btn-primary' : 'btn-secondary'} ${isCurrent ? 'disabled' : ''}`}
                onClick={() => handleSubscribe(tier.slug)}
                disabled={isCurrent || submitting === tier.slug}
              >
                {submitting === tier.slug ? 'Redirecting...' : isCurrent ? 'Current Plan' : tier.cta}
              </button>
            </div>
          );
        })}
      </div>

      <div className="pricing-compare">
        <h2>How We Compare</h2>
        <p className="section-sub">Big portal prices vs. AutoVault's dealer plans</p>
        <div className="compare-table-wrapper">
          <table className="compare-table">
            <thead>
              <tr><th>Platform</th><th>Entry Level</th><th>Mid-Tier</th><th>Enterprise</th></tr>
            </thead>
            <tbody>
              <tr><td>Cars.com</td><td>$600–$1,200/mo</td><td>$1,200–$2,500/mo</td><td>$2,500–$7,000+/mo</td></tr>
              <tr><td>AutoTrader</td><td>~$450–$1,500/mo</td><td>$1,500–$2,800/mo</td><td>$2,800–$5,000+/mo</td></tr>
              <tr><td>CarGurus</td><td>$400–$800/mo</td><td>$800–$2,000/mo</td><td>$2,000+/mo</td></tr>
              <tr className="compare-highlight"><td><strong>AutoVault</strong></td><td><strong>$49/mo (5)</strong></td><td><strong>$99/mo (25)</strong></td><td><strong>$299/mo (100)</strong></td></tr>
            </tbody>
          </table>
        </div>
        <p className="compare-note">5–20x cheaper than the big portals. No long-term contracts. Month-to-month, cancel anytime.</p>
      </div>
    </div>
  );
};
export default PricingPage;
