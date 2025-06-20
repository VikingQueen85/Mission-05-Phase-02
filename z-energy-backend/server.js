require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes")

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

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`)
})
