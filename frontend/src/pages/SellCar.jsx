import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createCar } from '../api/cars';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import MakeSelect from '../components/MakeSelect';
import ModelSelect from '../components/ModelSelect';
const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
const FUEL_TYPES = ['Gasoline','Diesel','Hybrid','Electric'];
const TRANSMISSIONS = ['Automatic','Manual','CVT'];
const BODY_STYLES = ['SUV','Sedan','Coupe','Convertible','Hatchback','Truck','Mini Truck','Van','Wagon'];
const CONDITIONS = ['New','Used','Refurbished'];
const SellCar = () => {
  const navigate = useNavigate();
  const { user, listingsLeft, isDealer } = useAuth();
  const remaining = listingsLeft();
  const [form, setForm] = useState({ make: '', model: '', year: '', trim: '', price: '', mileage: '', transmission: '', fuel_type: '', body_style: '', exterior_color: '', interior_color: '', engine: '', drivetrain: '', vin: '', condition: 'Used', description: '', city: '', state: '', zip: '', main_image: '', images: [] });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));
  const uploadImages = async (files) => {
    setUploading(true);
    const uploaded = [];
    for (let i = 0; i < files.length; i++) {
      setProgress(Math.round((i / files.length) * 100));
      const fd = new FormData();
      fd.append('image', files[i]);
      try {
        const { data } = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        uploaded.push(data.url);
      } catch { setError('Upload failed for ' + files[i].name); }
    }
    setProgress(100);
    setUploading(false);
    return uploaded;
  };
  const geocode = async (zip) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&format=json&limit=1`);
      const data = await res.json();
      if (data.length) return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
    } catch {}
    return {};
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const urls = await uploadImages(form.images);
      const coords = form.zip ? await geocode(form.zip) : {};
      await createCar({ ...form, ...coords, images: form.images.length > 0 ? urls : undefined, price: Number(form.price), mileage: Number(form.mileage), year: Number(form.year) });
      navigate('/');
    } catch (err) { setError(err.response?.data?.message || 'Failed to create listing'); } finally { setSubmitting(false); }
  };
  const limitReached = remaining !== null && remaining <= 0;
  return <div className="sell-page"><h2>List Your Car</h2>
    {user && remaining !== null && (
      <div className={`listing-limit-banner ${limitReached ? 'limit-reached' : ''}`}>
        {isDealer() ? (
          <>You have <strong>{remaining}</strong> of {user.listings_limit} listing slots remaining.</>
        ) : (
          <>You have <strong>{remaining}</strong> listing slot{remaining !== 1 ? 's' : ''} remaining. <Link to="/pricing">Upgrade for more →</Link></>
        )}
      </div>
    )}
    {error && <div className="error-msg">{error}</div>}<form onSubmit={handleSubmit}><div className="form-grid"><MakeSelect value={form.make} onChange={v => set('make', v)} placeholder="Make" required /><ModelSelect make={form.make} value={form.model} onChange={v => set('model', v)} placeholder="Model" /><input type="number" placeholder="Year" value={form.year} onChange={e => set('year', e.target.value)} required /><input type="text" placeholder="Trim (e.g. EX-L)" value={form.trim} onChange={e => set('trim', e.target.value)} /><input type="number" placeholder="Price ($)" value={form.price} onChange={e => set('price', e.target.value)} required /><input type="number" placeholder="Mileage" value={form.mileage} onChange={e => set('mileage', e.target.value)} required /><select value={form.transmission} onChange={e => set('transmission', e.target.value)} required><option value="">Transmission</option>{TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}</select><select value={form.fuel_type} onChange={e => set('fuel_type', e.target.value)} required><option value="">Fuel Type</option>{FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}</select><select value={form.body_style} onChange={e => set('body_style', e.target.value)} required><option value="">Body Style</option>{BODY_STYLES.map(b => <option key={b} value={b}>{b}</option>)}</select><input type="text" placeholder="Exterior Color" value={form.exterior_color} onChange={e => set('exterior_color', e.target.value)} required /><input type="text" placeholder="Interior Color" value={form.interior_color} onChange={e => set('interior_color', e.target.value)} required /><input type="text" placeholder="Engine (e.g. 2.0L I4)" value={form.engine} onChange={e => set('engine', e.target.value)} required /><select value={form.condition} onChange={e => set('condition', e.target.value)} required><option value="">Condition</option>{CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}</select><input type="text" placeholder="VIN" value={form.vin} onChange={e => set('vin', e.target.value.toUpperCase())} maxLength={17} /><input type="text" placeholder="Drivetrain (e.g. AWD)" value={form.drivetrain} onChange={e => set('drivetrain', e.target.value)} /><input type="text" placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} required /><select value={form.state} onChange={e => set('state', e.target.value)} required><option value="">State</option>{US_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select><input type="text" placeholder="ZIP Code" value={form.zip} onChange={e => set('zip', e.target.value)} maxLength={5} required /><textarea placeholder="Description - highlight key features, condition, history..." value={form.description} onChange={e => set('description', e.target.value)} rows={4} /></div><div className="image-upload"><label className="upload-btn"><input type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={e => set('images', Array.from(e.target.files))} />Upload Images</label>{uploading && <div className="progress-bar"><div style={{ width: progress + '%' }} /><span>{progress}%</span></div>}</div><button className="btn-submit" type="submit" disabled={submitting || uploading}>{submitting ? 'Submitting...' : 'List Car for Sale'}</button></form></div>;
};
export default SellCar;
