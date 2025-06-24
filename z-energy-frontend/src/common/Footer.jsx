import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.mainFooter}>
      <p className={styles.footerText}>
        &copy; 2025 Z Petrol App. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
