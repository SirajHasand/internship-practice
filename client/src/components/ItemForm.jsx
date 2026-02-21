// client/src/components/ItemForm.js
import React, { useState, useEffect } from 'react';
import { createItem, updateItem, getItem } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const ItemForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) fetchItem();
  }, []);

  const fetchItem = async () => {
    const res = await getItem(id);
    setForm({ name: res.data.name, description: res.data.description || '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Name is required');
    
    setLoading(true);
    try {
      if (isEdit) {
        await updateItem(id, form);
      } else {
        await createItem(form);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error saving item');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? 'Edit Item' : 'Create Item'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Item name"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
            placeholder="Item description"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;