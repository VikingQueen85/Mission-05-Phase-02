
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './HotDrinksDetailPage.module.css';
import zBroadwayLogo from '../../../assets/images/Cart.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function HotDrinkDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [drink, setDrink] = useState(null);
    const [loadingDrink, setLoadingDrink] = useState(true);
    const [errorDrink, setErrorDrink] = useState(null);

    // Customization states - Initialized with empty objects to prevent 'uncontrolled input' warning
    const [selectedSize, setSelectedSize] = useState({ name: '', extraCost: 0 });
    const [quantity, setQuantity] = useState(1);
    const [selectedMilk, setSelectedMilk] = useState({ name: '', extraCost: 0 });
    const [selectedStrength, setSelectedStrength] = useState({ name: '', extraCost: 0 });
    const [selectedFlavor, setSelectedFlavor] = useState({ name: '', extraCost: 0 });

    // Fetched drink options data (sizes, milks, strengths, flavors)
    const [optionsData, setOptionsData] = useState({
        sizes: [],
        milks: [],
        strengths: [],
        flavors: []
    });
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [optionsError, setOptionsError] = useState(null);

    // --- Effect to fetch specific hot drink details ---
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
                console.error(`Failed to fetch drink with ID ${id}:`, err);
                setErrorDrink("Failed to load drink details. Please try again later.");
            } finally {
                setLoadingDrink(false);
            }
        };

        if (id) {
            fetchDrinkDetails();
        }
    }, [id]);

    // --- Effect to fetch drink options (sizes, milks, strengths, flavors) ---
    useEffect(() => {
        const fetchDrinkOptions = async () => {
            setLoadingOptions(true);
            setOptionsError(null);
            try {
                const [sizesRes, milksRes, strengthsRes, flavorsRes] = await Promise.all([
                    fetch(`${BACKEND_URL}/api/drinkoptions/sizes`),
                    fetch(`${BACKEND_URL}/api/drinkoptions/milks`),
                    fetch(`${BACKEND_URL}/api/drinkoptions/strengths`),
                    fetch(`${BACKEND_URL}/api/drinkoptions/flavors`)
                ]);

                if (!sizesRes.ok || !milksRes.ok || !strengthsRes.ok || !flavorsRes.ok) {
                    throw new Error('Failed to fetch one or more drink options.');
                }

                const [sizesData, milksData, strengthsData, flavorsData] = await Promise.all([
                    sizesRes.json(),
                    milksRes.json(),
                    strengthsRes.json(),
                    flavorsRes.json()
                ]);

                setOptionsData({
                    sizes: sizesData,
                    milks: milksData,
                    strengths: strengthsData,
                    flavors: flavorsData
                });

                setSelectedSize(sizesData.find(s => s.name === 'Medium') || sizesData[0] || { name: '', extraCost: 0 });
                setSelectedMilk(milksData.find(m => m.name === 'Full cream') || milksData[0] || { name: '', extraCost: 0 });
                setSelectedStrength(strengthsData.find(s => s.name === 'Single Shot') || strengthsData[0] || { name: '', extraCost: 0 });
                setSelectedFlavor(flavorsData[0] || { name: '', extraCost: 0 });

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
        if (selectedMilk && typeof selectedMilk.extraCost === 'number') {
            price += selectedMilk.extraCost;
        }
        if (selectedStrength && typeof selectedStrength.extraCost === 'number') {
            price += selectedStrength.extraCost;
        }
        if (selectedFlavor && typeof selectedFlavor.extraCost === 'number') {
            price += selectedFlavor.extraCost;
        }

        return (price * quantity).toFixed(2);
    }, [drink, selectedSize, quantity, selectedMilk, selectedStrength, selectedFlavor]);

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
            milk: selectedMilk ? selectedMilk.name : 'N/A',
            strength: selectedStrength ? selectedStrength.name : 'N/A',
            flavor: selectedFlavor ? selectedFlavor.name : 'N/A',
            totalPrice: calculateTotalPrice(),
        });
        navigate('/mobile/hot-drinks');
    }, [drink, quantity, selectedSize, selectedMilk, selectedStrength, selectedFlavor, calculateTotalPrice, navigate]);

    const handleCancel = useCallback(() => {
        navigate('/mobile/hot-drinks');
    }, [navigate]);

    if (loadingDrink || loadingOptions) {
        return <div className={styles['loading-page']}>Loading drink details...</div>;
    }

    if (errorDrink || optionsError || !drink) {
        return <div className={styles['error-page']}>Error: {errorDrink || optionsError || "Drink not found."}</div>;
    }

    const flavorExtraCost = optionsData.flavors.length > 0 && optionsData.flavors[0].extraCost !== undefined ? (optionsData.flavors[0].extraCost).toFixed(2) : '0.00';

    return (
        <div className={styles['detail-page-container']}>
            <div className={styles['top-bar']} onClick={handleCancel}>
                <img src={zBroadwayLogo} alt="Back to Hot Drinks" className={styles['header-banner-image']} />
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

                {/* Milk */}
                <div className={styles['section-group']}>
                    <h2 className={styles['section-title']}>Milk</h2>
                    <div className={styles['radio-options-grid']}>
                        {optionsData.milks.map(milk => (
                            <label key={milk.name} className={styles['radio-label']}>
                                <input
                                    type="radio"
                                    name="milk"
                                    value={milk.name}
                                    checked={selectedMilk?.name === milk.name}
                                    onChange={() => setSelectedMilk(milk)}
                                />
                                {milk.name} {milk.extraCost > 0 && <span className={styles['extra-cost-small']}>+${milk.extraCost.toFixed(2)}</span>}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Strength */}
                <div className={styles['section-group']}>
                    <h2 className={styles['section-title']}>Strength</h2>
                    <div className={styles['radio-options-grid']}>
                        {optionsData.strengths.map(strength => (
                            <label key={strength.name} className={styles['radio-label']}>
                                <input
                                    type="radio"
                                    name="strength"
                                    value={strength.name}
                                    checked={selectedStrength?.name === strength.name}
                                    onChange={() => setSelectedStrength(strength)}
                                />
                                {strength.name} {strength.extraCost > 0 && <span className={styles['extra-cost-small']}>+${strength.extraCost.toFixed(2)}</span>}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Flavor */}
                <div className={styles['section-group']}>
                    <h2 className={styles['section-title']}>Flavor <span className={styles['extra-cost-header']}>+ ${flavorExtraCost}</span></h2>
                    <div className={styles['radio-options-grid']}>
                        {optionsData.flavors.map(flavor => (
                            <label key={flavor.name} className={styles['radio-label']}>
                                <input
                                    type="radio"
                                    name="flavor"
                                    value={flavor.name}
                                    checked={selectedFlavor?.name === flavor.name}
                                    onChange={() => setSelectedFlavor(flavor)}
                                />
                                {flavor.name}
                            </label>
                        ))}
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

export default HotDrinkDetailPage;