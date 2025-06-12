const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: "./.env" })

// --- Import Model and Data---
const StationFuelPrice = require("../models/stationFuelPriceModel.js")
const stationFuelPriceData = require("../data/stationFuelPriceData.js")

// --- Connect to MongoDB ---
const connectToDatabase = async () => {
  try {
    // Check if MONGODB_URI is defined in the environment variables
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not defined in .env file.")
      process.exit(1) // Exit the process with an error code
    }

    await mongoose.connect(process.env.MONGODB_URI)

    console.info("MongoDB Connected...")
  } catch (err) {
    console.error("Error connecting to MongoDB during seeding:", err.message)

    process.exit(1) // Exit the process with an error code
  }
}

const seedStationFuelPrices = async () => {
  try {
    await connectToDatabase()
    await StationFuelPrice.deleteMany({}) // Clear existing data
    await StationFuelPrice.insertMany(stationFuelPriceData)
    console.info("Station Fuel Prices seeded successfully!")
    await mongoose.connection.close()
  } catch (err) {
    console.error("Error seeding Station Fuel Prices:", err.message)
    mongoose.connection.close()
  }
}

// Run the seed function
seedStationFuelPrices()
