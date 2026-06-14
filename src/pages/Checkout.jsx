import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById } from '../api/cars';
import api from '../api/client';
const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [cardInfo, setCardInfo] = useState({ number: '', exp: '', cvc: '', name: '' });
  useEffect(() => { getCarById(id).then(({ data }) => { setCar(data); setLoading(false); }).catch(() => { setError('Car not found'); setLoading(false); }); }, [id]);
  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    try {
      const { data } = await api.post('/payments/create-intent', { carId: car.id, amount: car.price * 100 });
      await api.post('/orders/confirm', { paymentIntentId: data.paymentIntentId, carId: car.id });
      navigate(`/order-success?carId=${car.id}&amount=${car.price}`);
    } catch (err) { setError(err.response?.data?.message || 'Payment failed'); } finally { setProcessing(false); }
  };
  if (loading) return <div className="spinner">Loading...</div>;
  if (error && !car) return <div className="error">{error}</div>;
  if (!car) return null;
  if (car.status === 'sold') return <div className="error">This car has already been sold.</div>;
  return <div className="checkout-page"><h2>Checkout</h2><div className="checkout-form"><div className="order-summary"><img src={car.main_image || '/placeholder-car.jpg'} alt={car.model} /><div><h3>{car.year} {car.make} {car.model}</h3><p className="trim">{car.trim}</p><p className="price">{formatPrice(car.price)}</p></div></div>{error && <div className="error-msg">{error}</div>}<form onSubmit={handleSubmit}><div className="card-element"><label>Cardholder Name</label><input type="text" placeholder="John Doe" value={cardInfo.name} onChange={e => setCardInfo({...cardInfo, name: e.target.value})} required /></div><div className="card-element"><label>Card Number</label><input type="text" placeholder="4242 4242 4242 4242" value={cardInfo.number} onChange={e => setCardInfo({...cardInfo, number: e.target.value})} required /></div><div style={{ display: 'flex', gap: 16 }}><div className="card-element" style={{ flex: 1 }}><label>Expiry</label><input type="text" placeholder="MM/YY" value={cardInfo.exp} onChange={e => setCardInfo({...cardInfo, exp: e.target.value})} required /></div><div className="card-element" style={{ flex: 1 }}><label>CVC</label><input type="text" placeholder="123" value={cardInfo.cvc} onChange={e => setCardInfo({...cardInfo, cvc: e.target.value})} required /></div></div><button type="submit" disabled={processing}>{processing ? 'Processing...' : `Pay ${formatPrice(car.price)}`}</button></form></div></div>;
};
export default Checkout;
