
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

/*========== Component Imports ==========*/
import Homepage from './pages/Home/Homepage.jsx';
import PriceComparison from './pages/PriceComparison/PriceComparison.jsx';
import Services from './pages/Services/Services.jsx'

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-white-band">
          <div className="header-logo">
            <h1>Z Petrol Station</h1>
          </div>
          {/* Navigation for larger screens */}
          <nav className="header-nav">
            <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/" className="nav-link">Find Stations</Link></li>
              <li><Link to="/price-comparison" className="nav-link">Price Comparison</Link></li>
              <li><Link to="/services" className="nav-link">Services</Link></li>
            </ul>
          </nav>

        </div>
        <div className="orange-gradient-band"></div>
      </header>

      {/* Main Content Section */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="price-comparison" element={<PriceComparison />} />
          <Route path="services" element={<Services />} />

          {/* For future nested routes */}
          {/* <Route path="/nested-route-path" element={<PageName />}>
            <Route path="nested-route-name1" element={<NestedComponent1 />} />
            <Route path="nested-route-name2" element={<NestedComponent2 />} />
          </Route> */}
        </Routes>
      </main>

      {/* Footer Section */}
      <footer className="main-footer">
        <p className="footer-text">&copy; 2025 Z Petrol Station App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;