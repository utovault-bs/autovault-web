import { Link } from 'react-router-dom';
import { fmtPrice, fmtMileage } from '../utils/format';
const CarCard = ({ car, view }) => {
  const priceDrop = car.previous_price && car.previous_price > car.price;
  const dropAmount = priceDrop ? car.previous_price - car.price : 0;
  const distance = car.distance != null ? Math.round(car.distance) : null;
  return <div className={`car-card${view === 'list' ? ' car-card-list' : ''}`}><div className="car-image"><img src={car.main_image || '/placeholder-car.jpg'} alt={`${car.year} ${car.make}`} loading="lazy" /><div className="car-badges">{car.status === 'sold' && <span className="badge sold">SOLD</span>}{priceDrop && <span className="badge price-drop">-${dropAmount.toLocaleString()}</span>}</div></div><div className="car-info"><h3>{car.year} {car.make} {car.model}</h3><p className="trim">{car.trim}</p><div className="details"><span>{car.mileage != null ? fmtMileage(car.mileage) : ''}</span><span>{car.transmission}</span><span>{car.fuel_type}</span>{distance != null && <span>{distance} mi away</span>}</div><div className="price-row"><span className="price">{fmtPrice(car.price)}</span>{priceDrop && <><span className="original-price">{fmtPrice(car.previous_price)}</span><span className="price-drop-label">Price Drop</span></>}</div><Link to={`/cars/${car.id}`} className="btn-view">View Details</Link></div></div>;
};
export default CarCard;
