// Station Fuel Price Seeder
// To manually seed the station data, run: node utils/stationFuelPriceSeeder.js

require("dotenv").config()
const mongoose = require("mongoose")

// --- Model and Data Imports ---
const StationFuelPrice = require("../models/StationFuelPrice.js")
const stationFuelPriceData = require("../data/stationFuelPriceData.js")

// --- Seeder Function ---
/**
 * Seeds the station fuel price data only if the collection is empty
 * @returns {Promise<boolean>} true if seeding was performed, false if skipped
 *  @param {boolean} force - If true, forces seeding even if data exists
 */
const seedStationFuelPrices = async (force = false) => {
  try {
    // Check if there is data in the collection
    const count = await StationFuelPrice.countDocuments()

    if (force) {
      console.info("Force seeding station fuel prices data...")
    } else if (count > 0) {
      console.info(
        `Database already contains ${count} station fuel prices. Skip seeding.`
      )
      return false
    } else {
      console.info("No station fuel prices found. Seeding database...")
    }

    // Clear existing data
    await StationFuelPrice.deleteMany({})

    // Seed new data
    const createdStationFuelPrices = await StationFuelPrice.insertMany(
      stationFuelPriceData
    )
    console.info(
      `${createdStationFuelPrices.length} Station Fuel Prices seeded successfully!`
    )
  } catch (err) {
    console.error("Error seeding Station Fuel Prices:", err.message)
    return false
  }
}

// Allow running the seeder directly from command line if needed
if (require.main === module) {
  // This code runs ONLY when executing: node stationFuelPriceSeeder.js
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB for seeding")
      return seedStationFuelPrices(true)
    })
    .then(() => {
      console.log("Seeding completed")
      mongoose.connection.close() // Close the connection after seeding
    })
    .catch(err => {
      console.error("Error during seeding:", err)
      process.exit(1)
    })
} else {
  module.exports = seedStationFuelPrices
}
