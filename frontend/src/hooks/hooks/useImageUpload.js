import { useState } from 'react';
import api from '../api/client';
export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState([]);
  const upload = async (files) => {
    setUploading(true);
    setUrls([]);
    const results = [];
    for (let i = 0; i < files.length; i++) {
      setProgress(Math.round((i / files.length) * 100));
      const fd = new FormData();
      fd.append('image', files[i]);
      try { const { data } = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); results.push(data.url); } catch {}
    }
    setProgress(100);
    setUrls(results);
    setUploading(false);
    return results;
  };
  const reset = () => { setUrls([]); setProgress(0); };
  return { upload, uploading, progress, urls, reset };
};
