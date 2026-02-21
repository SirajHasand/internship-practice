// client/src/components/ItemList.js
import React, { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../api';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      await deleteItem(id);
      fetchItems();
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Items</h2>
      
      {items.length === 0 ? (
        <p className="text-gray-500">No items yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="border p-3 rounded shadow">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.description || 'No description'}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => window.location = `/edit/${item.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;