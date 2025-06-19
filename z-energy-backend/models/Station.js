const mongoose = require("mongoose")

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  services: { type: [String], default: [] },
  town: { type: String },
})

const Station = mongoose.model("Station", stationSchema)

module.exports = Station
