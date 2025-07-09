
# Mission 5 Phase 2 Readme

This repository contains the complete codebase for the Z Petrol App, a comprehensive web application designed to enhance the customer experience at Z Energy stations. It provides functionalities for users to find stations, compare fuel prices, and conveniently order food and drinks online, with a responsive design that adapts to both desktop and mobile devices.

🌟 Key Features
The Z Petrol App offers a range of features to streamline the user experience:

Station Locator: Find Z Stations near you with an interactive map, current location detection, and a powerful search bar with autocomplete.

Detailed Station Information: View essential details for each station, including address, contact information, operating hours, and available services (fuel, food, car wash, ATM, etc.).

Fuel Price Comparison: Compare fuel prices across multiple Z Stations, allowing users to make informed decisions. Supports dynamic addition of stations for comparison on desktop.

Online Food & Drink Ordering:

Desktop Experience: Interactive overlays for hot drink customization (size, milk, strength, flavor) with real-time pricing. Other food categories indicate "under development."

Mobile Experience: Dedicated pages for each food and drink category, providing a native app-like ordering flow.

Responsive Design: The entire application dynamically adjusts its layout and functionality to provide an optimal user experience on both desktop and mobile devices.

Seamless Navigation: Comprehensive routing ensures smooth transitions between different sections of the application.

💻 Technology Stack
The Z Petrol App is built using a modern full-stack architecture:

Frontend:

React.js: For building dynamic and interactive user interfaces.

React Router DOM: For declarative routing and navigation.

Google Maps API (JavaScript API & Places API): For map display, location services, and search.

CSS Modules / Plain CSS: For styling.

Custom Hooks: For managing responsive design and other shared logic.

Backend:

Node.js: JavaScript runtime environment.

Express.js: Web application framework for building RESTful APIs.

MongoDB: NoSQL database for flexible data storage.

Mongoose: ODM for MongoDB.

CORS: For cross-origin resource sharing.

Dotenv: For environment variable management.

⚙️ Architecture Overview
The application follows a client-server architecture:

Frontend (React.js): Serves as the user interface, consuming data from the backend API. It handles user interactions, renders dynamic content, and manages client-side routing and responsiveness.

Backend (Node.js/Express.js): Provides a RESTful API that the frontend interacts with. It manages data storage in MongoDB, handles business logic, and serves static assets like images.

Database (MongoDB): Stores all application data, including station information, fuel prices, food items, and drink customization options. Initial data seeding is performed automatically upon backend server startup.

## Contributors

* **Tessa** - VikingQueen85
* **Sherelynn** - Sherelynn
* **Clark** - hiu03052

---

## ✨ My Contributions (Tessa - VikingQueen85)

As a key contributor to this project, my primary focus was on developing the **Order Food Online module**, encompassing both its intricate frontend user interface and the necessary backend API integrations.

### Frontend Contributions:

* **Core UI Development for Order Food Online:**
    * Designed and implemented the `OrderFoodOverlay.jsx` component, which serves as the central ordering interface for **desktop users**. This involved creating the dynamic grid for item selection and the detailed customization view for hot drinks.
    * Developed the mobile-specific pages: `ColdDrinksPage.jsx` and `HotDrinksPage.jsx`. These components provide an optimized, intuitive experience for mobile users, including quick-add functionality for cold drinks and adapted customization for hot drinks.
* **State Management & User Interaction:**
    * Implemented robust state management using React Hooks (`useState`, `useEffect`, `useCallback`) to handle item selection, quantity adjustments, and complex customization options (sizes, milks, strengths, flavors).
    * Ensured smooth user interactions through well-defined event handlers (`handleItemClick`, `handleSizeChange`, `handleAddToCart`, etc.) that provide immediate visual feedback and update pricing dynamically.
* **API Integration:** Integrated the frontend with backend endpoints to fetch all food items and crucial drink customization options (sizes, milks, strengths, and flavors), ensuring the UI displays up-to-date information and pricing.
* **Error Handling & User Feedback:** Implemented loading states and error messages for API calls to enhance user experience during data fetching.
* **Responsive Design Logic:** Contributed to ensuring the components adapt gracefully across different screen sizes, maintaining usability on both desktop and mobile devices.

### Backend Contributions:

* **API Endpoint Development:** Developed and maintained the necessary RESTful API endpoints for the `Order Food Online` module. This includes:
    * `/api/fooditems`: Endpoint to retrieve all available food and drink items, including their categories, names, prices, and image URLs.
    * `/api/drinkoptions/sizes`: Endpoint to fetch available drink sizes and their associated `extraCost`.
    * `/api/drinkoptions/milks`: Endpoint to fetch various milk types and their `extraCost`.
    * `/api/drinkoptions/strengths`: Endpoint to fetch coffee strength options and their `extraCost`.
    * `/api/drinkoptions/flavors`: Endpoint to fetch available flavor shots and their `extraCost`.
* **Data Handling:** Ensured that the backend correctly retrieves and serves the food item and drink option data from its underlying data source (e.g., a database).
* **API Robustness:** Implemented basic error handling within the API endpoints to provide meaningful responses to the frontend in case of data retrieval issues.

---

## Order Food Online Module

This module enables users to conveniently order food and drinks through both the Z-Energy website (desktop) and a dedicated mobile application. It focuses on providing a seamless and intuitive ordering experience, with specific considerations for each platform.

### Key Features:

#### Desktop Website (OrderFoodOverlay)
* **Interactive Menu Categories:** Users can browse through hot drinks, cold drinks, food, and combo categories.
* **Detailed Hot Drink Customization:** For hot beverages, customers can select various options including:
    * **Size:** Choose from available cup sizes (e.g., Small, Medium, Large) with associated pricing.
    * **Milk Type:** Select preferred milk options (e.g., Full Cream, Skim, Oat, Soy).
    * **Strength:** Adjust coffee strength (e.g., Single Shot, Double Shot).
    * **Flavor Shots:** Add optional flavor syrups.
    * **Dynamic Pricing:** The total price updates in real-time as customization options are selected.
* **Quantity Adjustment:** Users can easily modify the quantity of selected items.
* **"Under Development" Messaging:** Clear messages are displayed for categories (Cold Drinks, Food, Combos) not yet fully implemented on the desktop website, directing users to alternative ordering methods or the mobile app.

#### Mobile Application (ColdDrinksPage, HotDrinksPage)
* **Optimized Mobile Layout:** A distinct, user-friendly interface designed for smaller screens, featuring clear navigation and branding elements.
* **Dedicated Category Pages:** Instead of an overlay, selecting a category navigates to a new, dedicated page:
    * **`ColdDrinksPage`:** Allows for quick browsing and direct "quick-add" of cold drinks to the cart, streamlining the process for grab-and-go items.
    * **`HotDrinksPage`:** Provides a mobile-optimized experience for hot drink customization, similar to the desktop but adapted for touch interfaces.
* **Intuitive User Flow:** Designed to minimize taps and facilitate fast ordering on the go.

### Technical Implementation Highlights:

* **Frontend Components:**
    * `src/pages/OrderFoodOnline/components/OrderFoodOverlay.jsx`: Manages the desktop ordering interface, including item display and hot drink customization.
    * `src/pages/OrderFoodOnline/components/ColdDrinksPage.jsx`: Handles the mobile-specific display and quick-add functionality for cold drinks.
    * `src/pages/OrderFoodOnline/components/HotDrinksPage.jsx`: Manages the mobile-specific display and customization for hot drinks.
* **State Management:** Utilizes React's `useState` for local component state (e.g., `customizedDrink`, `selectedSize`, `quantity`) and `useEffect` for data fetching.
* **Backend Integration:** Communicates with the backend API (`${BACKEND_URL}/api/fooditems`, `${BACKEND_URL}/api/drinkoptions/...`) to dynamically fetch food items and customization options, ensuring up-to-date pricing and availability.
* **Responsive Design:** Components are designed with responsiveness in mind to adapt to various screen sizes.

---

## ⚙️ Setup and Installation
To get the Z Petrol App running locally, you will need to set up both the backend and frontend components.

Backend Setup:

Navigate to the [backend-folder-name] directory (e.g., backend/ or server/).

Follow the detailed installation instructions in the Backend README (adjust path if needed).

Ensure your MongoDB instance is running and the backend server is successfully started.

Frontend Setup:

Navigate to the [frontend-folder-name] directory (e.g., frontend/ or client/).

Follow the detailed installation instructions in the Frontend README (adjust path if needed).

Make sure to configure your VITE_API_BASE_URL to point to your running backend server and provide a VITE_GOOGLE_MAPS_API_KEY.

Once both the backend and frontend servers are running, you can access the application in your browser (typically at http://localhost:5173 for the frontend).