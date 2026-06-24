import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import CarFilters from '../components/CarFilters';
import Pagination from '../components/Pagination';
const BudgetPage = () => {
  const { amount } = useParams();
  const navigate = useNavigate();
  const budgetFromUrl = parseInt(amount, 10);
  const BUDGETS = [
    { label: '$5,000', value: 5000 },
    { label: '$10,000', value: 10000 },
    { label: '$15,000', value: 15000 },
    { label: '$20,000', value: 20000 },
  ];
  const [filters, setFilters] = useState({ search: '', make: '', minPrice: '', maxPrice: isNaN(budgetFromUrl) ? '' : budgetFromUrl, fuel_type: '', transmission: '', body_style: '', zip: '', radius: '', lat: '', lng: '', sortBy: 'newest', page: 1 });
  const { cars, loading, error, totalPages } = useCars(filters, filters.page);
  const [view, setView] = useState(localStorage.getItem('autovault-view') || 'grid');
  const switchView = (v) => { setView(v); localStorage.setItem('autovault-view', v); };
  const handleBudgetClick = (value) => {
    setFilters(f => ({ ...f, maxPrice: value, page: 1 }));
    navigate(`/budget/${value}`, { replace: true });
  };
  const handlePage = (p) => { setFilters(f => ({...f, page: p})); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <div className="browse-page"><div className="browse-header"><h1>{budgetFromUrl ? `Vehicles Under $${budgetFromUrl.toLocaleString()}` : 'Budget Vehicles'}</h1><p className="subtitle">Browse affordable vehicles at your price point</p></div><div className="budget-buttons">{BUDGETS.map(b => <button key={b.value} className={`budget-btn${filters.maxPrice === b.value ? ' active' : ''}`} onClick={() => handleBudgetClick(b.value)}>Under {b.label}</button>)}</div><CarFilters filters={filters} onChange={setFilters} /><div className="view-toggle"><button className={`view-btn${view === 'grid' ? ' active' : ''}`} onClick={() => switchView('grid')} aria-label="Grid view"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg></button><button className={`view-btn${view === 'list' ? ' active' : ''}`} onClick={() => switchView('list')} aria-label="List view"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="3" rx="1"/><rect x="1" y="6.5" width="14" height="3" rx="1"/><rect x="1" y="11" width="14" height="3" rx="1"/></svg></button></div>{loading ? <div className="spinner">Loading...</div> : error ? <div className="error">{error}</div> : cars.length === 0 ? <div className="no-results"><h2>No cars found</h2><p>Try adjusting your filters</p></div> : <><h2 className="section-heading">Recommended for You</h2><div className={view === 'grid' ? 'car-grid' : 'car-list'}>{cars.map(car => <CarCard key={car.id} car={car} />)}</div><Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={handlePage} /></>}</div>;
};
export default BudgetPage;
