
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ColdDrinksDetailPage.module.css';
import zBroadwayLogo from '../../../assets/images/Cart.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function ColdDrinkDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [drink, setDrink] = useState(null);
    const [loadingDrink, setLoadingDrink] = useState(true);
    const [errorDrink, setErrorDrink] = useState(null);

    // Customization states
    const [selectedSize, setSelectedSize] = useState({ name: '', extraCost: 0 });
    const [quantity, setQuantity] = useState(1);

    // Fetched drink options data
    const [optionsData, setOptionsData] = useState({
        sizes: [],
    });
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [optionsError, setOptionsError] = useState(null);

    // --- Effect to fetch specific cold drink details ---
    useEffect(() => {
        const fetchDrinkDetails = async () => {
            setLoadingDrink(true);
            setErrorDrink(null);
            try {
                const response = await fetch(`${BACKEND_URL}/api/fooditems/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDrink(data);
            } catch (err) {
                console.error(`Failed to fetch cold drink with ID ${id}:`, err);
                setErrorDrink("Failed to load cold drink details. Please try again later.");
            } finally {
                setLoadingDrink(false);
            }
        };

        if (id) {
            fetchDrinkDetails();
        }
    }, [id]);

    // --- Effect to fetch drink options ---
    useEffect(() => {
        const fetchDrinkOptions = async () => {
            setLoadingOptions(true);
            setOptionsError(null);
            try {
                const sizesRes = await fetch(`${BACKEND_URL}/api/drinkoptions/sizes`);

                if (!sizesRes.ok) {
                    throw new Error('Failed to fetch drink sizes.');
                }

                const sizesData = await sizesRes.json();

                setOptionsData({
                    sizes: sizesData,
                });

                setSelectedSize(sizesData.find(s => s.name === 'Medium') || sizesData[0] || { name: '', extraCost: 0 });

            } catch (err) {
                console.error("Error fetching drink options for customization:", err);
                setOptionsError("Failed to load customization options. Please try again later.");
            } finally {
                setLoadingOptions(false);
            }
        };
        fetchDrinkOptions();
    }, []);

    const calculateTotalPrice = useCallback(() => {
        if (!drink) return (0).toFixed(2);

        let price = drink.price || 0;

        if (selectedSize && typeof selectedSize.extraCost === 'number') {
            price += selectedSize.extraCost;
        }

        return (price * quantity).toFixed(2);
    }, [drink, selectedSize, quantity]);

    const handleQuantityChange = useCallback((change) => {
        setQuantity(prev => Math.max(0, prev + change));
    }, []);

    const handleAddToCart = useCallback(() => {
        if (!drink || quantity === 0) {
            console.warn("Cannot add to cart: No drink selected or quantity is zero.");
            return;
        }

        console.log("Adding to cart:", {
            drinkId: drink._id,
            name: drink.name,
            size: selectedSize ? selectedSize.name : 'N/A',
            quantity: quantity,
            totalPrice: calculateTotalPrice(),
        });
        navigate('/mobile/cold-drinks');
    }, [drink, quantity, selectedSize, calculateTotalPrice, navigate]);

    const handleCancel = useCallback(() => {
        navigate('/mobile/cold-drinks');
    }, [navigate]);

    if (loadingDrink || loadingOptions) {
        return <div className={styles['loading-page']}>Loading drink details...</div>;
    }

    if (errorDrink || optionsError || !drink) {
        return <div className={styles['error-page']}>Error: {errorDrink || optionsError || "Drink not found."}</div>;
    }

    return (
        <div className={styles['detail-page-container']}>
            <div className={styles['top-bar']} onClick={handleCancel}>
                <img src={zBroadwayLogo} alt="Back to Cold Drinks" className={styles['header-banner-image']} />
            </div>

            {/* Drink Summary Section */}
            <div className={styles['drink-summary-section']}>
                <img src={`${BACKEND_URL}${drink.imageUrl}`} alt={drink.name} className={styles['drink-image']} />
                <div className={styles['drink-info']}>
                    <h1 className={styles['drink-name']}>{drink.name}</h1>
                    <p className={styles['drink-description']}>{drink.description}</p>
                </div>
            </div>

            {/* Customization Sections */}
            <div className={styles['customization-sections']}>
                {/* Size */}
                <div className={styles['section-group']}>
                    <h2 className={styles['section-title']}>Size</h2>
                    <div className={styles['size-options']}>
                        {optionsData.sizes.map(size => (
                            <button
                                key={size.name}
                                className={`${styles['size-button']} ${selectedSize?.name === size.name ? styles.selected : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                <span className={styles['cup-icon']}>☕</span>
                                <span className={styles['size-name']}>{size.name}</span>
                                <span className={styles['size-price']}>${((drink.price || 0) + (size.extraCost || 0)).toFixed(2)}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity */}
                <div className={styles['section-group']}>
                    <h2 className={styles['section-title']}>Quantity</h2>
                    <div className={styles['quantity-control']}>
                        <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 0}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleQuantityChange(1)}>+</button>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className={styles['action-buttons-container']}>
                <button className={styles['cancel-button']} onClick={handleCancel}>
                    Cancel
                </button>
                <button className={styles['add-to-cart-button']} onClick={handleAddToCart}>
                    Add to Cart - ${calculateTotalPrice()}
                </button>
            </div>
        </div>
    );
}

export default ColdDrinkDetailPage;