
import React from 'react';
import  "./MainFooter.css"
import zLogo from '../assets/images/Z-Logo.png';

function MainFooter() {
  return (
      <div className="page-wrapper">
    <footer className="main-app-footer">
      <div className="footer-content-wrapper">
        <div className="footer-logo-section">
          <img src={zLogo} alt="Z Energy Logo" className="footer-z-logo" />
        </div>

        <div className="footer-links-section">
          <div className="footer-column">
            <h4 className="footer-heading blue-text">Products and services</h4>
            <ul>
              <li><a href="/at-the-station">At the station</a></li>
              <li><a href="/z-app">Z app</a></li>
              <li><a href="/rewards">Rewards and promotions</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading blue-text">For businesses</h4>
            <ul>
              <li><a href="/business-fuel-card">Z Business fuel card</a></li>
              <li><a href="/fuels-and-services">Fuels and services</a></li>
              <li><a href="/business-tips">Business tips and stories</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading blue-text">About Z</h4>
            <ul>
              <li><a href="/our-story">Our story</a></li>
              <li><a href="/our-people">Our people</a></li>
              <li><a href="/what-we-stand-for">What we stand for</a></li>
              <li><a href="/sustainability">Sustainability</a></li>
              <li><a href="/news">News</a></li>
              <li><a href="/careers">Careers at Z</a></li>
              <li><a href="/corporate-centre">Corporate Centre</a></li>
            </ul>
          </div>
        </div>
        <button className="contact-us-button">Contact Us</button>
      </div>
    </footer>
    </div>
  );
}

export default MainFooter;
