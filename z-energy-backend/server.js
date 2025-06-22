
const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// --- Import Existing Routes & New Food Routes ---
const routes = require("./routes");
const foodRoutes = require("./routes/foodRoutes");

// --- Import Seeders ---
const seedStationFuelPrices = require("./utils/stationFuelPriceSeeder");
const seedStations = require("./utils/rawStationDataSeeder");
const seedFoodItems = require("./utils/foodItemsSeeder");

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
app.use('/images', express.static('public/images'));

// --- MongoDB Connection ---
mongoose
    .connect(MONGODB_URI)
    .then(async () => {
        console.info("MongoDB connected successfully!");

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
            console.log("Food items data was seeded successfully!")
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

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});