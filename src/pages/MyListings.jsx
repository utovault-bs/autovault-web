import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
const MyListings = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!user) return;
    api.get('/cars', { params: { seller_id: user.id, limit: 100 } }).then(({ data }) => {
      setCars(data.cars || []);
      setLoading(false);
    }).catch(() => { setError('Failed to load listings'); setLoading(false); });
  }, [user]);
  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);
  if (!user) return <div className="spinner">Please sign in to view your listings.</div>;
  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  return <div className="sell-page"><h2>My Listings</h2>{cars.length === 0 ? <p style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>You haven't listed any cars yet. <Link to="/sell">List your first car</Link></p> : <div className="listings-table"><div className="listings-header"><span>Photo</span><span>Car</span><span>Price</span><span>Status</span><span>Actions</span></div>{cars.map(car => <div key={car.id} className="listings-row"><div className="listing-photo"><img src={car.main_image || '/placeholder-car.jpg'} alt="" /></div><div><Link to={`/cars/${car.id}`}>{car.year} {car.make} {car.model}</Link><br /><small>{car.city}{car.city && car.state ? ', ' : ''}{car.state}</small></div><div>{formatPrice(car.price)}</div><div><span className={`status-badge status-${car.status}`}>{car.status}</span></div><div><Link to={`/cars/${car.id}/edit`} className="btn-secondary">Edit</Link></div></div>)}</div>}</div>;
};
export default MyListings;
