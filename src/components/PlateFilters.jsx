import { useState, useEffect } from 'react';
import { getPlateCategories, getPlateJurisdictions } from '../api/plates';
const TYPES = ['vanity', 'personalized', 'vintage', 'sequential', 'dealer', 'specialty', 'low-digit', 'motorcycle'];
const PlateFilters = ({ filters, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  useEffect(() => { getPlateCategories().then(r => setCategories(r.data)).catch(() => {}); }, []);
  useEffect(() => { getPlateJurisdictions().then(r => setJurisdictions(r.data)).catch(() => {}); }, []);
  const update = (k, v) => onChange({ ...filters, [k]: v, page: 1 });
  const clear = () => { onChange({ search: '', jurisdiction: '', type: '', minPrice: '', maxPrice: '', sortBy: 'newest', page: 1 }); };
  const hasFilters = Object.entries(filters).filter(([k, v]) => v && !['page', 'sortBy'].includes(k) && v !== '').length > 0;
  return (
    <div className="filters-panel">
      <div className="filters-header">
        <div className="search-bar">
          <input type="text" placeholder="Search plates (e.g. CUSTOM, 2ABC)..." value={filters.search || ''} onChange={e => update('search', e.target.value)} />
          {hasFilters && <button className="clear-btn" onClick={clear}>Clear</button>}
        </div>
        <select value={filters.sortBy || 'newest'} onChange={e => update('sortBy', e.target.value)}>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      <button className="expand-btn" onClick={() => setShowAdvanced(!showAdvanced)}>{showAdvanced ? 'Less Filters' : 'More Filters'}</button>
      {showAdvanced && <div className="advanced-filters">
        <div className="filter-group">
          <label>Jurisdiction</label>
          <select value={filters.jurisdiction || ''} onChange={e => update('jurisdiction', e.target.value)}>
            <option value="">All States</option>
            {jurisdictions.map(j => <option key={j.jurisdiction} value={j.jurisdiction}>{j.jurisdiction}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Plate Type</label>
          <div className="filter-chips">
            {TYPES.map(t => <button key={t} className={filters.type === t ? 'active' : ''} onClick={() => update('type', filters.type === t ? '' : t)}>{t}</button>)}
          </div>
        </div>
        <div className="filter-group">
          <label>Price Range</label>
          <div className="range-inputs">
            <input type="number" placeholder="Min" value={filters.minPrice || ''} onChange={e => update('minPrice', e.target.value)} />
            <span>to</span>
            <input type="number" placeholder="Max" value={filters.maxPrice || ''} onChange={e => update('maxPrice', e.target.value)} />
          </div>
        </div>
      </div>}
    </div>
  );
};
export default PlateFilters;
