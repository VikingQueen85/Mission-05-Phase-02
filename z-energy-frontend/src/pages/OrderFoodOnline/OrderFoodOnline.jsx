
import React from 'react';
import './OrderFoodOnline.css';
import orderFoodBannerImage from './components/images/Order-Food-Banner.png';
import zWebsiteFoodImage from './components/images/Z-Website-Food-Image.png';
import preOrderImage1 from './components/images/HotDrinksCropped.png';
import preOrderImage2 from './components/images/ColdDrinks.png';
import preOrderImage3 from './components/images/Food.png';
import preOrderImage4 from './components/images/MakeItACombo.png';

function OrderFoodOnline() {
    return (
        <div className="order-food-online-container">
            <div className="order-food-banner-section" style={{ backgroundImage: `url(${orderFoodBannerImage})` }}>
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

            <section className="pre-order-images-container">
                <div className="pre-order-image-item">
                    <img src={preOrderImage1} alt="Hot Drinks" className="pre-order-image" />
                </div>
                <div className="pre-order-image-item">
                    <img src={preOrderImage2} alt="Cold Drinks" className="pre-order-image" />
                </div>
                <div className="pre-order-image-item">
                    <img src={preOrderImage3} alt="Food Items" className="pre-order-image" />
                </div>
                <div className="pre-order-image-item">
                    <img src={preOrderImage4} alt="Make It A Combo" className="pre-order-image" />
                </div>
            </section>

        </div>
    );
}

export default OrderFoodOnline;