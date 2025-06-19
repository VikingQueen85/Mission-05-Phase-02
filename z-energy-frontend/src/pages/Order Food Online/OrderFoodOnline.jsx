
import React from 'react';
import './OrderFoodOnline.css';

function OrderFoodOnline() {
    const bannerHomePagePath = '/Order-Food-Banner.webp';
    const orderFoodWebpPath = '/ZWebsite Food Image.webp';

    return (
        <div className="order-food-online-container">
            <div className="order-food-banner-section" style={{ backgroundImage: `url(${bannerHomePagePath})` }}>
        </div>

            {/* Main content area */}
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
                    <button className="find-z-station-button">Find your nearest Z Station</button>"
                </div>
                {/* Floating Image */}
                <img src={orderFoodWebpPath} alt="Delicious food" className="order-food-floating-image" />
            </div>

            {/* Menu Categories section */}
            <div className="pre-order-message-section">
                <h2>Pre-Order Online - Skip the Queue and Save Time!</h2>
            </div>
        </div>
    );
}

export default OrderFoodOnline;