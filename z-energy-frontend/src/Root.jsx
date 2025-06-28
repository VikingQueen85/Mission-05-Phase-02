import React, { useState, useEffect } from "react";
import App from "./App.jsx";
import MobileApp from "./MobileApp.jsx";

function Root() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|windows phone/i;
    const isMobileUA = mobileRegex.test(userAgent.toLowerCase());
    
    // Check if the browser supports userAgentData and if it indicates a mobile device
    const isMobileUAData = navigator.userAgentData?.mobile ?? false;

    const isMobile = isMobileUA || isMobileUAData;

    console.log("UserAgent:", userAgent);
    console.log("isMobileUA:", isMobileUA);
    console.log("isMobileUAData:", isMobileUAData);
    console.log("Final isMobileDevice:", isMobile);

    setIsMobileDevice(isMobile);
  }, []);

  return isMobileDevice ? <MobileApp /> : <App />;
}

export default Root;
