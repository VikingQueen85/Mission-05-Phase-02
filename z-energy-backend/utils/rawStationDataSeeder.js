// Raw Station Data Seeder
// To manually seed the station data, run: node utils/rawStationDataSeeder.js

require("dotenv").config()
const mongoose = require("mongoose")

// --- Model and Data Imports ---
const Station = require("../models/Station.js")
const rawStationsData = require("../data/rawStationsData.js")

// --- Seeder Function ---

/**
 * Seeds the stations data only if the collection is empty
 * @returns {Promise<boolean>} true if seeding was performed, false if skipped
 *  @param {boolean} force - If true, forces seeding even if data exists
 */
const seedStations = async (force = false) => {
  try {
    // Check if there is data in the collection
    const count = await Station.countDocuments()

    if (force) {
      console.info("Force seeding Stations data...")
    } else if (count > 0) {
      console.info(`Database already contains ${count} Stations. Skip seeding.`)
      return false
    } else {
      console.info("No Stations found. Seeding database...")
    }

    // Clear existing data
    await Station.deleteMany({})

    // Prepare data to include the 'town' field
    const stationsToInsert = rawStationsData.map(station => {
      const parts = station.address.split(",").map(part => part.trim())
      const town = parts.length > 1 ? parts[parts.length - 1] : ""
      return { ...station, town }
    })

    // Seed the new data
    const createdStations = await Station.insertMany(stationsToInsert)

    console.info(`${createdStations.length} Stations data seeded successfully!`)
  } catch (err) {
    console.error("Error seeding Stations:", err.message)
    return false
  }
}

// Allow running the seeder directly from command line if needed
if (require.main === module) {
  // This code runs ONLY when executing: node utils/rawStationDataSeeder.js
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB for seeding")
      return seedStations(true)
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
  module.exports = seedStations
}
