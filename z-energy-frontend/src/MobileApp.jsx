
import { Routes, Route, Link } from "react-router-dom"
import PriceComparison from "./pages/PriceComparison/PriceComparison"
import "./MobileApp.css"
import OrderFoodOnline from "./pages/OrderFoodOnline/OrderFoodOnline"

function MobileApp() {
  return (
    <div className="mobile-app">
      <header className="mobile-header">
        <h1>Kia ora Alex,</h1>
        <nav>
          <ul>
            <li>
              <Link to="/price-comparison">Fuel Price Comparison</Link>
            </li>
            <li>
              <Link to="/order-food">Order Food Online</Link>
            </li>
            <li>
              <Link to="/near-me">Z Near me</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mobile-content">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome to the Mobile Homepage</h2>
              </div>
            }
          />
          <Route path="/price-comparison" element={<PriceComparison />} />
          <Route path="order-food" element={<OrderFoodOnline />} />
        </Routes>
      </main>

      <footer className="mobile-footer">
        <p>&copy; 2025 Z Mobile App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default MobileApp
