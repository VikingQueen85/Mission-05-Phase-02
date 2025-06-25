
import React, { useState, useEffect } from 'react';
import './HotDrinksPage.css';

import mobileFrameImage from "../../../assets/images/MobileFrame.png";
import hotDrinksBannerImage from "../../../assets/images/Cart.png";
import foodOrderFilterImage from "../../../assets/images/FoodOrderFilter.png";

function HotDrinksPage({ onClose }) {
    const [coffeeItems, setCoffeeItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
    const fetchCoffeeImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/api/fooditems/category/hot_drinks');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            const data = await response.json();
            setCoffeeItems(data);
        } catch (err) {
            console.error("Failed to fetch coffee images:", err);
            setError("Failed to load coffee items. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    fetchCoffeeImages();
    }, []);

    return (
        <div className="hot-drinks-page-container">
        <div
            className="mobile-top-frame"
            style={{ backgroundImage: `url(${mobileFrameImage})` }} >
        </div>

        <div
            className="hot-drinks-banner-section"
            style={{ backgroundImage: `url(${hotDrinksBannerImage})` }}
            onClick={onClose} >
        </div>

        <div
            className="hot-drinks-filter-section"
            style={{ backgroundImage: `url(${foodOrderFilterImage})` }} >
        </div>

        <div className="hot-drinks-header-frame">
            Hot Drinks
        </div>

        {/* Main Content Section - Dynamically loaded coffee images */}
        <div className="hot-drinks-content">
            {loading && <p className="loading-text">Loading coffee menu...</p>}
            {error && <p className="error-text">{error}</p>}
            {!loading && !error && coffeeItems.length === 0 && (
            <p className="no-items-text">No hot drinks available at the moment.</p>
        )}
        
        {!loading && !error && coffeeItems.length > 0 && (
            <div className="coffee-images-grid">
                {coffeeItems.map((item) => (
                    <div key={item.id || item._id} className="coffee-image-item">
                        <img src={item.src} alt={item.alt} className="coffee-image" />
                    </div>
                ))}
            </div>
            )}
        </div>
    </div>
);
}

export default HotDrinksPage;