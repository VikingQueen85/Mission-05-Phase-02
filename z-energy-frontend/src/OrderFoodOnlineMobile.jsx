

import React, { useState } from 'react';
import './OrderFoodOnlineMobile.css';

import mobileFrameImage from '../src/components/images/MobileFrame.png';
import mobileBannerImage from '../src/components/images/MobileBanner.png'
import mobileMainImage from '../src/components/images/MobileMain.png'
import mobileFooterImage from '../src/components/images/MobileFooter.png'
import whiteBoxBackground from '../src/components/images/WhiteBoxBackground.png'
import whiteRectangleBackground from '../src/components/images/WhiteRectangleBackground.png'
import mobileHotDrinkIcon from '../src/components/images/MobileHotDrinkIcon.png'
import mobileFoodIcon from '../src/components/images/MobileFoodIcon.png'
import mobileVegeLeafIcon from '../src/components/images/MobileVegeLeafIcon.png'
import orderColdDrinksImage from '../src/components/images/OrderColdDrinks.png'
import zLogo from '../public/Z-Logo-2.png';

function OrderFoodOnlineMobile() {
    return (
        <div className="mobile-order-food-container">
            <div className="mobile-top-frame" style={{ backgroundImage: `url(${mobileFrameImage})` }}></div>

            {/* Main Banner Section - */}
            <div className="mobile-main-banner-section" style={{ backgroundImage: `url(${mobileBannerImage})` }}>
                <div className="banner-text-overlay">
                    <img src={zLogo} alt="Z Logo" className="banner-logo" />
                    <div className="banner-text">Your Coffee, Your Way - Ready When You Are!</div>
                </div>
            </div>

            <div className="mobile-main-content-section" style={{ backgroundImage: `url(${mobileMainImage})` }}>
                <div className="main-content-image-text-overlay">
                    <div className="main-content-text">"Fuel up on the go with locally sourced pies, veggie options, and your favourite coffee - all just a tap away."</div>
                </div>

                {/* NEW: Container for the 4 white boxes */}
                <div className="white-boxes-container">
                    <div className="white-box hot-drinks-box" style={{ backgroundImage: `url(${whiteBoxBackground})` }}>
                        <img src={mobileHotDrinkIcon} alt="Hot Drink Icon" className="hot-drink-icon" />
                        <div className="hot-drink-text">
                            <span>Order</span>
                            <span>Hot</span>
                            <span>Drinks</span>
                        </div>
                    </div>

                    <div className="white-box cold-drinks-box" style={{ backgroundImage: `url(${whiteBoxBackground})` }}>
                        <img src={orderColdDrinksImage} alt="Order Cold Drinks" className="cold-drinks-image" />
                    </div>
                    
                    <div className="white-box hot-food-box" style={{ backgroundImage: `url(${whiteBoxBackground})` }}>
                        <img src={mobileFoodIcon} alt="Hot Food Icon" className="hot-food-icon" />
                        <div className="hot-food-text">
                            <span>Grab</span>
                            <span>some</span>
                            <span>food</span>
                        </div>
                    </div>
                    
                    <div className="white-box food-icons-box" style={{ backgroundImage: `url(${whiteBoxBackground})` }}>
                        <img src={mobileVegeLeafIcon} alt="Vegetarian Leaf Icon" className="vege-leaf-icon" />
                        <img src={mobileFoodIcon} alt="Food Icon" className="food-icon" />
                        <div className="vege-text">
                            <span>Vege</span>
                            <span>options</span>
                        </div>
                    </div>
                </div>

                {/* Larger white rectangle underneath */}
                <div className="white-rectangle combo-rectangle" style={{ backgroundImage: `url(${whiteRectangleBackground})` }}>
                    <div className="combo-text">
                        <span>Make it a</span>
                        <span>COMBO</span>
                    </div>
                    <img src={mobileFoodIcon} alt="Hot Food Icon" className="combo-food-icon" />
                    <img src={mobileHotDrinkIcon} alt="Hot Drink Icon" className="combo-hot-drink-icon" />
                </div>
            </div>

            <div className="mobile-footer-section" style={{ backgroundImage: `url(${mobileFooterImage})`}}></div>
        </div>
    );
}

export default OrderFoodOnlineMobile;