import { useState, useEffect, useCallback } from 'react';
import { getPlates } from '../api/plates';
export const usePlates = (filters = {}, page = 1, limit = 12) => {
  const [plates, setPlates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const fetchPlates = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getPlates({ ...filters, page, limit });
      setPlates(data.plates);
      setTotalPages(Math.ceil(data.total / limit));
      setTotalResults(data.total);
    } catch (err) { setError(err.response?.data?.message || 'Failed to load plates'); }
    finally { setLoading(false); }
  }, [filters, page, limit]);
  useEffect(() => { const t = setTimeout(fetchPlates, 300); return () => clearTimeout(t); }, [fetchPlates]);
  return { plates, loading, error, totalPages, totalResults, refetch: fetchPlates };
};
