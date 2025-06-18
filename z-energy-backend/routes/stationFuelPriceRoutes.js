const express = require("express")
const router = express.Router()
const {
  getStations,
  getStationPrices,
} = require("../controllers/stationFuelPriceController")

// Route for searching stations by a term
// e.g., GET /api/stations/search?term=Wellington
router.get("/search", getStations)

// Route for getting prices for a specific station by its ID
// e.g., GET /api/stations/prices/112
router.get("/prices/:slug", getStationPrices)

module.exports = router
