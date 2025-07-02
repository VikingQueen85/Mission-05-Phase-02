const mongoose = require("mongoose")

// Define GeoJSON Point Schema
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
    default: "Point",
  },
  coordinates: {
    type: [Number], // [longitude, latitude] format
    required: true,
  },
})

// Define operating hours schema
const operatingHoursSchema = new mongoose.Schema({
  Sun: { type: String, default: "6:00am-10pm" },
  Mon: { type: String, default: "6:00am-10pm" },
  Tue: { type: String, default: "6:00am-10pm" },
  Wed: { type: String, default: "6:00am-10pm" },
  Thu: { type: String, default: "6:00am-10pm" },
  Fri: { type: String, default: "6:00am-10pm" },
  Sat: { type: String, default: "6:00am-10pm" },
})

// Main station schema
const locationWithServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  services: { type: [String], default: [] },
  town: { type: String },
  phone: { type: String, default: "0800-474-355" }, // Default Z Energy number
  location: {
    type: pointSchema,
    required: true,
  },
  operatingHours: {
    type: operatingHoursSchema,
    default: () => ({}),
  },
})

// Create 2dsphere index on location.coordinates field
locationWithServiceSchema.index({ "location.coordinates": "2dsphere" })

// Method to find stations within a radius (in km)
locationWithServiceSchema.statics.findNearby = function (
  longitude,
  latitude,
  radius = 10
) {
  return this.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: radius * 1000, // Convert km to meters
      },
    },
  })
}

const LocationWithService = mongoose.model(
  "LocationWithService",
  locationWithServiceSchema
)

module.exports = LocationWithService
