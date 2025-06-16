import React, { useState, useEffect } from "react";
import App from "./App.jsx";
import MobileApp from "./MobileApp.jsx";

function Root() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileApp /> : <App />;
}

export default Root;