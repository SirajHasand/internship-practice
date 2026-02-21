// client/src/hooks/useItems.js
import { useState, useEffect } from 'react';
import { itemAPI } from '../api';

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await itemAPI.getAll();
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch items');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    try {
      await itemAPI.delete(id);
      setItems(items.filter(item => item.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting item:', err);
      return { 
        success: false, 
        error: err.response?.data?.error || 'Failed to delete item' 
      };
    }
  };

  const addItem = async (itemData) => {
    try {
      const response = await itemAPI.create(itemData);
      setItems([response.data, ...items]);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error adding item:', err);
      return { 
        success: false, 
        error: err.response?.data?.error || 'Failed to add item' 
      };
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      const response = await itemAPI.update(id, itemData);
      setItems(items.map(item => 
        item.id === id ? response.data : item
      ));
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error updating item:', err);
      return { 
        success: false, 
        error: err.response?.data?.error || 'Failed to update item' 
      };
    }
  };

  return {
    items,
    loading,
    error,
    fetchItems,
    deleteItem,
    addItem,
    updateItem
  };
};