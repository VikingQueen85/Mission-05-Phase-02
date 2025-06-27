
const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

// --- Import Routes ---
const stationRoutes = require("./routes/stationRoutes");
const stationFuelPriceRoutes = require("./routes/stationFuelPriceRoutes");
const foodRoutes = require("./routes/foodRoutes");
const drinkOptionsRoutes = require("./routes/drinkOptionsRoutes");

// --- Import Middleware ---
const globalErrorHandler = require("./middleware/errorMiddleware");

// --- Import Seeders ---
const seedStationFuelPrices = require("./utils/stationFuelPriceSeeder");
const seedStations = require("./utils/rawStationDataSeeder");
const seedFoodItems = require("./utils/foodItemsSeeder");
const seedDrinkOptions = require("./utils/drinkOptionSeeder");

// --- Initialise Express ---
const app = express();

// --- Constants ---
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zpetrolapp";

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// --- MongoDB Connection ---
mongoose
    .connect(MONGODB_URI)
    .then(async () => {
        console.info("MongoDB connected successfully!");

        // Run all seeders - Ensure they are called here and awaited
        const didSeedStations = await seedStations();
        const didSeedFuelPrices = await seedStationFuelPrices();
        const didSeedFoodItems = await seedFoodItems();
        const didSeedDrinkOptions = await seedDrinkOptions();

        // Log seeding results
        if (didSeedStations) console.info("Stations data was seeded successfully!");
        if (didSeedFuelPrices) console.info("Station fuel prices were seeded successfully!");
        if (didSeedFoodItems) console.info("Food items data was seeded successfully!");
        if (didSeedDrinkOptions) console.info("Drink options data was seeded successfully!");

        // --- Start the server ONLY AFTER successful DB connection and seeding ---
        app.listen(PORT, () => {
            console.log(`Backend server listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error and server not started:", err);
    });

// --- Basic API Route (these routes will only become active after app.listen starts the server) ---
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// --- Consolidate and use all routes ---
app.use("/api/stations", stationRoutes);
app.use("/api/station-fuel-prices", stationFuelPriceRoutes);
app.use("/api/fooditems", foodRoutes);
app.use("/api/drinkoptions", drinkOptionsRoutes);

// This middleware runs if no route matched the request
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.statusCode = 404;
    next(err);
});

// --- Global Error Handler ---
app.use(globalErrorHandler);