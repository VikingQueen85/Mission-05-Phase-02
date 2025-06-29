
import React from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import { BrowserRouter } from "react-router-dom"
import Root from './Root.jsx';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);