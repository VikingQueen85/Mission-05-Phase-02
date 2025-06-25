
import { useState } from "react"
import "./OrderFoodOnlineMobile.css"

// Component Imports
import OrderFoodOverlay from "./components/OrderFoodOverlay"
import HotDrinksPage from "./components/HotDrinksPage"

// Image Imports
import mobileFrameImage from "../../assets/images/MobileFrame.png"
import mobileBannerImage from "../../assets/images/MobileBanner.png"
import mobileMainImage from "../../assets/images/MobileMain.png"
import mobileFooterImage from "../../assets/images/MobileFooter.png"
import whiteBoxBackground from "../../assets/images/WhiteBoxBackground.png"
import whiteRectangleBackground from "../../assets/images/WhiteRectangleBackground.png"
import mobileHotDrinkIcon from "../../assets/images/MobileHotDrinkIcon.png"
import mobileFoodIcon from "../../assets/images/MobileFoodIcon.png"
import mobileVegeLeafIcon from "../../assets/images/MobileVegeLeafIcon.png"
import orderColdDrinksImage from "../../assets/images/OrderColdDrinks.png"
import zLogo from "../../assets/images/Z-Logo-2.png"

function OrderFoodOnlineMobile() {
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayContentType, setOverlayContentType] = useState("")

  const handleCloseOverlay = () => {
    setShowOverlay(false)
    setOverlayContentType("")
  };

  const handleOrderHotDrinksClick = () => {
    setOverlayContentType("hotDrinks");
  };

  if (overlayContentType === "hotDrinks") {
    return (
      <HotDrinksPage onClose={handleCloseOverlay} />
    )
  }

  return (
    <div className="mobile-order-food-container">
      <div
        className="mobile-top-frame"
        style={{ backgroundImage: `url(${mobileFrameImage})` }}></div>

      {/* Main Banner Section */}
      <div
        className="mobile-main-banner-section"
        style={{ backgroundImage: `url(${mobileBannerImage})` }}>
        <div className="banner-text-overlay">
          <img src={zLogo} alt="Z Logo" className="banner-logo" />
          <div className="banner-text">
            Your Coffee, Your Way - Ready When You Are!
          </div>
        </div>
      </div>

      <div
        className="mobile-main-content-section"
        style={{ backgroundImage: `url(${mobileMainImage})` }}>
        <div className="main-content-image-text-overlay">
          <div className="main-content-text">
            Enjoy fresh and delicious options for your journey!
          </div>
        </div>

        {/* Container for the 4 white boxes */}
        <div className="white-boxes-container">
          {/* First white box with Hot Drinks content */}
          <div
            className="white-box hot-drinks-box"
            style={{ backgroundImage: `url(${whiteBoxBackground})` }}
            onClick={handleOrderHotDrinksClick}>
            <img
              src={mobileHotDrinkIcon}
              alt="Hot Drink Icon"
              className="hot-drink-icon"
            />
            <div className="hot-drink-text">
              <span>Order</span>
              <span>Hot</span>
              <span>Drinks</span>
            </div>
          </div>
          {/* Second white box with Cold Drinks content */}
          <div
            className="white-box cold-drinks-box"
            style={{ backgroundImage: `url(${whiteBoxBackground})` }}>
            <img
              src={orderColdDrinksImage}
              alt="Order Cold Drinks"
              className="cold-drinks-icon"
            />
          </div>
          {/* Third white box with hot food content */}
          <div
            className="white-box"
            style={{ backgroundImage: `url(${whiteBoxBackground})` }}>
            <img src={mobileFoodIcon} alt="Order Food" className="food-icon" />
            <div className="hot-food-text">
              <span>Grab</span>
              <span>some</span>
              <span>food</span>
            </div>
          </div>
          {/* Fourth white box with Food and Vege Leaf content */}
          <div
            className="white-box food-icons-box"
            style={{ backgroundImage: `url(${whiteBoxBackground})` }}>
            <img
              src={mobileVegeLeafIcon}
              alt="Vegetarian Leaf Icon"
              className="vege-leaf-icon"
            />
            <img src={mobileFoodIcon} alt="Food Icon" className="food-icon" />
            <div className="vege-text">
              <span>Vege</span>
              <span>options</span>
            </div>
          </div>
        </div>

        {/* Larger white rectangle underneath with "Make it a COMBO" and icons */}
        <div
          className="white-rectangle combo-rectangle"
          style={{ backgroundImage: `url(${whiteRectangleBackground})` }}>
          <div className="combo-text">
            <span>Make</span>
            <span>it a</span>
            <span>COMBO</span>
          </div>
          <img
            src={mobileFoodIcon}
            alt="Hot Food Icon"
            className="combo-food-icon"
          />
          <img
            src={mobileHotDrinkIcon}
            alt="Hot Drink Icon"
            className="combo-hot-drink-icon"
          />
        </div>
      </div>

      <div
        className="mobile-footer-section"
        style={{ backgroundImage: `url(${mobileFooterImage})` }}></div>

      {showOverlay && (
        <div className="mobile-inline-overlay-wrapper">
          <OrderFoodOverlay
            contentType={overlayContentType}
            onClose={handleCloseOverlay}
          />
        </div>
      )}
    </div>
  )
}

export default OrderFoodOnlineMobile;