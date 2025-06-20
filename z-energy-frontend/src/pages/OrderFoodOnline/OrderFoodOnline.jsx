
import React, { useState } from 'react';
import './OrderFoodOnline.css';
import OrderFoodOverlay from './components/OrderFoodOverlay';

// Main page image imports
import orderFoodBannerImage from './components/images/Order-Food-Banner.png';
import zWebsiteFoodImage from './components/images/Z-Website-Food-Image.png';
import preOrderImage1 from './components/images/HotDrinks.png';
import preOrderImage2 from './components/images/ColdDrinks.png';
import preOrderImage3 from './components/images/Food.png';
import preOrderImage4 from './components/images/MakeItACombo.png';

function OrderFoodOnline() {
    // State to control overlay visibility and content type
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayContentType, setOverlayContentType] = useState('');

    // Function to handle clicks on the four main food images
    const handleImageClick = (type) => {
        setOverlayContentType(type);
        setShowOverlay(true);
    };

    // Function to close the overlay
    const handleCloseOverlay = () => {
        setShowOverlay(false);
        setOverlayContentType('');
    };

    return (
        <div className="order-food-online-container">
            <div className="order-food-banner-section" style={{ backgroundImage: `url(${orderFoodBannerImage})` }}>
            </div>

            <div className="order-food-content">
                <div className="order-food-text-wrapper">
                    <h2 className="content-heading">Fuel up more than just your car!</h2>
                    <p className="content-description">
                        Our gas stations offer a delicious range of freshly prepared food and snacks, perfect for busy families and people on the go.
                        <br />
                        <br />
                        Whether you’re grabbing breakfast, a quick lunch, or a treat for the road, our convenient, high-quality options ensure you stay energized and satisfied wherever your journey takes you.
                        <br />
                        <br />
                        Stop in today and enjoy food that’s ready when you are!
                    </p>
                    <button className="find-z-station-button">Find your nearest Z Station</button>
                </div>

                <img src={zWebsiteFoodImage} alt="Delicious food" className="order-food-floating-image" />
            </div>

            <div className="pre-order-message-section">
                <h2>Pre-Order Online – Skip the Queue and Save Time!</h2>
            </div>

            <section className="pre-order-images-container">
                {/* Clickable buttons for each main food category */}
                <button className="pre-order-image-button" onClick={() => handleImageClick('hot_drinks')}>
                    <img src={preOrderImage1} alt="Hot Drinks" className="pre-order-image" />
                </button>
                <button className="pre-order-image-button" onClick={() => handleImageClick('cold_drinks')}>
                    <img src={preOrderImage2} alt="Cold Drinks" className="pre-order-image" />
                </button>
                <button className="pre-order-image-button" onClick={() => handleImageClick('food')}>
                    <img src={preOrderImage3} alt="Food Items" className="pre-order-image" />
                </button>
                <button className="pre-order-image-button" onClick={() => handleImageClick('combo')}>
                    <img src={preOrderImage4} alt="Make It A Combo" className="pre-order-image" />
                </button>
            </section>

            {showOverlay && (
                <div className="inline-overlay-wrapper">
                    <OrderFoodOverlay
                        contentType={overlayContentType}
                        onClose={handleCloseOverlay}
                    />
                </div>
            )}
        </div>
    );
}

export default OrderFoodOnline;