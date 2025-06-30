
import React, { useState, useEffect, useCallback } from 'react';
import './OrderFoodOverlay.css';
import zLogoImage from '../../../assets/images/Z-Logo.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Helper Component for a clickable item button
const ItemButton = ({ item, onClick }) => {
    return (
        <button className="item-option-button" onClick={() => onClick(item)}>
            <img
                src={`${BACKEND_URL}${item.imageUrl}`}
                alt={item.name}
                className="item-option-image"
            />
        </button>
    );
};

function OrderFoodOverlay({ contentType, onClose }) {
    const [allFoodItems, setAllFoodItems] = useState([]);
    const [loadingAllFoodItems, setLoadingAllFoodItems] = useState(true);
    const [allFoodItemsError, setAllFoodItemsError] = useState(null);
    const [showDevelopmentMessages, setShowDevelopmentMessages] = useState(false);

    // States for integrated drink customization
    const [customizedDrink, setCustomizedDrink] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedMilk, setSelectedMilk] = useState(null);
    const [selectedStrength, setSelectedStrength] = useState(null);
    const [selectedFlavor, setSelectedFlavor] = useState(null);

    // States for fetched drink options data (sizes, milks, strengths, flavors)
    const [optionsData, setOptionsData] = useState({
        sizes: [],
        milks: [],
        strengths: [],
        flavors: []
    });
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [optionsError, setOptionsError] = useState(null);

    // --- Effect to fetch ALL food items ONCE when the component mounts ---
    useEffect(() => {
        const fetchAllFoodItems = async () => {
            setLoadingAllFoodItems(true);
            setAllFoodItemsError(null);
            try {
                const response = await fetch(`${BACKEND_URL}/api/fooditems`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllFoodItems(data);
            } catch (err) {
                console.error("Failed to fetch all food items for main overlay:", err);
                setAllFoodItemsError("Failed to load items. Please try again later.");
            } finally {
                setLoadingAllFoodItems(false);
            }
        };
        fetchAllFoodItems();
    }, []);

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

                // Set initial selected values for customization when options are loaded
                setSelectedSize(sizesData.find(s => s.name === 'Medium') || sizesData[0]);
                setSelectedMilk(milksData.find(m => m.name === 'Full cream') || milksData[0]);
                setSelectedStrength(strengthsData.find(s => s.name === 'Single Shot') || strengthsData[0]);

            } catch (err) {
                console.error("Error fetching drink options for customization:", err);
                setOptionsError("Failed to load customization options. Please try again later.");
            } finally {
                setLoadingOptions(false);
            }
        };
        fetchDrinkOptions();
    }, []);

    // --- Effect to manage the "Under Development" message visibility ---
    useEffect(() => {
        if (contentType === 'cold_drinks' || contentType === 'food') {
            setShowDevelopmentMessages(true);
        } else {
            setShowDevelopmentMessages(false);
        }
    }, [contentType]);


    // Helper function to get the appropriate label for the overlay header
    const getLabelText = (type) => {
        if (customizedDrink) {
            return `Customize ${customizedDrink.name}:`;
        }
        switch (type) {
            case 'hot_drinks': return 'Select Hot Drink:';
            case 'cold_drinks': return 'Select Cold Drink:';
            case 'food': return 'Select Food:';
            case 'combo': return 'Select Combo:';
            default: return 'Select Item:';
        }
    };

    // Function to handle clicking on an item button
    const handleItemClick = useCallback((itemDetails) => {
        if (itemDetails.category === 'hot_drinks') {
            setCustomizedDrink(itemDetails);
            setQuantity(1);
            setSelectedSize(optionsData.sizes.find(s => s.name === 'Medium') || optionsData.sizes[0]);
            setSelectedMilk(optionsData.milks.find(m => m.name === 'Full cream') || optionsData.milks[0]);
            setSelectedStrength(optionsData.strengths.find(s => s.name === 'Single Shot') || optionsData.strengths[0]);
            setSelectedFlavor(null);
        } else {
            console.log(`Clicked on ${itemDetails.name} (${itemDetails.category}). No action taken yet.`);
        }
    }, [optionsData]);

    // Handlers for coffee customization options
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

    // Calculate total price for the customized drink
    const calculateTotalPrice = useCallback(() => {
        if (!customizedDrink) return (0).toFixed(2);

        let price = customizedDrink.price || 0;

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
    }, [customizedDrink, selectedSize, quantity, selectedMilk, selectedStrength, selectedFlavor]);

    const handleAddToCart = () => {
        console.log("Adding to cart:", {
            drinkId: customizedDrink._id,
            name: customizedDrink.name,
            size: selectedSize ? selectedSize.name : 'N/A',
            quantity: quantity,
            milk: selectedMilk ? selectedMilk.name : 'N/A',
            strength: selectedStrength ? selectedStrength.name : 'N/A',
            flavor: selectedFlavor ? selectedFlavor.name : 'N/A',
            totalPrice: calculateTotalPrice(),
        });
        setCustomizedDrink(null);
    };

    // Render the customization section (your original combined layout)
    const renderCustomizationSection = () => {
        if (!customizedDrink) return null;

        if (loadingOptions) {
            return <p className="loading-message">Loading customization options...</p>;
        }

        if (optionsError) {
            return <p className="error-message">{optionsError}</p>;
        }

        const flavorExtraCost = optionsData.flavors.length > 0 ? (optionsData.flavors[0].extraCost || 0).toFixed(2) : '0.00';

        return (
            <>
                <div className="drink-summary-section">
                    <div className="drink-image-container">
                        <img
                            src={`${BACKEND_URL}${customizedDrink.imageUrl}`}
                            alt={customizedDrink.name}
                            className="drink-detail-image"
                        />
                    </div>
                    <div className="drink-text-and-options">
                        <h1 className="drink-detail-name">{customizedDrink.name}</h1>
                        <p className="drink-detail-description">{customizedDrink.description}</p>

                        {/* Size Selection */}
                        <div className="option-group">
                            <h2>Size</h2>
                            <div className="size-options">
                                {optionsData.sizes.map((size) => (
                                    <button
                                        key={size.name}
                                        className={`size-button ${selectedSize && selectedSize.name === size.name ? 'selected' : ''}`}
                                        onClick={() => handleSizeChange(size)}
                                    >
                                        <span className="cup-icon">☕</span>
                                        <span className="size-name">{size.name}</span>
                                        <span className="size-price">${((customizedDrink.price || 0) + (size.extraCost || 0)).toFixed(2)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity, Edit, Delete Controls */}
                        <div className="option-group">
                            <h2>Quantity</h2>
                            <div className="quantity-selector">
                                <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)}>+</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preferences Section (Milk, Strength, Flavor) */}
                <div className="preferences-section">
                    <h2 className="preferences-heading">Select Preferences</h2>
                    <div className="preferences-grid">
                        {/* Milk Options */}
                        <div className="option-group">
                            <h3>Milk</h3>
                            <div className="radio-options-grid">
                                {optionsData.milks.map((milk) => (
                                    <label key={milk.name} className="radio-label">
                                        <input
                                            type="radio"
                                            name="custom-milk"
                                            value={milk.name}
                                            checked={selectedMilk && selectedMilk.name === milk.name}
                                            onChange={() => handleMilkChange(milk)}
                                        />
                                        {milk.name} {milk.extraCost > 0 && <span className="extra-cost-small">+{milk.extraCost.toFixed(2)}</span>}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Strength Options */}
                        <div className="option-group">
                            <h3>Strength</h3>
                            <div className="radio-options-grid">
                                {optionsData.strengths.map((strength) => (
                                    <label key={strength.name} className="radio-label">
                                        <input
                                            type="radio"
                                            name="custom-strength"
                                            value={strength.name}
                                            checked={selectedStrength && selectedStrength.name === strength.name}
                                            onChange={() => handleStrengthChange(strength)}
                                        />
                                        {strength.name} {strength.extraCost > 0 && <span className="extra-cost-small">+{strength.extraCost.toFixed(2)}</span>}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Flavor Options */}
                        <div className="option-group">
                            <h3>Flavor <span className="extra-cost-header">+ ${flavorExtraCost}</span></h3>
                            <div className="radio-options-grid">
                                {optionsData.flavors.map((flavor) => (
                                    <label key={flavor.name} className="radio-label">
                                        <input
                                            type="radio"
                                            name="custom-flavor"
                                            value={flavor.name}
                                            checked={selectedFlavor && selectedFlavor.name === flavor.name}
                                            onChange={() => handleFlavorChange(flavor)}
                                        />
                                        {flavor.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="action-buttons-container">
                    <button className="cancel-button" onClick={() => setCustomizedDrink(null)}>
                        Back to Selection
                    </button>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        Add to Cart - ${calculateTotalPrice()}
                    </button>
                </div>
            </>
        );
    };

    // Render items grid filtered by category
    const renderItemsByCategory = () => {
        const itemsToDisplay = allFoodItems.filter(item => item.category === contentType);

        if (loadingAllFoodItems) {
            return <p className="loading-text">Loading items...</p>;
        }

        if (allFoodItemsError) {
            return <p className="error-text">{allFoodItemsError}</p>;
        }

        return (
            <>
                {/* Display the "Under Development" message and specific unavailable message */}
                {showDevelopmentMessages && (
                    <div className="development-messages-container">
                        <p className="under-development-message">Under Development: </p>
                        {contentType === 'cold_drinks' && (
                            <p className="unavailable-specific-message">Cold drink orders are not available on our website, please check out our app</p>
                        )}
                        {contentType === 'food' && (
                            <p className="unavailable-specific-message">Food orders are not available on our website, please check out our app</p>
                        )}
                    </div>
                )}

                {itemsToDisplay.length > 0 ? (
                    <div className="item-options-grid">
                        {itemsToDisplay.map(item => (
                            <ItemButton key={item._id || item.name} item={item} onClick={handleItemClick} />
                        ))}
                    </div>
                ) : (
                    // Fallback for when no items are found at all for the category
                    !showDevelopmentMessages && (
                        <p className="placeholder-text">No items available for this category yet.</p>
                    )
                )}
            </>
        );
    };

    return (
        <div className="order-food-overlay" onClick={onClose}>
            <div className="overlay-content-box" onClick={(e) => e.stopPropagation()}>
                <button className="overlay-close-button" onClick={onClose}>×</button>

                <div className="overlay-header-frame">
                    <img src={zLogoImage} alt="Z Energy Logo" className="overlay-logo" />
                    <p className="overlay-label">{getLabelText(contentType)}</p>
                </div>

                <div className="overlay-items-container">
                    {contentType === 'hot_drinks' && customizedDrink ? (
                        renderCustomizationSection()
                    ) : (
                        renderItemsByCategory()
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderFoodOverlay;