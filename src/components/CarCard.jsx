import { Link } from 'react-router-dom';
const CarCard = ({ car, view }) => {
  const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  const priceDrop = car.previous_price && car.previous_price > car.price;
  const dropAmount = priceDrop ? car.previous_price - car.price : 0;
  const ratingConfig = {
    great: { label: 'Great Deal', cls: 'deal-great' },
    good: { label: 'Good Deal', cls: 'deal-good' },
    fair: { label: 'Fair Price', cls: 'deal-fair' },
    overpriced: { label: 'Overpriced', cls: 'deal-overpriced' },
  };
  const rating = ratingConfig[car.deal_rating];
  return <div className={`car-card${view === 'list' ? ' car-card-list' : ''}`}><div className="car-image"><img src={car.main_image || '/placeholder-car.jpg'} alt={`${car.year} ${car.make}`} loading="lazy" /><div className="car-badges">{car.status === 'sold' && <span className="badge sold">SOLD</span>}{priceDrop && <span className="badge price-drop">-${dropAmount.toLocaleString()}</span>}{rating && <span className={`badge deal-badge ${rating.cls}`}>{rating.label}</span>}</div></div><div className="car-info"><h3>{car.year} {car.make} {car.model}</h3><p className="trim">{car.trim}</p><div className="details"><span>{car.mileage?.toLocaleString()} mi</span><span>{car.transmission}</span><span>{car.fuel_type}</span></div><div className="price-row"><span className="price">{formatPrice(car.price)}</span>{priceDrop && <><span className="original-price">{formatPrice(car.previous_price)}</span><span className="price-drop-label">Price Drop</span></>}</div><Link to={`/cars/${car.id}`} className="btn-view">View Details</Link></div></div>;
};
export default CarCard;
