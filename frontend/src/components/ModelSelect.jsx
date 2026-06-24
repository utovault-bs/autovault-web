import { useState, useEffect } from 'react';
const API = 'https://autovault-api-oa6j.onrender.com';
const ModelSelect = ({ make, value, onChange, placeholder }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!make) { setModels([]); return; }
    setLoading(true);
    fetch(`${API}/api/models/${encodeURIComponent(make)}`)
      .then(r => r.json())
      .then(setModels)
      .catch(() => setModels([]))
      .finally(() => setLoading(false));
  }, [make]);
  return <select value={value} onChange={e => onChange(e.target.value)} disabled={!make || loading}>
    <option value="">{loading ? 'Loading...' : placeholder || 'All Models'}</option>
    {models.map(m => <option key={m} value={m}>{m}</option>)}
  </select>;
};
export default ModelSelect;
