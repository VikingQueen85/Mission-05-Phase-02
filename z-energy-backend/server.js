
const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

// --- Import Routes ---
const routes = require("./routes");
const foodRoutes = require("./routes/foodRoutes");

// --- Import Middleware ---
const globalErrorHandler = require("./middleware/errorMiddleware");

// --- Import Seeders ---
const seedStationFuelPrices = require("./utils/stationFuelPriceSeeder");
const seedStations = require("./utils/rawStationDataSeeder");
const seedFoodItems = require("./utils/foodItemsSeeder");

// --- Import Models ---
const FoodItem = require("./models/FoodItem");

// --- Initialise Express ---
const app = express();

// --- Constants ---
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zpetrolapp";

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'src', 'assets', 'images')));

// --- MongoDB Connection ---
mongoose
    .connect(MONGODB_URI)
    .then(async () => {
        console.info("MongoDB connected successfully!");

        // Run seeders
        const didSeedStations = await seedStations();
        const didSeedFuelPrices = await seedStationFuelPrices();
        const didSeedFoodItems = await seedFoodItems();

        return {
            stationsSeeded: didSeedStations,
            fuelPricesSeeded: didSeedFuelPrices,
            foodItemsSeeded: didSeedFoodItems,
        };
    })
    .then(seedResults => {
        if (seedResults.stationsSeeded) {
            console.info("Stations data was seeded successfully!");
        }

        if (seedResults.fuelPricesSeeded) {
            console.info("Station fuel prices were seeded successfully!");
        }

        if (seedResults.foodItemsSeeded) {
            console.info("Food items data was seeded successfully!");
        }
    })
    .catch(err => console.error("MongoDB connection error:", err));

// Basic API Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// --- Existing Routes ---
app.use("/api/stations", routes.stationRoutes);
app.use("/api/station-fuel-prices", routes.stationFuelPriceRoutes);
app.use("/api/fooditems", foodRoutes);

// This middleware runs if no route matched the request
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.statusCode = 404;
    next(err);
});

// --- Global Error Handler ---
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});