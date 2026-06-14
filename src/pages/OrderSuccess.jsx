import { Link, useSearchParams } from 'react-router-dom';
const OrderSuccess = () => {
  const [params] = useSearchParams();
  const amount = params.get('amount');
  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(p));
  return <div className="success-page"><div className="success-icon">✓</div><h2>Purchase Successful!</h2><p>Congratulations on your new car.</p><div className="amount">{formatPrice(amount)}</div><div className="next-steps"><p><strong>What's next?</strong></p><p>The seller will contact you within 24 hours to arrange pickup and paperwork.</p></div><Link to="/" className="btn-primary">Browse More Cars</Link><Link to="/messages" className="btn-secondary">View Messages</Link></div>;
};
export default OrderSuccess;
