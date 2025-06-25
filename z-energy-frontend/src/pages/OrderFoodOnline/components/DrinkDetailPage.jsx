
import React, { useState, useEffect, useCallback } from 'react';
import './DrinkDetailPage.css';

// Static image imports for the header/footer
import mobileFrameImage from "../../../assets/images/MobileFrame.png";
import hotDrinksBannerImage from "../../../assets/images/Cart.png";

function DrinkDetailPage({ drink, onClose }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedMilk, setSelectedMilk] = useState(null);
    const [selectedStrength, setSelectedStrength] = useState(null);
    const [selectedFlavor, setSelectedFlavor] = useState(null);

    // State to store fetched options data
    const [optionsData, setOptionsData] = useState({
        sizes: [],
        milks: [],
        strengths: [],
        flavors: []
    });
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [optionsError, setOptionsError] = useState(null);

    // Effect to fetch options data when component mounts
    useEffect(() => {
        const fetchDrinkOptions = async () => {
        setLoadingOptions(true);
        setOptionsError(null);
        try {
            const [sizesRes, milksRes, strengthsRes, flavorsRes] = await Promise.all([
            fetch('http://localhost:3000/api/drinkoptions/sizes'),
            fetch('http://localhost:3000/api/drinkoptions/milks'),
            fetch('http://localhost:3000/api/drinkoptions/strengths'),
            fetch('http://localhost:3000/api/drinkoptions/flavors')
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

    const handleSizeChange = useCallback((sizeObj) => {
        setSelectedSize(sizeObj);
    }, []);

    const handleQuantityChange = useCallback((change) => {
        setQuantity(prev => Math.max(1, prev + change));
    }, []);

    const handleMilkChange = useCallback((milkObj) => {
        setSelectedMilk(milkObj);
    }, []);

    const handleStrengthChange = useCallback((strengthObj) => {
        setSelectedStrength(strengthObj);
    }, []);

    const handleFlavorChange = useCallback((flavorObj) => {
        setSelectedFlavor(prev => (prev && prev.name === flavorObj.name ? null : flavorObj));
    }, []);

    const calculateTotalPrice = useCallback(() => {
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
    }, [drink.price, selectedSize, quantity, selectedMilk, selectedStrength, selectedFlavor]);


    const handleAddToCart = () => {
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
    };

    // Display loading/error states for main drink data or options data
    if (!drink) {
        return <div className="loading-or-error">Drink details not found.</div>;
    }

    if (loadingOptions) {
        return <div className="loading-or-error">Loading drink options...</div>;
    }

    if (optionsError) {
        return <div className="loading-or-error">{optionsError}</div>;
    }

    return (
        <div className="drink-detail-page-container">
        {/* Top Frame Section - Matches mobile-top-frame from HotDrinksPage */}
        <div
            className="mobile-top-frame drink-detail-top-frame"
            style={{ backgroundImage: `url(${mobileFrameImage})` }}
        >
            <button className="back-arrow-button" onClick={onClose}>
            &larr;
            </button>
            {/* Dynamic title for the drink detail page */}
            <span className="drink-detail-title">{drink.name}</span>
            <button className="cart-icon-button" onClick={onClose}>
            {/* Cart Icon SVG */}
            <svg className="cart-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 18C17 18.5523 16.5523 19 16 19C15.4477 19 15 18.5523 15 18C15 17.4477 15.4477 17 16 17C16.5523 17 17 17.4477 17 18Z" />
                <path d="M9 18C9 18.5523 8.55228 19 8 19C7.44772 19 7 18.5523 7 18C7 17.4477 7.44772 17 8 17C8.55228 17 9 17.4477 9 18Z" />
                <path d="M18.32 12H5.16L4.2 7H21L18.32 12ZM4.39498 4H21.605C21.9056 4 22.1583 4.22554 22.1969 4.52504L23.7969 16.525C23.8329 16.8049 23.6496 17.068 23.37 17.104C23.0901 17.14 22.827 16.9567 22.791 16.6769L21.2051 4H4.39498ZM2 2H3.39498L4.85698 12.015L4.99698 13L5.161 14L5.80504 18.232C5.93223 19.096 6.70273 19.7 7.57504 19.7H16.425C17.2973 19.7 18.0678 19.096 18.195 18.232L19.78 6H2Z" />
            </svg>
            </button>
        </div>

        <div
            className="drink-detail-banner-section"
            style={{ backgroundImage: `url(${hotDrinksBannerImage})` }}
            onClick={onClose}>
            <div className="drink-detail-banner-overlay"></div>
        </div>

        {/* Main Content Area */}
        <div className="drink-detail-main-content">
            <div className="drink-info-section">
            <img src={drink.src} alt={drink.name} className="drink-detail-image" />
            <div className="drink-text-content">
                <h1 className="drink-detail-name">{drink.name}</h1>
                {drink.description && <p className="drink-detail-description">{drink.description}</p>}
            </div>
            </div>

            {/* Options Sections (Size, Quantity, Milk, Strength, Flavor) */}
            {/* Size Selection */}
            <div className="option-group">
            <h2>Size</h2>
            <div className="option-buttons-container">
                {optionsData.sizes.map((size) => (
                <button
                    key={size.name}
                    className={`option-button ${selectedSize && selectedSize.name === size.name ? 'selected' : ''}`}
                    onClick={() => handleSizeChange(size)}
                >
                    <span className="cup-icon">☕</span> {size.name} ${((drink.price || 0) + (size.extraCost || 0)).toFixed(2)}
                </button>
                ))}
            </div>
            </div>

            {/* Quantity Selector */}
            <div className="option-group">
            <h2>Quantity</h2>
            <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            </div>

            {/* Milk Options */}
            <div className="option-group">
            <h2>Milk</h2>
            <div className="radio-options-grid">
                {optionsData.milks.map((milk) => (
                <label key={milk.name}>
                    <input
                    type="radio"
                    name="milk"
                    value={milk.name}
                    checked={selectedMilk && selectedMilk.name === milk.name}
                    onChange={() => handleMilkChange(milk)}
                    />
                    {milk.name} {milk.extraCost > 0 && <span>+ {milk.extraCost.toFixed(2)} cents</span>}
                </label>
                ))}
            </div>
            </div>

            {/* Strength Options */}
            <div className="option-group">
            <h2>Strength</h2>
            <div className="radio-options-grid">
                {optionsData.strengths.map((strength) => (
                <label key={strength.name}>
                    <input
                    type="radio"
                    name="strength"
                    value={strength.name}
                    checked={selectedStrength && selectedStrength.name === strength.name}
                    onChange={() => handleStrengthChange(strength)}
                    />
                    {strength.name} {strength.extraCost > 0 && <span>+ {strength.extraCost.toFixed(2)} cents</span>}
                </label>
                ))}
            </div>
            </div>

            {/* Flavor Options */}
            <div className="option-group">
            <h2>Flavor <span className="extra-cost">+ $1.00</span></h2>
            <div className="radio-options-grid">
                {optionsData.flavors.map((flavor) => (
                <label key={flavor.name}>
                    <input
                    type="radio"
                    name="flavor"
                    value={flavor.name}
                    checked={selectedFlavor && selectedFlavor.name === flavor.name}
                    onChange={() => handleFlavorChange(flavor)}
                    />
                    {flavor.name} {flavor.extraCost > 0 && <span>+ {flavor.extraCost.toFixed(2)} cents</span>}
                </label>
                ))}
            </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-container">
            <button className="cancel-button" onClick={onClose}>Cancel</button>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart - ${calculateTotalPrice()}
            </button>
            </div>
        </div>
        {/* Footer Section */}
        <div className="drink-detail-footer">
            <div className="footer-nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 12H5V22H19V12H22L12 2ZM12 4.31L19.34 11.66H17V20H7V11.66H4.66L12 4.31Z"/></svg>
            <span>Home</span>
            </div>
            <div className="footer-nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15 3H21V9H15V3ZM17 5V7H19V5H17ZM15 15H21V21H15V15ZM17 17V19H19V17H17ZM9 3H3V9H9V3ZM5 5V7H7V5H5ZM9 15H3V21H9V15ZM5 17V19H7V17H5ZM11 7H13V17H11V7ZM7 11H17V13H7V11ZM11 1H13V3H11V1ZM11 21H13V23H11V21Z"/></svg>
            <span>QR code</span>
            </div>
            <div className="footer-nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM13 7H11V13H17V11H13V7Z"/></svg>
            <span>Share Tank</span>
            </div>
            <div className="footer-nav-item">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"/></svg>
            <span>More</span>
            </div>
        </div>
        </div>
    );
}

export default DrinkDetailPage;