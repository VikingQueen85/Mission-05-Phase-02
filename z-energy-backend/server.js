require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes")

// --- Import Middleware ---
const globalErrorHandler = require("./middleware/errorMiddleware")

// --- Import Seeders ---
const seedStationFuelPrices = require("./utils/stationFuelPriceSeeder")
const seedStations = require("./utils/rawStationDataSeeder")

// --- Initialise Express ---
const app = express()

// --- Constants ---
const PORT = process.env.PORT || 3000

// --- Middleware ---
app.use(cors())
app.use(express.json())

// --- MongoDB Connection ---
const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.info("MongoDB connected successfully!")

    // Seed stations data
    const didSeedStations = await seedStations()

    // Seed station fuel prices
    const didSeedFuelPrices = await seedStationFuelPrices()

    return {
      stationsSeeded: didSeedStations,
      fuelPricesSeeded: didSeedFuelPrices,
    }
  })
  .then(seedResults => {
    if (seedResults.stationsSeeded) {
      console.info("Stations data was seeded successfully!")
    }

    if (seedResults.fuelPricesSeeded) {
      console.info("Station fuel prices were seeded successfully!")
    }
    // Connection remains open for the application
  })
  .catch(err => console.error("MongoDB connection error:", err))

// Basic API Route
app.get("/", (req, res) => {
  res.send("Backend is running!")
})

// Routes
app.use("/api/stations", routes.stationRoutes)
app.use("/api/station-fuel-prices", routes.stationFuelPriceRoutes)

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
  console.log(`Backend server listening on port ${PORT}`)
})
