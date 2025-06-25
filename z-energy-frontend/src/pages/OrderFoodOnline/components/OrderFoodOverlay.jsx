
import React, { useState, useEffect, useCallback } from 'react';
import './OrderFoodOverlay.css';
import ItemDetailOverlay from './ItemDetailOverlay.jsx';
import zLogoImage from '../../../assets/images/Z-Logo.png';

// Helper Component for a clickable item button
const ItemButton = ({ item, onClick }) => {
    return (
        <button className="item-option-button" onClick={() => onClick(item.name)}>
            <img src={item.imageUrl} alt={item.name} className="item-option-image" />
            <p className="item-option-label">{item.name}</p>
        </button>
    );
};

function OrderFoodOverlay({ contentType, onClose }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showItemDetail, setShowItemDetail] = useState(false);
    const [allFoodItems, setAllFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Fetch ALL food items ONCE when the component mounts ---
    useEffect(() => {
        const fetchAllFoodItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3000/api/fooditems`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllFoodItems(data);
            } catch (err) {
                console.error("Failed to fetch all food items:", err);
                setError("Failed to load items. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllFoodItems();
    }, []);

    // Helper function to get the appropriate label for the overlay header
    const getLabelText = (type) => {
        switch (type) {
            case 'hot_drinks': return 'Select Hot Drink:';
            case 'cold_drinks': return 'Select Cold Drink:';
            case 'food': return 'Select Food Item:';
            case 'combo': return 'Select Combo:';
            default: return 'Select Item:';
        }
    };

    // Function to handle opening the detail overlay when an item button is clicked
    const handleItemClick = useCallback((itemName) => {
        const itemDetails = allFoodItems.find(item => item.name === itemName);

        if (itemDetails) {
            setSelectedItem(itemDetails);
            setShowItemDetail(true);
        } else {
            console.warn(`Details for ${itemName} not found in fetched data.`);
        }
    }, [allFoodItems]);

    // Function to close the detail overlay
    const handleCloseItemDetail = useCallback(() => {
        setSelectedItem(null);
        setShowItemDetail(false);
    }, []);

    const renderItemsByCategory = () => {
        const filteredItems = allFoodItems.filter(item => item.category === contentType);

        if (loading) {
            return <p className="loading-text">Loading items...</p>;
        }

        if (error) {
            return <p className="error-text">{error}</p>;
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
                    {/* Dynamic label based on the content type */}
                    <p className="overlay-label">{getLabelText(contentType)}</p>
                </div>

                <div className="overlay-items-container">
                    {renderItemsByCategory()}
                </div>
            </div>

            {showItemDetail && (
                <ItemDetailOverlay item={selectedItem} onClose={handleCloseItemDetail} />
            )}
        </div>
    );
}

export default OrderFoodOverlay;