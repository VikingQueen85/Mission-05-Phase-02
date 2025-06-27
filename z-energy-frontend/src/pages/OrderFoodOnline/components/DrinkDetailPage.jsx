
import React, { useState, useEffect, useCallback } from 'react';
import './DrinkDetailPage.css';

import mobileFrameImage from "../../../assets/images/MobileFrame.png";
import hotDrinksBannerImage from "../../../assets/images/Cart.png";
import Footer from "./common/Footer.jsx";

// --- Backend URL ---
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function DrinkDetailPage({ drink, onClose }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedMilk, setSelectedMilk] = useState(null);
    const [selectedStrength, setSelectedStrength] = useState(null);
    const [selectedFlavor, setSelectedFlavor] = useState(null);

    const [optionsData, setOptionsData] = useState({
        sizes: [],
        milks: [],
        strengths: [],
        flavors: []
    });
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [optionsError, setOptionsError] = useState(null);

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

                setOptionsData({ sizes: sizesData, milks: milksData, strengths: strengthsData, flavors: flavorsData });

                setSelectedSize(sizesData.find(s => s.name === 'Medium') || sizesData[0]);
                setSelectedMilk(milksData.find(m => m.name === 'Full cream') || milksData[0]);
                setSelectedStrength(strengthsData.find(s => s.name === 'Single Shot') || strengthsData[0]);
            } catch (err) {
                console.error("Error fetching drink options:", err);
                setOptionsError("Failed to load drink options. Please try again later.");
            } finally {
                setLoadingOptions(false);
            }
        };

        fetchDrinkOptions();
    }, []);

    const handleSizeChange = useCallback(sizeObj => setSelectedSize(sizeObj), []);
    const handleQuantityChange = useCallback(change => setQuantity(prev => Math.max(1, prev + change)), []);
    const handleMilkChange = useCallback(milkObj => setSelectedMilk(milkObj), []);
    const handleStrengthChange = useCallback(strengthObj => setSelectedStrength(strengthObj), []);
    const handleFlavorChange = useCallback(flavorObj => {
        setSelectedFlavor(prev => (prev && prev.name === flavorObj.name ? null : flavorObj));
    }, []);

    const calculateTotalPrice = useCallback(() => {
        let price = drink.price || 0;
        if (selectedSize?.extraCost) price += selectedSize.extraCost;
        if (selectedMilk?.extraCost) price += selectedMilk.extraCost;
        if (selectedStrength?.extraCost) price += selectedStrength.extraCost;
        if (selectedFlavor?.extraCost) price += selectedFlavor.extraCost;
        return (price * quantity).toFixed(2);
    }, [drink.price, selectedSize, quantity, selectedMilk, selectedStrength, selectedFlavor]);

    const handleAddToCart = () => {
        console.log("Adding to cart:", {
            drinkId: drink._id,
            name: drink.name,
            size: selectedSize?.name,
            quantity,
            milk: selectedMilk?.name,
            strength: selectedStrength?.name,
            flavor: selectedFlavor?.name,
            totalPrice: calculateTotalPrice(),
        });
    };

    if (!drink) return <div className="loading-or-error">Drink details not found.</div>;
    if (loadingOptions) return <div className="loading-or-error">Loading drink options...</div>;
    if (optionsError) return <div className="loading-or-error">{optionsError}</div>;

    return (
        <div className="drink-detail-page-container">
            <div className="mobile-top-frame drink-detail-top-frame" style={{ backgroundImage: `url(${mobileFrameImage})` }}>
                <button className="back-arrow-button" onClick={onClose}>&larr;</button>
                <span className="drink-detail-title">{drink.name}</span>
                <button className="cart-icon-button" onClick={onClose}>
                    <svg className="cart-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 18C17 18.5523 16.5523 19 16 19C15.4477 19 15 18.5523 15 18C15 17.4477 15.4477 17 16 17C16.5523 17 17 17.4477 17 18Z" />
                        <path d="M9 18C9 18.5523 8.55228 19 8 19C7.44772 19 7 18.5523 7 18C7 17.4477 7.44772 17 8 17C8.55228 17 9 17.4477 9 18Z" />
                        <path d="M18.32 12H5.16L4.2 7H21L18.32 12ZM4.39498 4H21.605C21.9056 4 22.1583 4.22554 22.1969 4.52504L23.7969 16.525C23.8329 16.8049 23.6496 17.068 23.37 17.104C23.0901 17.14 22.827 16.9567 22.791 16.6769L21.2051 4H4.39498ZM2 2H3.39498L4.85698 12.015L4.99698 13L5.161 14L5.80504 18.232C5.93223 19.096 6.70273 19.7 7.57504 19.7H16.425C17.2973 19.7 18.0678 19.096 18.195 18.232L19.78 6H2Z" />
                    </svg>
                </button>
            </div>

            <div className="drink-detail-banner-section" style={{ backgroundImage: `url(${hotDrinksBannerImage})` }} onClick={onClose}>
                <div className="drink-detail-banner-overlay"></div>
            </div>

            <div className="drink-detail-main-content">
                <div className="drink-info-section">
                    <img
                        src={`${BACKEND_URL}${drink.imageUrl}`}
                        alt={drink.name}
                        className="drink-detail-image"
                    />
                    <div className="drink-text-content">
                        <h1 className="drink-detail-name">{drink.name}</h1>
                        {drink.description && <p className="drink-detail-description">{drink.description}</p>}
                    </div>
                </div>

                <div className="option-group">
                    <h2>Size</h2>
                    <div className="option-buttons-container">
                        {optionsData.sizes.map(size => (
                            <button
                                key={size.name}
                                className={`option-button ${selectedSize?.name === size.name ? 'selected' : ''}`}
                                onClick={() => handleSizeChange(size)}
                            >
                                <span className="cup-icon">☕</span> {size.name} ${(drink.price + (size.extraCost || 0)).toFixed(2)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="option-group">
                    <h2>Quantity</h2>
                    <div className="quantity-selector">
                        <button onClick={() => handleQuantityChange(-1)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleQuantityChange(1)}>+</button>
                    </div>
                </div>

                <div className="option-group">
                    <h2>Milk</h2>
                    <div className="radio-options-grid">
                        {optionsData.milks.map(milk => (
                            <label key={milk.name}>
                                <input
                                    type="radio"
                                    name="milk"
                                    checked={selectedMilk?.name === milk.name}
                                    onChange={() => handleMilkChange(milk)}
                                />
                                {milk.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="option-group">
                    <h2>Strength</h2>
                    <div className="radio-options-grid">
                        {optionsData.strengths.map(strength => (
                            <label key={strength.name}>
                                <input
                                    type="radio"
                                    name="strength"
                                    checked={selectedStrength?.name === strength.name}
                                    onChange={() => handleStrengthChange(strength)}
                                />
                                {strength.name} {strength.extraCost > 0 && <span>+ {strength.extraCost.toFixed(2)} cents</span>}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="option-group">
                    <h2>Flavor <br /><span className="extra-cost">+ $1.00</span></h2>
                    <div className="radio-options-grid">
                        {optionsData.flavors.map(flavor => (
                            <label key={flavor.name}>
                                <input
                                    type="radio"
                                    name="flavor"
                                    checked={selectedFlavor?.name === flavor.name}
                                    onChange={() => handleFlavorChange(flavor)}
                                />
                                {flavor.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="action-buttons-container">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        Add to Cart - ${calculateTotalPrice()}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DrinkDetailPage;
