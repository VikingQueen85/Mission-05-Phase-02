
import React, { useState } from 'react';
import './OrderFoodOnlineMobile.css';

import mobileFrameImage from '../src/components/images/MobileFrame.png';
import mobileBannerImage from '../src/components/images/MobileBanner.png'
import mobileMainImage from '../src/components/images/MobileMain.png'
import mobileFooterImage from '../src/components/images/MobileFooter.png'

function OrderFoodOnlineMobile() {
    return (
        <div className="mobile-order-food-container">
            <div className="mobile-top-frame" style={{ backgroundImage: `url(${mobileFrameImage})` }}></div>
            <div className="mobile-main-banner-section" style={{ backgroundImage: `url(${mobileBannerImage})` }}></div>
            <div className="mobile-main-content-section" style={{ backgroundImage: `url(${mobileMainImage})`}}></div>
            <div className="mobile-footer-section" style={{ backgroundImade: `url(${mobileFooterImage})`}}></div>
        </div>
    )
}

export default OrderFoodOnlineMobile;