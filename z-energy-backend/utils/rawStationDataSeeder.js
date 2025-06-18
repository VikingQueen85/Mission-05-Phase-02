// Raw Station Data Seeder
// To manually seed the station data, run: node utils/rawStationDataSeeder.js

require("dotenv").config() // Load environment variables from .env file
const mongoose = require("mongoose")

// --- Import Model and Data---
const Station = require("../models/Station.js")
const rawStationsData = require("../data/rawStationsData.js")

// --- Seeder Function ---
/**
 * Seeds the station fuel price data only if the collection is empty
 * @returns {Promise<boolean>} true if seeding was performed, false if skipped
 *  @param {boolean} force - If true, forces seeding even if data exists
 */

const seedStations = async (force = false) => {
  try {
    // Check if we have any documents in the collection
    const count = await Station.countDocuments()

    // If collection has data, skip seeding
    if (count > 0 && !force) {
      console.info(
        `Database already contains ${count} stations data. Skipping seed.`
      )
      return false
    }

    console.info("No stations data found. Seeding database...")

    // Clear existing data (optional safety measure)
    await Station.deleteMany({})

    // Prepare data to include the 'town' field
    const stationsToInsert = rawStationsData.map(station => {
      const parts = station.address.split(",").map(part => part.trim())
      const town = parts.length > 1 ? parts[parts.length - 1] : ""
      return { ...station, town }
    })

    // Seed the new data
    const createdStations = await Station.insertMany(stationsToInsert)

    console.info(`${createdStations.length} Stations seeded successfully!`)
  } catch (err) {
    console.error("Error seeding Stations:", err.message)
    return false
  }
}

// Allow running the seeder directly from command line if needed
if (require.main === module) {
  // This code runs ONLY when executing: node utils/stationFuelPriceSeeder.js
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/zpetrolapp")
    .then(() => {
      console.log("Connected to MongoDB for seeding")
      return seedStations()
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
  // When imported as a module, just export the function
  module.exports = seedStations
}
