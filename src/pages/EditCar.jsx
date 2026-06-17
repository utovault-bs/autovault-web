import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar } from '../api/cars';
import api from '../api/client';
import MakeSelect from '../components/MakeSelect';
import ModelSelect from '../components/ModelSelect';
const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
const FUEL_TYPES = ['Gasoline','Diesel','Hybrid','Electric'];
const TRANSMISSIONS = ['Automatic','Manual','CVT'];
const BODY_STYLES = ['SUV','Sedan','Coupe','Convertible','Hatchback','Truck','Van','Wagon'];
const CONDITIONS = ['New','Used','Refurbished'];
const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    getCarById(id).then(({ data }) => {
      setForm({ make: data.make || '', model: data.model || '', year: data.year?.toString() || '', trim: data.trim || '', price: data.price?.toString() || '', mileage: data.mileage?.toString() || '', transmission: data.transmission || '', fuel_type: data.fuel_type || '', body_style: data.body_style || '', exterior_color: data.exterior_color || '', interior_color: data.interior_color || '', engine: data.engine || '', drivetrain: data.drivetrain || '', vin: data.vin || '', condition: data.condition || 'Used', description: data.description || '', city: data.city || '', state: data.state || '', zip: data.zip || '' });
      setLoading(false);
    }).catch(() => { setError('Car not found'); setLoading(false); });
  }, [id]);
  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await updateCar(id, { ...form, price: Number(form.price), mileage: Number(form.mileage), year: Number(form.year) });
      navigate(`/cars/${id}`);
    } catch (err) { setError(err.response?.data?.message || 'Failed to update'); } finally { setSubmitting(false); }
  };
  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!form) return null;
  return <div className="sell-page"><h2>Edit Your Listing</h2>{error && <div className="error-msg">{error}</div>}<form onSubmit={handleSubmit}><div className="form-grid"><MakeSelect value={form.make} onChange={v => set('make', v)} placeholder="Make" required /><ModelSelect make={form.make} value={form.model} onChange={v => set('model', v)} placeholder="Model" /><input type="number" placeholder="Year" value={form.year} onChange={e => set('year', e.target.value)} required /><input type="text" placeholder="Trim (e.g. EX-L)" value={form.trim} onChange={e => set('trim', e.target.value)} /><input type="number" placeholder="Price ($)" value={form.price} onChange={e => set('price', e.target.value)} required /><input type="number" placeholder="Mileage" value={form.mileage} onChange={e => set('mileage', e.target.value)} required /><select value={form.transmission} onChange={e => set('transmission', e.target.value)} required><option value="">Transmission</option>{TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}</select><select value={form.fuel_type} onChange={e => set('fuel_type', e.target.value)} required><option value="">Fuel Type</option>{FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}</select><select value={form.body_style} onChange={e => set('body_style', e.target.value)} required><option value="">Body Style</option>{BODY_STYLES.map(b => <option key={b} value={b}>{b}</option>)}</select><input type="text" placeholder="Exterior Color" value={form.exterior_color} onChange={e => set('exterior_color', e.target.value)} required /><input type="text" placeholder="Interior Color" value={form.interior_color} onChange={e => set('interior_color', e.target.value)} required /><input type="text" placeholder="Engine (e.g. 2.0L I4)" value={form.engine} onChange={e => set('engine', e.target.value)} required /><select value={form.condition} onChange={e => set('condition', e.target.value)} required><option value="">Condition</option>{CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}</select><input type="text" placeholder="VIN" value={form.vin} onChange={e => set('vin', e.target.value.toUpperCase())} maxLength={17} /><input type="text" placeholder="Drivetrain (e.g. AWD)" value={form.drivetrain} onChange={e => set('drivetrain', e.target.value)} /><input type="text" placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} required /><select value={form.state} onChange={e => set('state', e.target.value)} required><option value="">State</option>{US_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select><input type="text" placeholder="ZIP Code" value={form.zip} onChange={e => set('zip', e.target.value)} maxLength={5} required /><textarea placeholder="Description" value={form.description} onChange={e => set('description', e.target.value)} rows={4} /></div><button className="btn-submit" type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save Changes'}</button></form></div>;
};
export default EditCar;
