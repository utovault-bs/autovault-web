import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPlateCategories, createPlate } from '../api/plates';
import api from '../api/client';
const JURISDICTIONS = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
const TYPES = ['vanity', 'personalized', 'vintage', 'sequential', 'dealer', 'specialty', 'low-digit', 'motorcycle'];
const SellPlate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: '', plate_text: '', jurisdiction: 'CA', type: 'vanity', condition: 'Used', price: '', description: '', transferable: true, category_ids: [] });
  useEffect(() => { if (!user) navigate('/login', { state: { from: '/plates/sell' } }); }, [user, navigate]);
  useEffect(() => { getPlateCategories().then(r => setCategories(r.data)).catch(() => {}); }, []);
  if (!user) return null;
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) { alert('Max 5 images'); return; }
    setImages(prev => [...prev, ...files]);
    setPreviewUrls(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };
  const removeImage = (idx) => { setImages(prev => prev.filter((_, i) => i !== idx)); setPreviewUrls(prev => prev.filter((_, i) => i !== idx)); };
  const toggleCategory = (cid) => { setForm(f => ({ ...f, category_ids: f.category_ids.includes(cid) ? f.category_ids.filter(id => id !== cid) : [...f.category_ids, cid] })); };
  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try {
      const uploadedImages = [];
      for (const file of images) {
        const fd = new FormData(); fd.append('image', file);
        const { data } = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        uploadedImages.push(data);
      }
      const { data } = await createPlate({ ...form, price: parseFloat(form.price), images: uploadedImages });
      navigate(`/plates/${data.id}`);
    } catch (err) { alert(err.response?.data?.message || 'Failed to create listing'); } finally { setSubmitting(false); }
  };
  return (
    <div className="sell-page">
      <h2>Sell a Number Plate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input placeholder="Listing Title (e.g. 'CUSTOM 1 - Rare California Plate')" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <input placeholder="Plate Text (e.g. 'CUSTOM1')" value={form.plate_text} onChange={e => setForm({...form, plate_text: e.target.value})} required style={{ textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 700, letterSpacing: 2 }} />
        </div>
        <div className="form-grid">
          <select value={form.jurisdiction} onChange={e => setForm({...form, jurisdiction: e.target.value})} required>
            {JURISDICTIONS.map(j => <option key={j} value={j}>{j}</option>)}
          </select>
          <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} required>
            {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>
        <div className="form-grid">
          <select value={form.condition} onChange={e => setForm({...form, condition: e.target.value})} required>
            {['New', 'Used', 'Refurbished'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="number" step="0.01" placeholder="Price ($)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        </div>
        <textarea placeholder="Describe the plate - history, condition, why it's special..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} />
        <div className="plate-categories">
          <label>Categories</label>
          <div className="filter-chips">
            {categories.map(c => <button key={c.id} type="button" className={form.category_ids.includes(c.id) ? 'active' : ''} onClick={() => toggleCategory(c.id)}>{c.name}</button>)}
          </div>
        </div>
        <label><input type="checkbox" checked={form.transferable} onChange={e => setForm({...form, transferable: e.target.checked})} /> Plate is transferable to new owner</label>
        <div className="image-upload">
          <label>Photos (max 5)</label>
          <input type="file" accept="image/*" multiple onChange={handleImageSelect} disabled={images.length >= 5} />
          {previewUrls.length > 0 && <div className="image-previews">{previewUrls.map((url, i) => <div key={i} className="preview-item"><img src={url} alt="" /><button type="button" onClick={() => removeImage(i)}>Remove</button></div>)}</div>}
        </div>
        <button type="submit" className="btn-submit" disabled={submitting}>{submitting ? 'Creating...' : 'List Plate for Sale'}</button>
      </form>
    </div>
  );
};
export default SellPlate;
