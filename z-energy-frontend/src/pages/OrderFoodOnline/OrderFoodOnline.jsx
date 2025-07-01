
import React, { useState } from 'react';
import './OrderFoodOnline.css';
import OrderFoodOverlay from './components/OrderFoodOverlay';
import { useViewportSize} from '../../hooks/useViewportSize'
import OrderFoodOnlineMobile from './OrderFoodOnlineMobile'

import orderFoodBannerImage from '../../assets/images/Order-Food-Banner.png';
import zWebsiteFoodImage from '../../assets/images/Z-Website-Food-Image.png';
import preOrderImage1 from '../../assets/images/HotDrinks.png';
import preOrderImage2 from '../../assets/images/ColdDrinks.png';
import preOrderImage3 from '../../assets/images/Food.png';
import preOrderImage4 from '../../assets/images/MakeItACombo.png';

function OrderFoodOnline() {
    const { isMobile } = useViewportSize();
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayContentType, setOverlayContentType] = useState('');

    if (isMobile) {
        return <OrderFoodOnlineMobile />;
    }

    // Handle clicks on main food images to open overlay with specific content
    const handleImageClick = (type) => {
        setOverlayContentType(type);
        setShowOverlay(true);
    };

    // Close the overlay and reset content type
    const handleCloseOverlay = () => {
        setShowOverlay(false);
        setOverlayContentType('');
    };

    return (
        <div className="order-food-online-container">
            {/* Banner Section with background image */}
            <div
                className="order-food-banner-section"
                style={{ backgroundImage: `url(${orderFoodBannerImage})` }}
            >
            </div>

            {/* Main Content Section */}
            <div className="order-food-content-section">
                {/* Text Wrapper */}
                <div className="order-food-text-wrapper">
                    <h2 className="content-heading">Fuel up more than just your car!</h2>
                    <p className="content-description">
                        Our gas stations offer a delicious range of freshly prepared food and snacks, perfect for busy families and people on the go.
                        <br /><br />
                        Whether you’re grabbing breakfast, a quick lunch, or a treat for the road, our convenient, high-quality options ensure you stay energized and satisfied wherever your journey takes you.
                        <br /><br />
                        Stop in today and enjoy food that’s ready when you are!
                    </p>
                    <button className="find-z-station-button">Find your nearest Z Station</button>
                </div>

                {/* Floating image to the right */}
                <img
                    src={zWebsiteFoodImage}
                    alt="Delicious food"
                    className="order-food-floating-image"
                />
            </div>

            {/* Pre-Order Message Section */}
            <div className="pre-order-message-section">
                <h2>Pre-Order Online – Skip the Queue and Save Time!</h2>
            </div>

            {/* Pre-Order Images Container */}
            <section className="pre-order-images-container">
                {[
                    { type: 'hot_drinks', src: preOrderImage1, alt: 'Hot Drinks' },
                    { type: 'cold_drinks', src: preOrderImage2, alt: 'Cold Drinks' },
                    { type: 'food', src: preOrderImage3, alt: 'Food Items' },
                    { type: 'combo', src: preOrderImage4, alt: 'Make It A Combo' },
                ].map((item, index) => (
                    <button
                        key={index}
                        className="pre-order-image-button"
                        onClick={() => handleImageClick(item.type)}
                    >
                        <img src={item.src} alt={item.alt} className="pre-order-image" />
                    </button>
                ))}
            </section>

            {/* Overlay for order content */}
            {showOverlay && (
                <div className="overlay-fixed-wrapper">
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