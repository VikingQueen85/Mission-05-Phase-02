
import React from 'react';
import './OrderFoodOnline.css';
import orderFoodBannerImage from './components/images/Order-Food-Banner.png';
import zWebsiteFoodImage from './components/images/Z-Website-Food-Image.png';

function OrderFoodOnline() {
    return (
        <div className="order-food-online-container">
            <div className="order-food-banner-section" style={{ backgroundImage: `url(${orderFoodBannerImage})` }}>
                <div className="order-food-banner-text">Order Food Online</div>
            </div>

            {/* Main content area: This section contains the text and the floating image. */}
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

                {/* Floating Image: Using the imported image variable */}
                <img src={zWebsiteFoodImage} alt="Delicious food" className="order-food-floating-image" />
            </div>

            {/* Pre-Order Online message section */}
            <div className="pre-order-message-section">
                <h2>Pre-Order Online – Skip the Queue and Save Time!</h2>
            </div>
        </div>
    );
}

export default OrderFoodOnline;