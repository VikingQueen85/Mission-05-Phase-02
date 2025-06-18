const express = require("express")
const router = express.Router()
const Station = require("../models/Station")

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

module.exports = router
