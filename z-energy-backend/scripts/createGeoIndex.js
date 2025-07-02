const mongoose = require("mongoose")
require("dotenv").config()

async function createGeoIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log("Connected to MongoDB")

    // Get the collection directly
    const db = mongoose.connection.db
    const collection = db.collection("locationwithservices")

    // Drop any existing index
    const indexInfo = await collection.indexInformation()
    console.log("Current indexes:", indexInfo)

    // Check if the index already exists
    if (indexInfo["location.coordinates_2dsphere"]) {
      console.log("2dsphere index already exists. Dropping it to recreate...")
      await collection.dropIndex("location.coordinates_2dsphere")
    }

    // Create a new 2dsphere index
    console.log("Creating 2dsphere index...")
    await collection.createIndex({ "location.coordinates": "2dsphere" })

    // Verify the index was created
    const updatedIndexInfo = await collection.indexInformation()
    console.log("Updated indexes:", updatedIndexInfo)

    console.log("Successfully created 2dsphere index on location.coordinates")

    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  } catch (error) {
    console.error("Error creating index:", error)
    process.exit(1)
  }
}

createGeoIndex()
