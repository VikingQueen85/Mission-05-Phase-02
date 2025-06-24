import { Link } from "react-router-dom"
import styles from "./Header.module.css"

// Image Import Paths
import zLogo from "../assets/images/Z-Logo.png"
import cart from "../assets/icons/cart.png"
import search from "../assets/icons/search.png"
import arrowForward from "../assets/icons/arrow-forward.png"

const Header = () => {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerTopBand}>
        <div className={styles.headerTopLeft}>
          <Link to="/" className={styles.zLogoLink}>
            <img src={zLogo} alt="Z Energy Logo" className={styles.zLogo} />
          </Link>
          <button
            className={`${styles.headerButton} ${styles.orangeGradientButton}`}>
            For Personal
          </button>
        </div>
        <nav className={styles.headerTopRightNav}>
          <ul>
            <li>
              <Link to="/z-app">Z App</Link>
            </li>
            <li>
              <Link to="/about-z">About Z</Link>
            </li>
            <li>
              <Link to="/cart" className={styles.headerIconLink}>
                <img src={cart} alt="cart-button" />
              </Link>
            </li>
            <li>
              <Link to="/search" className={styles.headerIconLink}>
                <img src={search} alt="search-button" />
              </Link>
            </li>
            <li className={styles.headerLoginButton}>
              <Link
                to="/login"
                className={`${styles.headerButton} ${styles.loginButton}`}>
                Login
              </Link>
              <img src={arrowForward} alt="arrow forward" />
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.headerThinDivider}></div>

      <div className={styles.headerBottomNavRow}>
        <nav className={styles.headerBottomLeftNav}>
          <ul>
            <li>
              <Link to="/how-to-enjoy-Z-station">How to enjoy Z station</Link>
            </li>
            <li>
              <Link to="/rewards">Rewards and promotions</Link>
            </li>
            <li>
              <Link to="/locations">Locations</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
