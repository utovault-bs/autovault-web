import { useState } from 'react';
import { useCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import CarFilters from '../components/CarFilters';
const BrowsePage = () => {
  const [filters, setFilters] = useState({ search: '', make: '', minPrice: '', maxPrice: '', fuel_type: '', transmission: '', body_style: '', sortBy: 'newest', page: 1 });
  const { cars, loading, error, totalPages } = useCars(filters, filters.page);
  return <div className="browse-page"><div className="browse-header"><h1>Find Your Next Car</h1><CarFilters filters={filters} onChange={setFilters} /></div>{loading ? <div className="spinner">Loading...</div> : error ? <div className="error">{error}</div> : cars.length === 0 ? <div className="no-results"><h2>No cars found</h2><p>Try adjusting your search or filters.</p></div> : <><div className="car-grid">{cars.map(car => <CarCard key={car.id} car={car} />)}</div><div className="pagination"><button disabled={filters.page <= 1} onClick={() => setFilters(f => ({...f, page: f.page - 1}))}>Previous</button><span>Page {filters.page} of {totalPages}</span><button disabled={filters.page >= totalPages} onClick={() => setFilters(f => ({...f, page: f.page + 1}))}>Next</button></div></>}</div>;
};
export default BrowsePage;
