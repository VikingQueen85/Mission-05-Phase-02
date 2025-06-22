
import React from 'react';
import './ItemDetailOverlay.css';

function ItemDetailOverlay({ item, onClose }) {
    if (!item) return null;

    return (
        <div className="item-detail-overlay" onClick={onClose}>
            <div className="item-detail-content-box" onClick={(e) => e.stopPropagation()}>
                <button className="overlay-close-button" onClick={onClose}>×</button>

                {/* Header section with image and name */}
                <div className="item-detail-header">
                    <img src={item.imageUrl} alt={item.name || 'Food Item'} className="item-detail-image" />
                    <h2>{item.name}</h2>
                </div>

                {/* Body section with price and description */}
                <div className="item-detail-body">
                    <p className="item-detail-price">${item.price ? item.price.toFixed(2) : 'N/A'}</p>
                    {item.description && <p className="item-detail-description">{item.description}</p>}
                    {/* You could add quantity selectors or "Add to Cart" buttons here later */}
                </div>

                {/* Example of a button you might add later for ordering */}
                {/* <button className="add-to-cart-button">Add to Cart</button> */}
            </div>
        </div>
    );
}

export default ItemDetailOverlay;