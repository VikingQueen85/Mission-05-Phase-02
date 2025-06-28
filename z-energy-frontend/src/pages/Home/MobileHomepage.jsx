import React from "react";
import "./MobileHomepage.css";

export default function MobileHomepage() {
  return (
    <div className="mobile-homepage">

      {/* 배경 원 */}
      <div className="background-circle" />

      {/* 상단 */}
      <header className="top-section">
        <div className="greeting">Kia ora Alex,</div>

        <div className="sharetank-row">
          {/* 주유소 아이콘 대신 빈 공간으로 대체 */}
          <div className="gas-station-placeholder" />
          <div className="sharetank-text">ShareTank</div>
        </div>

        <div className="subtitle">Maximize Your Fuel,</div>
        <div className="subtitle">Amplify Your Sharing</div>

        <button className="view-tank-btn">View my tank</button>
      </header>

      {/* 중단 */}
      <main className="middle-section">
        <button className="btn btn-vertical">
          Fuel Price Comparison
        </button>

        <div className="btn-group-horizontal">
          <button className="btn btn-horizontal">Order Food</button>
          <button className="btn btn-horizontal">Z Near me</button>
        </div>
      </main>

      {/* 하단 */}
      <footer className="bottom-section">
        <div className="footer-item">
          <div className="footer-icon-placeholder" />
          <div className="footer-text">Home</div>
        </div>
        <div className="footer-item">
          <div className="footer-icon-placeholder" />
          <div className="footer-text">QRcode</div>
        </div>
        <div className="footer-item">
          <div className="footer-icon-placeholder" />
          <div className="footer-text">ShareTank</div>
        </div>
        <div className="footer-item">
          <div className="footer-icon-placeholder" />
          <div className="footer-text">More</div>
        </div>
      </footer>
    </div>
  );
}