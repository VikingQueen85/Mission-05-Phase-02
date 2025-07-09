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

🚀 Installation & Setup
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

## Contributors

Tessa - VikingQueen85
Sherelynn - Sherelynn
Clark - hiu03052
