import { Link } from 'react-router-dom';
const PlateCard = ({ plate }) => {
  const fmt = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);
  return (
    <div className="plate-card">
      <div className="plate-image">
        <img src={plate.main_image || '/placeholder-plate.jpg'} alt={plate.title} loading="lazy" />
        {plate.status === 'sold' && <span className="badge sold">SOLD</span>}
      </div>
      <div className="plate-info">
        <div className="plate-text-display">{plate.plate_text}</div>
        <h3>{plate.title}</h3>
        <div className="plate-meta">
          <span>{plate.jurisdiction}</span>
          <span className="plate-type">{plate.type}</span>
        </div>
        <div className="price-row">
          <span className="price">{fmt(plate.price)}</span>
          {plate.watchers_count > 0 && <span className="watchers">{plate.watchers_count} watching</span>}
        </div>
        <Link to={`/plates/${plate.id}`} className="btn-view">View Plate</Link>
      </div>
    </div>
  );
};
export default PlateCard;
