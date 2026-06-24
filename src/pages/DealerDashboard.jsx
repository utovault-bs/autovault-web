import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

const DealerDashboard = () => {
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    api.get('/subscription').then(({ data }) => {
      setSub(data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handlePortal = async () => {
    setPortalLoading(true);
    try {
      const { data } = await api.post('/subscription/portal');
      window.location.href = data.url;
    } catch (err) {
      alert('Failed to open management portal');
    } finally { setPortalLoading(false); }
  };

  if (loading) return <div className="spinner">Loading...</div>;
  if (!sub) return <div className="error">Failed to load subscription info.</div>;

  const pct = sub.listings_limit > 0 ? Math.round((sub.listings_used / sub.listings_limit) * 100) : 0;

  return (
    <div className="dashboard-page">
      <h1>Dealer Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card plan-card">
          <h3>Current Plan</h3>
          <div className="plan-name">{sub.tier_name || 'Free'}</div>
          <div className="plan-status">
            <span className={`status-dot ${sub.subscription_status === 'active' ? 'active' : ''}`}></span>
            {sub.subscription_status === 'active' ? 'Active' : sub.subscription_status || 'Active'}
          </div>
          {sub.current_period_end && (
            <div className="plan-period">
              Renews {new Date(sub.current_period_end * 1000 || sub.current_period_end).toLocaleDateString()}
            </div>
          )}
          {sub.tier_slug !== 'enterprise' && (
            <Link to="/pricing" className="btn-upgrade">Upgrade Plan</Link>
          )}
        </div>

        <div className="dashboard-card usage-card">
          <h3>Listing Usage</h3>
          <div className="usage-numbers">
            <span className="usage-used">{sub.listings_used}</span>
            <span className="usage-sep">/</span>
            <span className="usage-limit">{sub.listings_limit}</span>
          </div>
          <div className="usage-bar-wrapper">
            <div className="usage-bar" style={{ width: `${Math.min(pct, 100)}%` }}></div>
          </div>
          <div className="usage-label">{sub.listings_limit - sub.listings_used} remaining</div>
          <Link to="/my-listings" className="btn-secondary">View My Listings</Link>
        </div>
      </div>

      <div className="dashboard-actions">
        <h3>Manage Subscription</h3>
        <p>Update payment method, view invoices, or cancel your subscription.</p>
        <button className="btn-primary" onClick={handlePortal} disabled={portalLoading}>
          {portalLoading ? 'Loading...' : 'Manage in Stripe Portal'}
        </button>
      </div>

      <div className="dashboard-next">
        <Link to="/sell" className="btn-primary">List a New Car</Link>
        <Link to="/plates/sell" className="btn-secondary">List a License Plate</Link>
      </div>
    </div>
  );
};
export default DealerDashboard;
