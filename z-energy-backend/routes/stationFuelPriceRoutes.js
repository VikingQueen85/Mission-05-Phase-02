const express = require("express")
const router = express.Router()
const {
  getStations,
  getStationPrices,
} = require("../controllers/stationFuelPriceController")

// Route for searching stations by a term
// e.g., GET /api/station-fuel-prices/search?term=Wellington
router.get("/search", getStations)

// Route for getting prices for a specific station by slug
// e.g., GET /api/station-fuel-prices/prices/112-z-courtenay-place
router.get("/prices/:slug", getStationPrices)

module.exports = router
