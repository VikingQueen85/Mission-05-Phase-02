
import React, { useState, useEffect, useCallback } from 'react';
import './HotDrinksPage.css';
import DrinkDetailPage from './DrinkDetailPage.jsx';

// Image Imports (static images for structural elements)
import mobileFrameImage from "../../../assets/images/MobileFrame.png";
import hotDrinksBannerImage from "../../../assets/images/Cart.png";
import foodOrderFilterImage from "../../../assets/images/FoodOrderFilter.png";

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
            const response = await fetch('http://localhost:3000/api/fooditems/category/hot_drinks');
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

    // Function to handle clicking on a drink item, leading to the new page
    const handleDrinkClick = useCallback((drinkItem) => {
        setSelectedDrinkForDetail(drinkItem);
    }, []);

    // Function to navigate back from the DrinkDetailPage to HotDrinksPage
    const handleCloseDrinkDetail = useCallback(() => {
        setSelectedDrinkForDetail(null);
    }, []);

    // Conditional rendering: if a drink is selected, show the DrinkDetailPage
    if (selectedDrinkForDetail) {
        return (
        <DrinkDetailPage
            drink={selectedDrinkForDetail}
            onClose={handleCloseDrinkDetail}
        />
        );
    }

    // Otherwise, render the Hot Drinks menu page
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
            <div className="hot-drinks-banner-overlay">
            </div>
        </div>

        {/* Filter Section */}
        <div
            className="hot-drinks-filter-section"
            style={{ backgroundImage: `url(${foodOrderFilterImage})` }}>
        </div>

        <div className="hot-drinks-header-frame">
            Hot Drinks
        </div>

        {/* Main Content Section - Now with dynamically loaded coffee images */}
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
                    onClick={() => handleDrinkClick(drinkItem)}
                >
                    <img
                    src={drinkItem.imageUrl}
                    alt={drinkItem.name}
                    className="coffee-image"
                    />
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
}

export default HotDrinksPage;