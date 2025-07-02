
import { Routes, Route, Navigate } from "react-router-dom";
import { useViewportSize } from './hooks/useViewportSize';

// Component Imports
import Header from "./common/Header.jsx";
import MainFooter from "./common/MainFooter.jsx";

import Homepage from "./pages/Home/Homepage";
import PriceComparison from "./pages/PriceComparison/PriceComparison";
import OrderFoodOnline from "./pages/OrderFoodOnline/OrderFoodOnline";
import HotDrinksPage from './pages/OrderFoodOnline/components/HotDrinksPage.jsx';
import HotDrinksDetailPage from './pages/OrderFoodOnline/components/HotDrinksDetailPage.jsx';
import ColdDrinksPage from './pages/OrderFoodOnline/components/ColdDrinksPage.jsx';
import ColdDrinksDetailPage from './pages/OrderFoodOnline/components/ColdDrinksDetailPage.jsx';

import ShareTank from "./pages/ShareTank/ShareTank";
import ZApp from "./pages/ZApp/ZApp";
import AboutZ from "./pages/AboutZ/AboutZ";
import HowToEnjoyZStation from "./pages/HowToEnjoyZStation/HowToEnjoyZStation";
import Rewards from "./pages/Rewards/Rewards";
import Locations from "./pages/Locations/Locations";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Search from "./pages/Search/Search";
import "./styles.css";

function App() {
    const { isMobile } = useViewportSize();

    return (
        <div className="app-container">
            <Header />

            <main className="main-content">
                <Routes>
                    {isMobile ? (
                        // Mobile-specific routes
                        <>
                            <Route path="/mobile/*" element={<OrderFoodOnline />} />
                            <Route path="/mobile/hot-drinks" element={<HotDrinksPage />} />
                            <Route path="/mobile/hot-drinks/:id" element={<HotDrinksDetailPage />} />
                            <Route path="/mobile/cold-drinks" element={<ColdDrinksPage />} />
                            <Route path="/mobile/cold-drinks/:id" element={<ColdDrinksDetailPage />} />
                            <Route path="*" element={<Navigate to="/mobile" replace />} />
                        </>
                    ) : (
                        <>
                            {/* The main entry point for the desktop website */}
                            <Route path="/*" element={<Homepage />} />
                            <Route path="/share-tank" element={<ShareTank />} />
                            <Route path="/price-comparison" element={<PriceComparison />} />
                            <Route path="/order-food" element={<OrderFoodOnline />} />
                            <Route path="/z-app" element={<ZApp />} />
                            <Route path="/about-z" element={<AboutZ />} />
                            <Route path="/how-to-enjoy-Z-station" element={<HowToEnjoyZStation />} />
                            <Route path="/rewards" element={<Rewards />} />
                            <Route path="/locations" element={<Locations />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/mobile/*" element={<Navigate to="/" replace />} />
                        </>
                    )}
                </Routes>
            </main>

            <MainFooter />
        </div>
    );
}

export default App;