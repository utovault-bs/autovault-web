import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import CarFilters from '../components/CarFilters';
import Pagination from '../components/Pagination';
import { getCarById } from '../api/cars';
const BrowsePage = () => {
  const [filters, setFilters] = useState({ search: '', make: '', minPrice: '', maxPrice: '', fuel_type: '', transmission: '', body_style: '', sortBy: 'newest', page: 1 });
  const { cars, loading, error, totalPages } = useCars(filters, filters.page);
  const [featured, setFeatured] = useState(null);
  useEffect(() => { getCarById(7).then(r => setFeatured(r.data)).catch(() => {}); }, []);
  const formatPrice = (p) => '$' + Number(p).toLocaleString('en-US', { minimumFractionDigits: 0 });
  const handlePage = (p) => { setFilters(f => ({...f, page: p})); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <div className="browse-page">{featured && <div className="featured-section"><Link to={`/cars/${featured.id}`} className="featured-card"><div className="featured-image"><img src={featured.images?.[0]?.url || featured.main_image} alt={`${featured.year} ${featured.make} ${featured.model}`} /><span className="featured-badge">Featured</span></div><div className="featured-info"><h2>{featured.year} {featured.make} {featured.model}</h2><p className="featured-trim">{featured.trim}</p><p className="featured-price">{formatPrice(featured.price)}</p><p className="featured-desc">{featured.description}</p><span className="featured-link">View Details →</span></div></Link></div>}<div className="browse-header"><h1>Find Your Next Car</h1><Link to="/sell" className="sell-cta">List Your Car</Link><CarFilters filters={filters} onChange={setFilters} /></div>{loading ? <div className="spinner">Loading...</div> : error ? <div className="error">{error}</div> : cars.length === 0 ? <div className="no-results"><h2>No cars found</h2><p>Try adjusting your search or filters.</p></div> : <><div className="car-grid">{cars.map(car => <CarCard key={car.id} car={car} />)}</div><Pagination current={filters.page} total={totalPages} onChange={handlePage} /></>}</div>;
};
export default BrowsePage;