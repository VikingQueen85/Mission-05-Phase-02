const mongoose = require("mongoose")

const FuelSchema = new mongoose.Schema(
  {
    fuelType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { _id: false }
) // No _id for sub-documents

const ZStationSchema = new mongoose.Schema({
  // Use Gassy Station ID as primary key (_id)
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  fuels: [FuelSchema], // Use the FuelSchema for fuel prices
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
})

// Set the lastUpdated field to the current date before every save
ZStationSchema.pre("save", function (next) {
  this.lastUpdated = Date.now()
  next()
})

const StationFuelPrice = mongoose.model("StationFuelPrice", ZStationSchema)

module.exports = StationFuelPrice
