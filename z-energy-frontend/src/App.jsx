
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Homepage from './pages/Home/Homepage';
import Services from './pages/Services/Services';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-top-band">
          <div className="header-top-left">
            {/* Z Logo as Homepage Link */}
            <Link to="/" className="z-logo-link">
              <img
                src="Z Logo.webp"
                alt="Z Energy Logo"
                className="z-logo"
              />
            </Link>
            {/* "For Personal" button remains */}
            <button className="header-button orange-gradient-button">For Personal</button>
          </div>
          <nav className="header-top-right-nav">
            <ul>
              <li><Link to="/z-app">Z App</Link></li>
              <li><Link to="/about-z">About Z</Link></li>
              {/* New: Shopping Cart Icon */}
              <li>
                <Link to="/cart" className="header-icon-link">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </li>
              {/* New: Magnifying Glass Icon */}
              <li>
                <Link to="/search" className="header-icon-link">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Link>
              </li>
              {/* Login button */}
              <li><Link to="/login" className="header-button login-button">Login</Link></li>
            </ul>
          </nav>
        </div>
        <div className="header-thin-divider"></div>
        <div className="header-bottom-nav-row">
          <nav className="header-bottom-left-nav">
            <ul>
              <li><Link to="/power">Power</Link></li>
              <li><Link to="/rewards">Rewards and promotions</Link></li>
              <li><Link to="/">Locations</Link></li>
              <li><Link to="/services">Services</Link></li>
            </ul>
          </nav>
        </div>
        <div className="orange-gradient-band"></div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/share-tank" element={<div><h1>Sharetank Page</h1><p>Details about Sharetank.</p></div>} />
          <Route path="/price-comparison" element={<div><h1>Price Comparison Page</h1><p>Content for Price Comparison.</p></div>} />
          <Route path="/order-food" element={<div><h1>Order Food Online Page</h1><p>Information about ordering food and drinks.</p></div>} />
          <Route path="/z-app" element={<div><h1>Z App Page</h1><p>Content for Z App.</p></div>} />
          <Route path="/about-z" element={<div><h1>About Z Page</h1><p>Content for About Z.</p></div>} />
          <Route path="/power" element={<div><h1>Power Page</h1><p>Content for Power.</p></div>} />
          <Route path="/rewards" element={<div><h1>Rewards and Promotions Page</h1><p>Content for Rewards and Promotions.</p></div>} />
          <Route path="/locations" element={<Homepage />} />
          <Route path="/login" element={<div><h1>Login Page</h1><p>Content for Login.</p></div>} />
          {/* Routes for icons */}
          <Route path="/cart" element={<div><h1>Shopping Cart</h1><p>Your shopping cart items will appear here.</p></div>} />
          <Route path="/search" element={<div><h1>Search Page</h1><p>Enter your search query here.</p></div>} />
        </Routes>
      </main>

      <footer className="main-footer">
        <p className="footer-text">&copy; 2025 Z Petrol App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;