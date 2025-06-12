const mongoose = require("mongoose")

const stationFuelPriceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  // GeoJSON for location-based queries
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  fuels: [
    {
      fuelType: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
})

// Define geospatial index for location
stationFuelPriceSchema.index({ location: "2dsphere" })

const StationFuelPrice = mongoose.model(
  "StationFuelPrice",
  stationFuelPriceSchema
)

module.exports = StationFuelPrice
