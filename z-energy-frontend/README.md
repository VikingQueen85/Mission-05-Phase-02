# FRONTEND README

This project is the frontend user interface for the Z Petrol App, designed to provide a comprehensive and responsive experience for users to find stations, compare fuel prices, and order food online. It's built with React.js and dynamically adapts its layout and functionality for both desktop and mobile devices.

Installation
This project uses npm as its package manager.

To install and run the project locally, follow these steps:

Clone the repository:

git clone [YOUR_FRONTEND_REPOSITORY_URL_HERE]
cd [YOUR_FRONTEND_PROJECT_FOLDER_NAME]

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory of the project and add the following:

VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE

Replace http://localhost:3000 with the actual URL of your running backend server if it's hosted elsewhere.

You will need to obtain a Google Maps API Key with Places API enabled for the Locations feature to function correctly.

Start the development server:

npm run dev

The application will typically open in your browser at http://localhost:5173 (or another available port).

More Details
This frontend application is designed to be the primary user interface for the Z Petrol App, offering a rich set of features:

Technology Stack:

React.js: For building dynamic and interactive user interfaces.

React Router DOM: For declarative routing and navigation within the single-page application.

Google Maps API: Integrated for displaying station locations, current user location, and location search functionality.

CSS Modules / Plain CSS: For component-scoped and global styling.

useViewportSize Hook: Custom hook for responsive design, enabling conditional rendering based on device type (mobile vs. desktop).

Key Features:

Responsive Design: The entire application dynamically adjusts its layout and user experience based on the detected device (mobile or desktop), ensuring optimal usability.

Fuel Price Comparison:

Allows users to compare fuel prices across multiple Z Stations.

Supports adding up to four stations for comparison on desktop.

Displays two default stations for comparison on mobile.

Station Locations Finder:

Displays Z Stations on an interactive Google Map.

Detects and shows the user's current location.

Features a search bar with Google Places Autocomplete for finding specific locations.

Lists nearby stations with details like address, services offered (fuel, food, car wash, ATM, etc., with icons), contact information, and operating hours.

Allows users to click on a station in the list to center it on the map.

Online Food Ordering:

Desktop Experience: When a food category (e.g., Hot Drinks) is clicked, an interactive overlay appears for item selection and customization (e.g., size, milk, strength, flavor for hot drinks). Other food categories display "under development" messages.

Mobile Experience: Food categories navigate to dedicated new pages for item selection and customization, providing a more native mobile app feel.

Comprehensive Routing: Utilizes React Router to manage navigation across various pages including Homepage, Share Tank, Z App, About Z, Rewards, Login, Cart, and Search. Includes specific routing logic for mobile-first navigation.

Backend API Integration: Consumes data from the companion Node.js/Express.js backend server for stations, fuel prices, food items, and drink customization options.