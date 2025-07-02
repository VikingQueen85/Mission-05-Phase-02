
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ColdDrinksPage.module.css';

import mobileFrameImage from '../../../assets/images/MobileFrame.png';
import zBroadwayLogo from '../../../assets/images/Cart.png';
import foodOrderFilter from '../../../assets/images/FoodOrderFilter.png';
import frameColdImage from '../../../assets/images/FrameCold.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function ColdDrinksPage() {
    const [coldDrinks, setColdDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchColdDrinks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${BACKEND_URL}/api/fooditems`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                // Filter for cold drinks based on category
                const filteredColdDrinks = data.filter(item => item.category === 'cold_drinks');
                setColdDrinks(filteredColdDrinks);
            } catch (err) {
                console.error("Failed to fetch cold drinks:", err);
                setError("Failed to load cold drinks. Please try again later.");
                // Set coldDrinks to an empty array to gracefully handle the error
                setColdDrinks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchColdDrinks();
    }, []);

    const handleBackClick = useCallback(() => {
        navigate('/mobile');
    }, [navigate]);

    const handleDrinkClick = useCallback((drink) => {
        navigate(`/mobile/cold-drinks/${drink._id || drink.name}`);
    }, [navigate]);

    return (
        <div className={styles['cold-drinks-page-container']}>
            {/* Mobile Frame Header */}
            <div
                className={styles['mobile-frame-header']}
                style={{ backgroundImage: `url(${mobileFrameImage})` }}
            >
            </div>

            {/* Z Broadway Header */}
            <div className={styles['z-broadway-header']} onClick={handleBackClick}>
                <img src={zBroadwayLogo} alt="Back to Food Order" className={styles['header-banner-image']} />
            </div>

            {/* Food Order Filter */}
            <div className={styles['food-order-filter-section']}>
                <img src={foodOrderFilter} alt="Food Order Filters" className={styles['food-order-filter-image']} />
            </div>

            {/* Cold Drink Heading */}
            <div className={styles['cold-drink-heading-section']}>
                <img src={frameColdImage} alt="Cold Drink Heading" className={styles['cold-drink-heading-image']} />
            </div>

            {/* Cold Drinks Grid */}
            <div className={styles['cold-drinks-grid-container']}>
                {loading && <p className={styles['loading-message']}>Loading cold drinks...</p>}
                {error && <p className={styles['error-message']}>{error}</p>}
                {!loading && !error && coldDrinks.length === 0 && (
                    <p className={styles['placeholder-text']}>No cold drinks available at the moment.</p>
                )}
                {!loading && !error && coldDrinks.length > 0 && (
                    <div className={styles['cold-drinks-grid']}>
                        {coldDrinks.map(drink => (
                            <div key={drink._id || drink.name} className={styles['cold-drink-item']} onClick={() => handleDrinkClick(drink)}>
                                <img src={`${BACKEND_URL}${drink.imageUrl}`} alt={drink.name} className={styles['cold-drink-image']} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ColdDrinksPage;