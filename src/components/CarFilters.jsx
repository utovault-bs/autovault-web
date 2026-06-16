import ModelSelect from './ModelSelect';
const MAKES = ['Acura','Audi','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ford','GMC','Honda','Hyundai','Infiniti','Jaguar','Jeep','Kia','Land Rover','Lexus','Lincoln','Mazda','Mercedes-Benz','Mini','Mitsubishi','Nissan','Porsche','Ram','Subaru','Tesla','Toyota','Volkswagen','Volvo'];
const FUEL_TYPES = ['Gasoline','Diesel','Hybrid','Electric'];
const TRANSMISSIONS = ['Automatic','Manual','CVT'];
const BODY_STYLES = ['SUV','Sedan','Coupe','Convertible','Hatchback','Truck','Van','Wagon'];
const SORT_OPTIONS = [['newest','Newest'],['price_asc','Price: Low to High'],['price_desc','Price: High to Low'],['year_desc','Year: Newest'],['year_asc','Year: Oldest'],['mileage_asc','Mileage: Low to High'],['mileage_desc','Mileage: High to Low']];
const YEARS = Array.from({length: 30}, (_, i) => new Date().getFullYear() - i);
const MILEAGES = ['', '5000', '10000', '20000', '30000', '50000', '75000', '100000'];
const COLORS = ['Black','White','Silver','Gray','Blue','Red','Green','Brown','Beige','Gold','Orange','Purple','Yellow'];
const CONDITIONS = ['New','Used','Refurbished'];
const RADII = [10, 25, 50, 100, 200, 500];
const CarFilters = ({ filters, onChange }) => {
  const set = (key, value) => onChange(prev => ({ ...prev, [key]: value, page: 1 }));
  const clear = () => onChange({ search: '', make: '', model: '', minPrice: '', maxPrice: '', fuel_type: '', transmission: '', body_style: '', minYear: '', maxYear: '', maxMileage: '', color: '', condition: '', zip: '', lat: '', lng: '', radius: '', sortBy: 'newest', page: 1 });
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      set('lat', pos.coords.latitude);
      set('lng', pos.coords.longitude);
      if (!filters.radius) set('radius', 50);
    }, () => {}, { enableHighAccuracy: true, timeout: 5000 });
  };
  const hasDist = filters.lat || filters.zip;
  const distSort = hasDist ? [['distance','Nearest']] : [];
  const hasFilters = filters.search || filters.make || filters.model || filters.minPrice || filters.maxPrice || filters.fuel_type || filters.transmission || filters.body_style || filters.minYear || filters.maxYear || filters.maxMileage || filters.color || filters.condition || filters.zip || filters.lat || filters.lng || filters.radius;
  return <div className="car-filters">
    <div className="search-bar">
      <input type="text" placeholder="Search make, model, or keyword..." value={filters.search} onChange={e => set('search', e.target.value)} />
      <select value={filters.sortBy} onChange={e => set('sortBy', e.target.value)}>{[...SORT_OPTIONS, ...distSort].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
    </div>
    <div className="filter-grid">
      <select value={filters.make} onChange={e => { set('make', e.target.value); set('model', ''); }}><option value="">All Makes</option>{MAKES.map(m => <option key={m} value={m}>{m}</option>)}</select>
      <ModelSelect make={filters.make} value={filters.model} onChange={v => set('model', v)} placeholder="All Models" />
      <select value={filters.fuel_type} onChange={e => set('fuel_type', e.target.value)}><option value="">All Fuel Types</option>{FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}</select>
      <select value={filters.transmission} onChange={e => set('transmission', e.target.value)}><option value="">All Transmissions</option>{TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}</select>
      <select value={filters.body_style} onChange={e => set('body_style', e.target.value)}><option value="">All Body Styles</option>{BODY_STYLES.map(b => <option key={b} value={b}>{b}</option>)}</select>
      <select value={filters.minYear} onChange={e => set('minYear', e.target.value)}><option value="">Min Year</option>{YEARS.map(y => <option key={y} value={y}>{y}</option>)}</select>
      <select value={filters.maxYear} onChange={e => set('maxYear', e.target.value)}><option value="">Max Year</option>{YEARS.map(y => <option key={y} value={y}>{y}</option>)}</select>
      <select value={filters.maxMileage} onChange={e => set('maxMileage', e.target.value)}><option value="">Max Mileage</option>{MILEAGES.filter(Boolean).map(m => <option key={m} value={m}>{m.toLocaleString()}</option>)}</select>
      <select value={filters.color} onChange={e => set('color', e.target.value)}><option value="">All Colors</option>{COLORS.map(c => <option key={c} value={c}>{c}</option>)}</select>
      <select value={filters.condition} onChange={e => set('condition', e.target.value)}><option value="">All Conditions</option>{CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}</select>
      <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={e => set('minPrice', e.target.value)} />
      <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={e => set('maxPrice', e.target.value)} />
      <input type="text" placeholder="ZIP Code" value={filters.zip} onChange={e => set('zip', e.target.value)} maxLength={5} />
      <div className="dist-controls">
        <button type="button" className="btn-nearby" onClick={getLocation}>Use My Location</button>
        <select value={filters.radius || ''} onChange={e => set('radius', e.target.value)}><option value="">Radius</option>{RADII.map(r => <option key={r} value={r}>{r} mi</option>)}</select>
      </div>
    </div>
    {hasFilters && <button className="clear-filters" onClick={clear}>Clear Filters</button>}
  </div>;
};
export default CarFilters;
