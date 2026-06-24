import { useState } from 'react';
import { usePlates } from '../hooks/usePlates';
import PlateCard from '../components/PlateCard';
import PlateFilters from '../components/PlateFilters';
import Pagination from '../components/Pagination';
const PlatesBrowse = () => {
  const [filters, setFilters] = useState({ search: '', jurisdiction: '', type: '', minPrice: '', maxPrice: '', sortBy: 'newest', page: 1 });
  const { plates, loading, error, totalPages, totalResults } = usePlates(filters, filters.page);
  const handlePage = (p) => { setFilters(f => ({...f, page: p})); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <div className="browse-page"><div className="browse-header"><h1>Number Plates</h1><p className="subtitle">Find the perfect license plate for your ride</p><PlateFilters filters={filters} onChange={setFilters} /></div><div className="results-header"><p>{totalResults.toLocaleString()} plates found</p></div>{loading ? <div className="spinner">Loading...</div> : error ? <div className="error">{error}</div> : plates.length === 0 ? <div className="no-results"><h2>No plates found</h2><p>Try adjusting your search or filters.</p></div> : <><div className="car-grid">{plates.map(p => <PlateCard key={p.id} plate={p} />)}</div><Pagination current={filters.page} total={totalPages} onChange={handlePage} /></>}</div>;
};
export default PlatesBrowse;
