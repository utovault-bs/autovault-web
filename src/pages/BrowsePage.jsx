import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import CarFilters from '../components/CarFilters';
import Pagination from '../components/Pagination';
const BrowsePage = () => {
  const [filters, setFilters] = useState({ search: '', make: '', minPrice: '', maxPrice: '', fuel_type: '', transmission: '', body_style: '', sortBy: 'newest', page: 1 });
  const { cars, loading, error, totalPages } = useCars(filters, filters.page);
  const handlePage = (p) => { setFilters(f => ({...f, page: p})); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <div className="browse-page"><div className="browse-header"><h1>Find Your Next Car</h1><Link to="/sell" className="sell-cta">List Your Car</Link><CarFilters filters={filters} onChange={setFilters} /></div>{loading ? <div className="spinner">Loading...</div> : error ? <div className="error">{error}</div> : cars.length === 0 ? <div className="no-results"><h2>No cars found</h2><p>Try adjusting your search or filters.</p></div> : <><div className="car-grid">{cars.map(car => <CarCard key={car.id} car={car} />)}</div><Pagination current={filters.page} total={totalPages} onChange={handlePage} /></>}</div>;
};
export default BrowsePage;
