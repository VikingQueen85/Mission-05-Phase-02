// To reseed the database with fresh data, run: node scripts/reseed.js

require("dotenv").config()
const mongoose = require("mongoose")

// --- Seeder Imports ---
const seedStations = require("../utils/rawStationDataSeeder")
const seedStationFuelPrices = require("../utils/stationFuelPriceSeeder")

const MONGODB_URI = process.env.MONGODB_URI

async function reseedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected...")

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
