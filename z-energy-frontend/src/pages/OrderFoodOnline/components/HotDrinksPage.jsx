
import React, { useState, useEffect, useCallback } from 'react';
import './HotDrinksPage.css';
import DrinkDetailPage from './DrinkDetailPage.jsx';

// Image Imports
import mobileFrameImage from "../../../assets/images/MobileFrame.png";
import hotDrinksBannerImage from "../../../assets/images/Cart.png";
import foodOrderFilterImage from "../../../assets/images/FoodOrderFilter.png";
import Footer from "./common/Footer.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function HotDrinksPage({ onClose }) {
    const [hotDrinks, setHotDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDrinkForDetail, setSelectedDrinkForDetail] = useState(null);

    useEffect(() => {
        const fetchHotDrinks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${BACKEND_URL}/api/fooditems/category/hot_drinks`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setHotDrinks(data);
            } catch (err) {
                console.error("Failed to fetch hot drinks:", err);
                setError("Failed to load hot drinks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchHotDrinks();
    }, []);

    const handleDrinkClick = useCallback((drinkItem) => {
        setSelectedDrinkForDetail(drinkItem);
    }, []);

    const handleCloseDrinkDetail = useCallback(() => {
        setSelectedDrinkForDetail(null);
    }, []);

    if (selectedDrinkForDetail) {
        return (
            <DrinkDetailPage
                drink={selectedDrinkForDetail}
                onClose={handleCloseDrinkDetail}
            />
        );
    }

    return (
        <div className="hot-drinks-page-container">
            <div
                className="mobile-top-frame"
                style={{ backgroundImage: `url(${mobileFrameImage})` }}>
                <button className="back-button" onClick={onClose}> &lt; Back </button>
            </div>

            <div
                className="hot-drinks-banner-section"
                style={{ backgroundImage: `url(${hotDrinksBannerImage})` }}
                onClick={onClose}>
                <div className="hot-drinks-banner-overlay" />
            </div>

            <div
                className="hot-drinks-filter-section"
                style={{ backgroundImage: `url(${foodOrderFilterImage})` }} />

            <div className="hot-drinks-header-frame">
                Hot Drinks
            </div>

            <div className="hot-drinks-content">
                {loading && <p className="loading-text">Loading hot drinks menu...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && !error && hotDrinks.length === 0 && (
                    <p className="no-items-text">No hot drinks available at the moment.</p>
                )}

                {!loading && !error && hotDrinks.length > 0 && (
                    <div className="coffee-images-grid">
                        {hotDrinks.map((drinkItem) => (
                            <div
                                key={drinkItem._id || drinkItem.id}
                                className="coffee-image-item"
                                onClick={() => handleDrinkClick(drinkItem)}>
                                <img
                                    src={`${BACKEND_URL}${drinkItem.imageUrl}`}
                                    alt={drinkItem.name}
                                    className="coffee-image"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default HotDrinksPage;
