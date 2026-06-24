import { useState, useEffect, useCallback } from 'react';
import { getCars } from '../api/cars';
export const useCars = (filters = {}, page = 1, limit = 12) => {
  const [cars, setCars] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(null); const [totalPages, setTotalPages] = useState(0);
  const fetchCars = useCallback(async () => { setLoading(true); try { const { data } = await getCars({ ...filters, page, limit }); setCars(data.cars); setTotalPages(Math.ceil(data.total / limit)); } catch (err) { setError(err.response?.data?.message || 'Failed'); } finally { setLoading(false); } }, [filters, page, limit]);
  useEffect(() => { const timer = setTimeout(fetchCars, 300); return () => clearTimeout(timer); }, [fetchCars]);
  return { cars, loading, error, totalPages };
};
