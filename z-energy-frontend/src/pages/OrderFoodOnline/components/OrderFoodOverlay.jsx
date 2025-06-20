
import React, { useState, useEffect } from 'react';
import './OrderFoodOverlay.css';
import ItemDetailOverlay from './ItemDetailOverlay.jsx';

import zLogoImage from '/Z-Logo.png';
import itemLongBlack from './images/LongBlack.png';
import itemShortBlack from './images/ShortBlack.png';
import itemGingerBreadLatte from './images/GingerBreadLatte.png';
import itemFluffy from './images/Fluffy.png';
import itemMochaccino from './images/Mochaccino.png';
import itemLemonGingerHoney from './images/LemonGingerHoney.png';
import itemFlatWhite from './images/FlatWhite.png';
import itemMatchaLatte from './images/MatchaLatte.png';
import itemCappuccino from './images/Cappuccino.png';
import itemHotChocolate from './images/HotChocolate.png';
import itemLatte from './images/Latte.png';
import itemChaiLatte from './images/ChaiLatte.png';

function OrderFoodOverlay({ contentType, onClose }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showItemDetail, setShowItemDetail] = useState(false);
    const [allFoodItems, setAllFoodItems] = useState([]);

    // --- Fetch ALL food items ONCE when the component mounts ---
    useEffect(() => {
        const fetchAllFoodItems = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/fooditems`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllFoodItems(data);
            } catch (err) {
                console.error("Failed to fetch all food items:", err);
            }
        };

        fetchAllFoodItems();
    }, []);

    const getLabelText = (type) => {
        switch (type) {
            case 'hot_drinks': return 'Select hot drink:';
            case 'cold_drinks': return 'Select Cold Drink:';
            case 'food': return 'Select Food Item:';
            case 'combo': return 'Select Combo:';
            default: return 'Select Item:';
        }
    };

    // New: Function to handle opening the detail overlay
    const handleItemClick = (itemName) => {
        const itemDetails = allFoodItems.find(item => item.name === itemName);

        if (itemDetails) {
            setSelectedItem(itemDetails);
            setShowItemDetail(true);
        } else {
            console.warn(`Details for ${itemName} not found in fetched data.`);
        }
    };

    // New: Function to close the detail overlay
    const handleCloseItemDetail = () => {
        setSelectedItem(null);
        setShowItemDetail(false);
    };

    // Helper function to render specific items based on selection
    const renderSpecificItems = (type) => {
        switch (type) {
            case 'hot_drinks':
                return (
                    <div className="item-options-grid">
                        <button className="item-option-button" onClick={() => handleItemClick("Long Black")}>
                            <img src={itemLongBlack} alt="Long Black" className="item-option-image" />
                            <p className="item-option-label">Long Black</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Short Black")}>
                            <img src={itemShortBlack} alt="Short Black" className="item-option-image" />
                            <p className="item-option-label">Short Black</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Ginger Bread Latte")}>
                            <img src={itemGingerBreadLatte} alt="Ginger Bread Latte" className="item-option-image" />
                            <p className="item-option-label">Ginger Bread Latte</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Fluffy")}>
                            <img src={itemFluffy} alt="Fluffy" className="item-option-image" />
                            <p className="item-option-label">Fluffy</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Mochaccino")}>
                            <img src={itemMochaccino} alt="Mochaccino" className="item-option-image" />
                            <p className="item-option-label">Mochaccino</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Lemon Ginger Honey")}>
                            <img src={itemLemonGingerHoney} alt="Lemon Ginger Honey" className="item-option-image" />
                            <p className="item-option-label">Lemon Ginger Honey</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Flat White")}>
                            <img src={itemFlatWhite} alt="Flat White" className="item-option-image" />
                            <p className="item-option-label">Flat White</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Matcha Latte")}>
                            <img src={itemMatchaLatte} alt="Matcha Latte" className="item-option-image" />
                            <p className="item-option-label">Matcha Latte</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Cappuccino")}>
                            <img src={itemCappuccino} alt="Cappuccino" className="item-option-image" />
                            <p className="item-option-label">Cappuccino</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Hot Chocolate")}>
                            <img src={itemHotChocolate} alt="Hot Chocolate" className="item-option-image" />
                            <p className="item-option-label">Hot Chocolate</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Latte")}>
                            <img src={itemLatte} alt="Latte" className="item-option-image" />
                            <p className="item-option-label">Latte</p>
                        </button>
                        <button className="item-option-button" onClick={() => handleItemClick("Chai Latte")}>
                            <img src={itemChaiLatte} alt="Chai Latte" className="item-option-image" />
                            <p className="item-option-label">Chai Latte</p>
                        </button>
                    </div>
                );
            case 'cold_drinks':
                const coldDrinks = allFoodItems.filter(item => item.category === 'cold_drinks');
                if (coldDrinks.length === 0) return <p className="placeholder-text">Cold drinks options coming soon!</p>;
                return (
                    <div className="item-options-grid">
                        {coldDrinks.map(item => (
                            <button key={item._id} className="item-option-button" onClick={() => handleItemClick(item.name)}>
                                <img src={item.imageUrl} alt={item.name} className="item-option-image" />
                                <p className="item-option-label">{item.name}</p>
                            </button>
                        ))}
                    </div>
                );
            case 'food':
                const foodItems = allFoodItems.filter(item => item.category === 'food');
                if (foodItems.length === 0) return <p className="placeholder-text">Food options coming soon!</p>;
                return (
                    <div className="item-options-grid">
                        {foodItems.map(item => (
                            <button key={item._id} className="item-option-button" onClick={() => handleItemClick(item.name)}>
                                <img src={item.imageUrl} alt={item.name} className="item-option-image" />
                                <p className="item-option-label">{item.name}</p>
                            </button>
                        ))}
                    </div>
                );
            case 'combo':
                return <p className="placeholder-text">Combo options coming soon!</p>;
            default:
                return null;
        }
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
                    {renderSpecificItems(contentType)}
                </div>
            </div>

            {/* Render the ItemDetailOverlay conditionally */}
            {showItemDetail && (
                <ItemDetailOverlay item={selectedItem} onClose={handleCloseItemDetail} />
            )}
        </div>
    );
}

export default OrderFoodOverlay;