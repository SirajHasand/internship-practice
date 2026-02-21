// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import ItemList from '../components/ItemList';

const Home = () => {
  return (
    <div>
      <div className="p-4 bg-blue-50">
        <h1 className="text-3xl font-bold mb-2">PERN Stack Demo</h1>
        <p className="text-gray-600 mb-4">Simple CRUD application</p>
        <Link 
          to="/new" 
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Item
        </Link>
      </div>
      <ItemList />
    </div>
  );
};

export default Home;