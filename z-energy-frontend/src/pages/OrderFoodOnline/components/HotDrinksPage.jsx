
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HotDrinksPage.module.css';

import mobileFrameImage from '../../../assets/images/MobileFrame.png';
import zBroadwayLogo from '../../../assets/images/Cart.png';
import foodOrderFilter from '../../../assets/images/FoodOrderFilter.png';
import frameHotImage from '../../../assets/images/FrameHot.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function HotDrinksPage() {
    const [hotDrinks, setHotDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotDrinks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${BACKEND_URL}/api/fooditems`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const filteredHotDrinks = data.filter(item => item.category === 'hot_drinks');
                setHotDrinks(filteredHotDrinks);
            } catch (err) {
                console.error("Failed to fetch hot drinks:", err);
                setError("Failed to load hot drinks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchHotDrinks();
    }, []);

    const handleBackClick = useCallback(() => {
        navigate('/mobile');
    }, [navigate]);

    const handleDrinkClick = useCallback((drink) => {
        navigate(`/mobile/hot-drinks/${drink._id || drink.name}`);
    }, [navigate]);

    return (
        <div className={styles['hot-drinks-page-container']}>
            <div
                className={styles['mobile-frame-header']}
                style={{ backgroundImage: `url(${mobileFrameImage})` }}>
            </div>

            {/* Z Broadway Header */}
            <div className={styles['z-broadway-header']} onClick={handleBackClick}>
                <img src={zBroadwayLogo} alt="Back to Food Order" className={styles['header-banner-image']} />
            </div>

            {/* Food Order Filter */}
            <div className={styles['food-order-filter-section']}>
                <img src={foodOrderFilter} alt="Food Order Filters" className={styles['food-order-filter-image']} />
            </div>

            {/* Hot Drink Heading */}
            <div className={styles['hot-drink-heading-section']}>
                <img src={frameHotImage} alt="Hot Drink Heading" className={styles['hot-drink-heading-image']} />
            </div>

            {/* Hot Drinks Grid */}
            <div className={styles['hot-drinks-grid-container']}>
                {loading && <p className={styles['loading-message']}>Loading hot drinks...</p>}
                {error && <p className={styles['error-message']}>{error}</p>}
                {!loading && !error && hotDrinks.length === 0 && (
                    <p className={styles['placeholder-text']}>No hot drinks available at the moment.</p>
                )}
                {!loading && !error && hotDrinks.length > 0 && (
                    <div className={styles['hot-drinks-grid']}>
                        {hotDrinks.map(drink => (
                            <div key={drink._id || drink.name} className={styles['hot-drink-item']} onClick={() => handleDrinkClick(drink)}>
                                <img src={`${BACKEND_URL}${drink.imageUrl}`} alt={drink.name} className={styles['hot-drink-image']} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HotDrinksPage;