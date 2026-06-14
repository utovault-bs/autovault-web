import { Link } from 'react-router-dom';
const CarCard = ({ car }) => {
  const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  return <div className="car-card"><div className="car-image"><img src={car.main_image || '/placeholder-car.jpg'} alt={`${car.year} ${car.make}`} loading="lazy" />{car.status === 'sold' && <span className="badge sold">SOLD</span>}</div><div className="car-info"><h3>{car.year} {car.make} {car.model}</h3><p className="trim">{car.trim}</p><div className="details"><span>{car.mileage?.toLocaleString()} mi</span><span>{car.transmission}</span><span>{car.fuel_type}</span></div><div className="price-row"><span className="price">{formatPrice(car.price)}</span>{car.originalPrice > car.price && <span className="original-price">{formatPrice(car.originalPrice)}</span>}</div><Link to={`/cars/${car.id}`} className="btn-view">View Details</Link></div></div>;
};
export default CarCard;
