const express = require("express")
const router = express.Router()
const { getStations } = require("../controllers/stationFuelPriceController")

// @route   GET /api/stations
// @desc    Get stations by search query (name, address, or nearby location)
// @access  Public
router.get("/", getStations)

module.exports = router
