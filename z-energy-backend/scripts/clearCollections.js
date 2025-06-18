// To clear the collections in the database, run: node scripts/clearCollections.js

require("dotenv").config()
const mongoose = require("mongoose")

const clearCollections = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/zpetrolapp"
    )
    console.log("Connected to MongoDB...")

    // Drop specific collections
    await mongoose.connection.collection("stations").drop()
    console.log("Stations collection dropped")

    await mongoose.connection.collection("stationfuelprices").drop()
    console.log("Station fuel prices collection dropped")
  } catch (error) {
    if (error.message.includes("ns not found")) {
      console.log("Collection already deleted")
    } else {
      console.error("Error clearing collections:", error)
    }
  } finally {
    await mongoose.connection.close()
    console.log("MongoDB connection closed")
  }
}

clearCollections()
