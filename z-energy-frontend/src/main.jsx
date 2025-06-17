
import React from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import Root from "./Root.jsx";
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);