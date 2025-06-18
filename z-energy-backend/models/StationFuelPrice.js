const mongoose = require("mongoose")

const StationFuelPriceSchema = new mongoose.Schema({
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
      fuelType: { type: String, required: true }, // e.g., 'Unleaded 91', 'Diesel'
      price: { type: Number, required: true }, // Price per litre
    },
  ],
})

// Create a 2dsphere index on the location field for geospatial queries
StationFuelPriceSchema.index({ location: "2dsphere" })

const StationFuelPrice = mongoose.model(
  "StationFuelPrice",
  StationFuelPriceSchema
)

module.exports = StationFuelPrice
