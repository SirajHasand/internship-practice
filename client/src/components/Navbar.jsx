// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          PERN App
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/new" className="hover:text-gray-300">New Item</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;