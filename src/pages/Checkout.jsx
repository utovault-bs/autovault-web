import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getCarById } from '../api/cars';
import api from '../api/client';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const CheckoutForm = ({ car, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError('');
    try {
      const { data } = await api.post('/payments/create-intent', { carId: car.id, amount: car.price * 100 });
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      });
      if (confirmError) { setError(confirmError.message); setProcessing(false); return; }
      if (paymentIntent.status === 'succeeded') {
        await api.post('/orders/confirm', { paymentIntentId: paymentIntent.id, carId: car.id });
        onSuccess();
      }
    } catch (err) { setError(err.response?.data?.message || 'Payment failed'); }
    setProcessing(false);
  };

  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-msg">{error}</div>}
      <div className="card-element">
        <label>Card Details</label>
        <CardElement options={{ style: { base: { fontSize: '16px', color: '#111' } } }} />
      </div>
      <button type="submit" disabled={processing || !stripe}>
        {processing ? 'Processing...' : `Pay ${formatPrice(car.price)}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCarById(id).then(({ data }) => { setCar(data); setLoading(false); })
      .catch(() => { setError('Car not found'); setLoading(false); });
  }, [id]);

  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  if (loading) return <div className="spinner">Loading...</div>;
  if (error && !car) return <div className="error">{error}</div>;
  if (!car) return null;
  if (car.status === 'sold') return <div className="error">This car has already been sold.</div>;

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-form">
        <div className="order-summary">
          <img src={car.main_image || '/placeholder-car.jpg'} alt={car.model} />
          <div>
            <h3>{car.year} {car.make} {car.model}</h3>
            <p className="trim">{car.trim}</p>
            <p className="price">{formatPrice(car.price)}</p>
          </div>
        </div>
        {stripePromise ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm car={car} onSuccess={() => navigate(`/order-success?carId=${car.id}&amount=${car.price}`)} />
          </Elements>
        ) : (
          <p className="error-msg">Stripe is not configured. Set VITE_STRIPE_PUBLIC_KEY in your environment.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
