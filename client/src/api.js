// client/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getItems = () => api.get('/items');
export const getItem = (id) => api.get(`/items/${id}`);
export const createItem = (data) => api.post('/items', data);
export const updateItem = (id, data) => api.put(`/items/${id}`, data);
export const deleteItem = (id) => api.delete(`/items/${id}`);
export const createUser = (data) => api.post('/auth/register',data);
export const getUser =  (data) => api.post('/auth/login',data);