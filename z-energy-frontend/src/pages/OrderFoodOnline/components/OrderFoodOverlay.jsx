
import React, { useEffect } from 'react';
import './OrderFoodOverlay.css';

import zLogoImage from '/Z-Logo.png';

import itemLongBlack from './images/LongBlack.png';
import itemShortBlack from './images/ShortBlack.png';
import itemGingerBreadLatte from './images/GingerBreadLatte.png';
import itemFluffy from './images/Fluffy.png';
import itemMochachino from './images/Mochaccino.png';
import itemLemonGingerHoney from './images/LemonGingerHoney.png';
import itemFlatWhite from './images/FlatWhite.png';
import itemMatchaLatte from './images/MatchaLatte.png';
import itemCappuccino from './images/Cappuccino.png';
import itemHotChocolate from './images/HotChocolate.png';
import itemLatte from './images/Latte.png';
import itemChaiLatte from './images/ChaiLatte.png';

function OrderFoodOverlay({ contentType, onClose }) {
    const getLabelText = (type) => {
        switch (type) {
            case 'hot_drinks':
                return 'Select hot drink:';
            case 'cold_drinks':
                return 'Select Cold Drink:';
            case 'food':
                return 'Select Food Item:';
            case 'combo':
                return 'Select Combo:';
            default:
                return 'Select Item:';
        }
    };

    // Helper function to render specific items based on selection
    const renderSpecificItems = (type) => {
        switch (type) {
            case 'hot_drinks':
                return (
                    <div className="item-options-grid">
                        <button className="item-option-button">
                            <img src={itemLongBlack} alt="Long Black" className="item-option-image" />
                            <p className="item-option-label">Long Black</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemShortBlack} alt="Short Black" className="item-option-image" />
                            <p className="item-option-label">Short Black</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemGingerBreadLatte} alt="Ginger Bread Latte" className="item-option-image" />
                            <p className="item-option-label">Ginger Bread Latte</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemFluffy} alt="Fluffy" className="item-option-image" />
                            <p className="item-option-label">Fluffy</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemMochachino} alt="Mochachino" className="item-option-image" />
                            <p className="item-option-label">Mochachino</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemLemonGingerHoney} alt="Lemon Ginger Honey" className="item-option-image" />
                            <p className="item-option-label">Lemon Ginger Honey</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemFlatWhite} alt="Flat White" className="item-option-image" />
                            <p className="item-option-label">Flat White</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemMatchaLatte} alt="Matcha Latte" className="item-option-image" />
                            <p className="item-option-label">Matcha Latte</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemCappuccino} alt="Cappuccino" className="item-option-image" />
                            <p className="item-option-label">Cappuccino</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemHotChocolate} alt="Hot Chocolate" className="item-option-image" />
                            <p className="item-option-label">Hot Chocolate</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemLatte} alt="Latte" className="item-option-image" />
                            <p className="item-option-label">Latte</p>
                        </button>
                        <button className="item-option-button">
                            <img src={itemChaiLatte} alt="Chai Latte" className="item-option-image" />
                            <p className="item-option-label">Chai Latte</p>
                        </button>
                    </div>
                );
            case 'cold_drinks':
                return <p className="placeholder-text">Cold drinks options coming soon!</p>;
            case 'food':
                return <p className="placeholder-text">Food options coming soon!</p>;
            case 'combo':
                return <p className="placeholder-text">Combo options coming soon!</p>;
            default:
                return null;
        }
    };

    return (
        // Main overlay container for the semi-transparent background
        <div className="order-food-overlay" onClick={onClose}>
            <div className="overlay-content-box" onClick={(e) => e.stopPropagation()}>
                <button className="overlay-close-button" onClick={onClose}>×</button>

                {/* Header frame for Z logo and label */}
                <div className="overlay-header-frame">
                    <img src={zLogoImage} alt="Z Energy Logo" className="overlay-logo" />
                    <p className="overlay-label">{getLabelText(contentType)}</p>
                </div>

                {/* Content area for specific items (e.g., hot drinks grid) */}
                <div className="overlay-items-container">
                    {renderSpecificItems(contentType)}
                </div>
            </div>
        </div>
    );
}

export default OrderFoodOverlay;