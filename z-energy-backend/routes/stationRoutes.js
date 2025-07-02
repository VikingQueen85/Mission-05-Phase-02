const express = require("express")
const router = express.Router()
const Station = require("../models/Station")
const locationWithServiceController = require("../controllers/locationWithServiceController")

// Route to get all stations
router.get("/", async (req, res) => {
  try {
    const stations = await Station.find({})
    res.status(200).json(stations)
  } catch (error) {
    console.error("Error fetching stations:", error)
    res
      .status(500)
      .json({ message: "Error fetching stations", error: error.message })
  }
})

// Route to get stations with services
router.get(
  "/with-services",
  locationWithServiceController.getStationsWithServices
)

// Route to get stations near a location
router.get("/nearby", locationWithServiceController.getNearbyStations)

module.exports = router
