// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItemForm from './components/ItemForm';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/new" element={<ItemForm />} />
          <Route path="/edit/:id" element={<ItemForm />} />
          <Route path="/" element={<Register/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;