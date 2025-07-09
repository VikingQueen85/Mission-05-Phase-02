const mongoose = require("mongoose")
const LocationWithService = require("../models/LocationWithService")
const locations = require("../data/locations")
const rawStationsData = require("../data/rawStationsData")
require("dotenv").config()

// Default operating hours pattern
const defaultOperatingHours = {
  Sun: "6:00am-10pm",
  Mon: "6:00am-10pm",
  Tue: "6:00am-10pm",
  Wed: "6:00am-10pm",
  Thu: "6:00am-10pm",
  Fri: "6:00am-10pm",
  Sat: "6:00am-10pm",
}

// Map service strings to standardized format
const mapServices = serviceArray => {
  if (!serviceArray || !Array.isArray(serviceArray)) return ["fuel"]

  const mappedServices = serviceArray.map(service => {
    if (service.includes("Fuel") || service.includes("Pay at Pump"))
      return "fuel"
    if (service.includes("Coffee") || service.includes("Espress"))
      return "coffee"
    if (service.includes("Food") || service.includes("Fresh Food"))
      return "food"
    if (service.includes("Carwash") || service.includes("Z2O"))
      return "car_wash"
    if (service.includes("Bathroom")) return "restroom"
    if (service.includes("Trailer")) return "trailer"
    if (service.includes("LPG")) return "lpg"
    if (service.includes("App")) return "app"
    return "shop" // Default
  })

  // Remove duplicates and return
  return [...new Set(mappedServices)]
}

// Connect to MongoDB
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log("Connected to MongoDB")

    // Clean existing data
    await LocationWithService.deleteMany({})
    console.log("Cleared existing stations")

    // Prepare stations data
    const locationsWithServiceData = locations.map(location => {
      // Find matching service data
      const serviceData = rawStationsData.find(
        raw => raw.name.toLowerCase() === location.name.toLowerCase()
      )

      // Map services
      const services = serviceData
        ? mapServices(serviceData.services)
        : ["fuel"]

      // Create station document
      return {
        name: location.name,
        address: location.address,
        location: location.location, // Using GeoJSON structure
        services: services,
        town: location.address.split(",").pop().trim(),
        operatingHours: defaultOperatingHours,
      }
    })

    // Insert all stations
    const insertedStations = await LocationWithService.insertMany(
      locationsWithServiceData
    )
    console.log(
      `Successfully inserted ${insertedStations.length} Z-Energy stations`
    )

    // Create the 2dsphere index
    console.log("Creating 2dsphere index on location.coordinates...")
    await mongoose.connection
      .collection("locationwithservices")
      .createIndex({ "location.coordinates": "2dsphere" })
    console.log("Index created successfully")

    // Disconnect from MongoDB
    await mongoose.connection.close()
    console.log("Disconnected from MongoDB")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()
