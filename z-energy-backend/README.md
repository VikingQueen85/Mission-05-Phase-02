# BACKEND README

This project serves as the backend API for the Z Petrol App, providing data and services for gas stations, fuel prices, food items, and drink options. It's built with Node.js and Express.js, utilizing MongoDB as its database, and includes initial data seeding for quick setup and testing.

Installation
This project uses npm as its package manager.

To install and run the project locally, follow these steps:

Clone the repository:

git clone [YOUR_REPOSITORY_URL_HERE]
cd [YOUR_PROJECT_FOLDER_NAME]

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory of the project and add the following:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/zpetrolapp

You can change the PORT to any available port.

Ensure your MongoDB instance is running, or replace mongodb://localhost:27017/zpetrolapp with your MongoDB connection string.

Start the server:

npm run dev

The server will connect to MongoDB, seed initial data if the collections are empty, and then start listening on the specified port (default: 3000). You should see console messages indicating successful connection, seeding, and server start.

More Details
This backend server is designed to support a comprehensive petrol station application, offering various data endpoints:

Technology Stack:

Node.js: Runtime environment for the server.

Express.js: Web application framework for building RESTful APIs.

MongoDB: NoSQL database for flexible data storage.

Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.

CORS: Middleware enabled for cross-origin resource sharing.

Dotenv: For managing environment variables.

Key Features:

API Endpoints: Provides structured API routes for:

/api/stations: Manage gas station information.

/api/station-fuel-prices: Handle fuel price data for stations.

/api/fooditems: Serve data for various food products.

/api/drinkoptions: Provide customization options for drinks (e.g., sizes, milks, strengths, flavors).

Data Seeding: Automatically populates the database with initial data for stations, fuel prices, food items, and drink options upon server startup if the collections are empty, facilitating quick development and testing.

Static File Serving: Configured to serve images from the public/images directory, allowing the frontend to access product images.

Global Error Handling: Implements centralized error handling middleware to gracefully manage API errors.