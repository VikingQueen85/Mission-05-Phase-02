
import React, { useState, useEffect, useCallback } from 'react';
import './OrderFoodOverlay.css';
import zLogoImage from '../../../assets/images/Z-Logo.png';

// Helper Component for a clickable item button
const ItemButton = ({ item, onClick }) => {
    return (
        <button className="item-option-button" onClick={() => onClick(item)}>
            <img src={item.imageUrl} alt={item.name} className="item-option-image" />
            <p className="item-option-label">{item.name}</p>
        </button>
    );
};

function OrderFoodOverlay({ contentType, onClose }) {
    const [allFoodItems, setAllFoodItems] = useState([]);
    const [loadingAllFoodItems, setLoadingAllFoodItems] = useState(true);
    const [allFoodItemsError, setAllFoodItemsError] = useState(null);

    // NEW STATES for integrated drink customization
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
                const response = await fetch(`http://localhost:3000/api/fooditems`);
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

    // Helper function to get the appropriate label for the overlay header
    const getLabelText = (type) => {
        if (customizedDrink) {
            return `Customize ${customizedDrink.name}:`;
        }
        switch (type) {
            case 'hot_drinks': return 'Select Hot Drink:';
            case 'cold_drinks': return 'Select Cold Drink:';
            case 'food': return 'Select Food Item:';
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
            console.log(`Clicked on ${itemDetails.name} (${itemDetails.category}). Customization not implemented for this category yet.`);
        }
    }, [allFoodItems, optionsData]);

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

    // Render the customization section
    const renderCustomizationSection = () => {
        if (!customizedDrink) return null;

        if (loadingOptions) {
            return <p className="loading-message">Loading customization options...</p>;
        }

        if (optionsError) {
            return <p className="error-message">{optionsError}</p>;
        }

        return (
            <>
                <div className="drink-info-section">
                    <img src={customizedDrink.imageUrl} alt={customizedDrink.name} className="drink-detail-image" />
                    <div className="drink-text-content">
                        <h1 className="drink-detail-name">{customizedDrink.name}</h1>
                        <p className="drink-detail-description">{customizedDrink.description}</p>
                    </div>
                </div>

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
                                <span className="cup-icon">☕</span> {size.name}
                                {` $${((customizedDrink.price || 0) + (size.extraCost || 0)).toFixed(2)}`}
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
                                    name="custom-milk"
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
                                    name="custom-strength"
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
                                    name="custom-flavor"
                                    value={flavor.name}
                                    checked={selectedFlavor && selectedFlavor.name === flavor.name}
                                    onChange={() => handleFlavorChange(flavor)}
                                />
                                {flavor.name} {flavor.extraCost > 0 && <span>+ {flavor.extraCost.toFixed(2)} cents</span>}
                            </label>
                        ))}
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

    // Define renderItemsByCategory as a function within the component scope
    const renderItemsByCategory = () => {
        const filteredItems = allFoodItems.filter(item => item.category === contentType);

        if (loadingAllFoodItems) {
            return <p className="loading-text">Loading items...</p>;
        }

        if (allFoodItemsError) {
            return <p className="error-text">{allFoodItemsError}</p>;
        }

        if (filteredItems.length === 0) {
            const placeholderMap = {
                'hot_drinks': 'Hot drinks options coming soon!',
                'cold_drinks': 'Cold drinks options coming soon!',
                'food': 'Food options coming soon!',
                'combo': 'Combo options coming soon!'
            };
            return <p className="placeholder-text">{placeholderMap[contentType] || 'No items available.'}</p>;
        }

        return (
            <div className="item-options-grid">
                {filteredItems.map(item => (
                    <ItemButton key={item.name} item={item} onClick={handleItemClick} />
                ))}
            </div>
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
                    {customizedDrink && customizedDrink.category === 'hot_drinks' ? (
                        renderCustomizationSection()
                    ) : (
                        renderItemsByCategory()
                    )}
                </div>
            </div>
            {/* ItemDetailOverlay removed */}
        </div>
    );
}

export default OrderFoodOverlay;