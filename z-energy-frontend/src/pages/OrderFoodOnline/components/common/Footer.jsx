
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="app-footer">
      <div className="footer-nav-item">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 12H5V22H19V12H22L12 2ZM12 4.31L19.34 11.66H17V20H7V11.66H4.66L12 4.31Z"/></svg>
        <span>Home</span>
      </div>
      <div className="footer-nav-item">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15 3H21V9H15V3ZM17 5V7H19V5H17ZM15 15H21V21H15V15ZM17 17V19H19V17H17ZM9 3H3V9H9V3ZM5 5V7H7V5H5ZM9 15H3V21H9V15ZM5 17V19H7V17H5ZM11 7H13V17H11V7ZM7 11H17V13H7V11ZM11 1H13V3H11V1ZM11 21H13V23H11V21Z"/></svg>
        <span>QR code</span>
      </div>
      <div className="footer-nav-item">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM13 7H11V13H17V11H13V7Z"/></svg>
        <span>Share Tank</span>
      </div>
      <div className="footer-nav-item">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"/></svg>
        <span>More</span>
      </div>
    </div>
  );
}

export default Footer;