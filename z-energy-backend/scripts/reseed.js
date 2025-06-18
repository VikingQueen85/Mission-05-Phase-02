// To reseed the database with fresh data, run: node scripts/reseed.js

require("dotenv").config()
const mongoose = require("mongoose")
const Station = require("../models/Station")
const StationFuelPrice = require("../models/StationFuelPrice")
const seedStations = require("../utils/rawStationDataSeeder")
const seedStationFuelPrices = require("../utils/stationFuelPriceSeeder")

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/zpetrolapp"

async function reseedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected...")

    // Clear all existing data
    console.log("Clearing existing data...")
    await Station.deleteMany({})
    await StationFuelPrice.deleteMany({})

    // Seeding fresh data
    await seedStations(true)
    await seedStationFuelPrices(true)

    console.info("Database re-seeded successfully!")
  } catch (error) {
    console.error("Error during re-seeding:", error)
  } finally {
    // Close the connection
    await mongoose.connection.close()
    console.info("Database connection closed.")
  }
}

reseedDatabase()
