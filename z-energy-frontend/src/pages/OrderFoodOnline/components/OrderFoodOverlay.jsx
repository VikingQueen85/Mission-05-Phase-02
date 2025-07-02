
import React, { useState, useEffect, useCallback } from 'react';
import './OrderFoodOverlay.css';
import zLogoImage from '../../../assets/images/Z-Logo.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Helper Component for a clickable item button
const ItemButton = ({ item, onClick, isColdDrinkAndMobile, onQuickAdd }) => {
    return (
        <button className="item-option-button" onClick={() => {
            if (isColdDrinkAndMobile) {
                onClick(item);
            } else {
                onClick(item);
            }
        }}>
            <img
                src={`${BACKEND_URL}${item.imageUrl}`}
                alt={item.name}
                className="item-option-image" />
            <div className="item-button-info">
            </div>
            {isColdDrinkAndMobile && (
                <button
                    className="quick-add-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onQuickAdd(item);
                    }}
                >
                    + Add
                </button>
            )}
        </button>
    );
};


// ADD isMobileView prop to OrderFoodOverlay
function OrderFoodOverlay({ contentType, onClose, isMobileView = false }) {
    const [allFoodItems, setAllFoodItems] = useState([]);
    const [loadingAllFoodItems, setLoadingAllFoodItems] = useState(true);
    const [allFoodItemsError, setAllFoodItemsError] = useState(null);

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

    // --- Determine if development message should be shown based on contentType AND isMobileView ---
    const showDevelopmentMessagesForCategory = useCallback(() => {
        if (contentType === 'hot_drinks') {
            return false;
        }
        if (contentType === 'cold_drinks') {
            return !isMobileView;
        }
        // Food and Combo are always under development
        return true;
    }, [contentType, isMobileView]);


    // Helper function to get the appropriate label for the overlay header
    const getLabelText = useCallback((type) => {
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
    }, [customizedDrink]);

    // Function to handle clicking on an item button
    const handleItemClick = useCallback((itemDetails) => {
        setQuantity(1);
        setSelectedFlavor(null);

        if (itemDetails.category === 'hot_drinks') {
            setCustomizedDrink(itemDetails);
            setSelectedSize(optionsData.sizes.find(s => s.name === 'Medium') || optionsData.sizes[0]);
            setSelectedMilk(optionsData.milks.find(m => m.name === 'Full cream') || optionsData.milks[0]);
            setSelectedStrength(optionsData.strengths.find(s => s.name === 'Single Shot') || optionsData.strengths[0]);
        } else if (itemDetails.category === 'cold_drinks' && isMobileView) {
            setCustomizedDrink(itemDetails);
        } else {
            console.log(`Clicked on ${itemDetails.name} (${itemDetails.category}). No specific action defined.`);
        }
    }, [optionsData, isMobileView]);

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

    // Calculate total price for the customized drink or simple item
    const calculateTotalPrice = useCallback(() => {
        if (!customizedDrink) return (0).toFixed(2);

        let price = customizedDrink.price || 0;

        // Apply customization only if it's a hot drink
        if (customizedDrink.category === 'hot_drinks') {
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
        }

        return (price * quantity).toFixed(2);
    }, [customizedDrink, selectedSize, quantity, selectedMilk, selectedStrength, selectedFlavor]);

    const handleAddToCart = useCallback(() => {
        if (!customizedDrink) return;

        // You would typically send this data to a global state, context, or an API
        console.log("Adding to cart:", {
            itemId: customizedDrink._id,
            name: customizedDrink.name,
            category: customizedDrink.category,
            quantity: quantity,
            // Customization details only for hot drinks
            ...(customizedDrink.category === 'hot_drinks' && {
                size: selectedSize ? selectedSize.name : 'N/A',
                milk: selectedMilk ? selectedMilk.name : 'N/A',
                strength: selectedStrength ? selectedStrength.name : 'N/A',
                flavor: selectedFlavor ? selectedFlavor.name : 'N/A',
            }),
            totalPrice: calculateTotalPrice(),
        });
        setCustomizedDrink(null);
        setQuantity(1);
    }, [customizedDrink, quantity, selectedSize, selectedMilk, selectedStrength, selectedFlavor, calculateTotalPrice]);


    // Render the customization section
    const renderCustomizationSection = () => {
        if (!customizedDrink) return null;

        // Hot drinks have full customization
        const isHotDrink = customizedDrink.category === 'hot_drinks';
        const isColdDrink = customizedDrink.category === 'cold_drinks';

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

                        {isHotDrink && (
                            <>
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
                            </>
                        )}

                        {/* Quantity, Edit, Delete Controls - always available for any selected item */}
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

                {isHotDrink && (
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
                )}


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

        const showDevMsgForCurrentCategory = showDevelopmentMessagesForCategory();

        return (
            <>
                {/* Display the "Under Development" message based on the new logic */}
                {showDevMsgForCurrentCategory ? (
                    <div className="development-messages-container">
                        <p className="under-development-message">Under Development: </p>
                        {contentType === 'cold_drinks' && !isMobileView && (
                            <p className="unavailable-specific-message">Cold drink orders are not available on our website, please check out our app.</p>
                        )}
                        {(contentType === 'food' || contentType === 'combo') && (
                            <p className="unavailable-specific-message">This category is not yet available for online ordering. Please order at the counter.</p>
                        )}
                    </div>
                ) : (
                    // Only render grid if NOT showing development message
                    itemsToDisplay.length > 0 ? (
                        <div className="item-options-grid">
                            {itemsToDisplay.map(item => (
                                <ItemButton
                                    key={item._id || item.name}
                                    item={item}
                                    onClick={handleItemClick}
                                    isColdDrinkAndMobile={item.category === 'cold_drinks' && isMobileView}
                                    onQuickAdd={(itemToQuickAdd) => {
                                        console.log("Quick adding:", itemToQuickAdd.name);
                                        handleAddToCart({ ...itemToQuickAdd, quantity: 1, customizedDrink: null });
                                        onClose();
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
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
                </div>

                <div className="overlay-items-container">
                    {/* Render customization if a drink is selected for it, otherwise render category grid */}
                    {customizedDrink ? (
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