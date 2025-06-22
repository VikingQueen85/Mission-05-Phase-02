
const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// --- Import Existing Routes & New Food Routes ---
const routes = require("./routes");
const foodRoutes = require("./routes/foodRoutes");

// --- Import Middleware ---
const globalErrorHandler = require("./middleware/errorMiddleware")

// --- Import Seeders ---
const seedStationFuelPrices = require("./utils/stationFuelPriceSeeder");
const seedStations = require("./utils/rawStationDataSeeder");

// --- Initialise Express ---
const app = express();

// --- Constants ---
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static('public/images'));

// --- MongoDB Connection ---
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zpetrolapp";

mongoose
    .connect(MONGODB_URI)
    .then(async () => {
        console.info("MongoDB connected successfully!");

        // Seed stations data
        const didSeedStations = await seedStations();

        // Seed station fuel prices
        const didSeedFuelPrices = await seedStationFuelPrices();

        return {
            stationsSeeded: didSeedStations,
            fuelPricesSeeded: didSeedFuelPrices,
        };
    })
    .then(seedResults => {
        if (seedResults.stationsSeeded) {
            console.info("Stations data was seeded successfully!");
        }

        if (seedResults.fuelPricesSeeded) {
            console.info("Station fuel prices were seeded successfully!");
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

// --- New Food Ordering Routes ---`
app.use("/api/fooditems", foodRoutes);

// --- Handle 404 > ROUTE NOT FOUND ---
// Runs if no route matched the request
app.use((req, res, next) => {
  const err = new Error("Not Found") // Create a new error object
  err.statusCode = 404
  next(err) // Pass error to the global error handler
})

// --- Global Error Handler ---
app.use(globalErrorHandler)

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});