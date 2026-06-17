import { useState } from 'react';
import MakeSelect, { MAKES } from './MakeSelect';
const FUEL_TYPES = ['Gasoline','Diesel','Hybrid','Electric'];
const TRANSMISSIONS = ['Automatic','Manual','CVT'];
const BODY_STYLES = ['SUV','Sedan','Coupe','Convertible','Hatchback','Truck','Mini Truck','Van','Wagon'];
const SORT_OPTIONS = [['newest','Newest'],['price_asc','Price: Low to High'],['price_desc','Price: High to Low'],['year_desc','Year: Newest'],['year_asc','Year: Oldest'],['mileage_asc','Mileage: Low to High']];
const RADII = [['10','10 mi'],['25','25 mi'],['50','50 mi'],['100','100 mi']];
const CarFilters = ({ filters, onChange }) => {
  const [geo, setGeo] = useState({ loading: false });
  const set = (key, value) => onChange({ ...filters, [key]: value, page: 1 });
  const clear = () => onChange({ search: '', make: '', minPrice: '', maxPrice: '', fuel_type: '', transmission: '', body_style: '', zip: '', radius: '', sortBy: 'newest', page: 1 });
  const hasFilters = filters.search || filters.make || filters.minPrice || filters.maxPrice || filters.fuel_type || filters.transmission || filters.body_style || filters.zip;
  const handleZipChange = async (zip) => {
    set('zip', zip);
    if (zip.length !== 5) return;
    setGeo({ loading: true });
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&format=json&limit=1`);
      const data = await res.json();
      if (data.length) {
        onChange({ ...filters, zip, lat: data[0].lat, lng: data[0].lon, page: 1 });
        setGeo({ loading: false });
      } else {
        setGeo({ loading: false, error: 'ZIP not found' });
      }
    } catch { setGeo({ loading: false, error: 'Geocoding failed' }); }
  };
  return <div className="car-filters"><div className="search-bar"><input type="text" placeholder="Search make, model, or keyword..." value={filters.search} onChange={e => set('search', e.target.value)} /><select value={filters.sortBy} onChange={e => set('sortBy', e.target.value)}>{SORT_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div><div className="filter-grid"><div className="make-filter-cell"><MakeSelect value={filters.make} onChange={v => set('make', v)} placeholder="All Makes" /></div><select value={filters.fuel_type} onChange={e => set('fuel_type', e.target.value)}><option value="">All Fuel Types</option>{FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}</select><select value={filters.transmission} onChange={e => set('transmission', e.target.value)}><option value="">All Transmissions</option>{TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}</select><select value={filters.body_style} onChange={e => set('body_style', e.target.value)}><option value="">All Body Styles</option>{BODY_STYLES.map(b => <option key={b} value={b}>{b}</option>)}</select><input type="number" placeholder="Min Price" value={filters.minPrice} onChange={e => set('minPrice', e.target.value)} /><input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={e => set('maxPrice', e.target.value)} /><div className="location-filter"><input type="text" placeholder="ZIP Code" value={filters.zip || ''} onChange={e => handleZipChange(e.target.value)} maxLength={5} className="zip-input" /><select value={filters.radius || ''} onChange={e => set('radius', e.target.value)} disabled={!filters.zip}><option value="">Radius</option>{RADII.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>{geo.loading && <span className="geo-loading">Locating...</span>}</div></div>{hasFilters && <button className="clear-filters" onClick={clear}>Clear Filters</button>}</div>;
};
export default CarFilters;
