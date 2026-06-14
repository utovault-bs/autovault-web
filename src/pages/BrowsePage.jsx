import { useState } from 'react';
import { useCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
const BrowsePage = () => {
  const [filters, setFilters] = useState({ search: '', make: '', minPrice: '', maxPrice: '', sortBy: 'newest', page: 1 });
  const { cars, loading, error, totalPages } = useCars(filters, filters.page);
  return <div className="browse-page"><div className="filters"><input placeholder="Search..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} /><select value={filters.sortBy} onChange={e => setFilters({...filters, sortBy: e.target.value})}><option value="newest">Newest</option><option value="price_asc">Price Low</option><option value="price_desc">Price High</option></select></div>{loading ? <div>Loading...</div> : error ? <div>{error}</div> : <div className="cars-grid">{cars.map(car => <CarCard key={car.id} car={car} />)}</div>}</div>;
};
export default BrowsePage;
