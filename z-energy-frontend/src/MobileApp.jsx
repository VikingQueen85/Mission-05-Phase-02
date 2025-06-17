// src/MobileApp.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './MobileApp.css'; // Mobile-specific styles

function MobileApp() {
  return (
    <div className="mobile-app">
      <header className="mobile-header">
        <h1>Kia ora Alex,</h1>
        <nav>
          <ul>
            <li><Link to="/">Fuel Price Comparison</Link></li>
            <li><Link to="/services">Order Food</Link></li>
            <li><Link to="/price-comparison">Z Near me</Link></li>
          </ul>
        </nav>
      </header>

      <main className="mobile-content">
        <Routes>
          <Route path="/" element={<div><h2>Welcome to the Mobile Homepage</h2></div>} />
          <Route path="/services" element={<div><h2>Mobile Services Page</h2></div>} />
          <Route path="/price-comparison" element={<div><h2>Mobile Price Comparison Page</h2></div>} />
        </Routes>
      </main>

      <footer className="mobile-footer">
        <p>&copy; 2025 Z Mobile App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MobileApp;
