import api from './client';
export const getCars = (params) => api.get('/cars', { params });
export const getCarById = (id) => api.get(`/cars/${id}`);
export const createCar = (data) => api.post('/cars', data);
export const updateCar = (id, data) => api.patch(`/cars/${id}`, data);
