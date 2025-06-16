const StationFuelPrice = require("../models/stationFuelPriceModel")
const axios = require("axios")
require("dotenv").config()

const getStations = async (req, res) => {
  try {
    const { search } = req.query

    if (!search) {
      return res.status(400).json({ message: "Search query is required" })
    }

    // Try to geocode the search term to see if it's an address
    const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      search
    )}&key=${process.env.OPENCAGE_API_KEY}&limit=1&countrycode=nz`

    const geoResponse = await axios.get(geoUrl)

    let stations

    // If geocoding is successful and confident, find stations nearby
    if (
      geoResponse.data.results.length > 0 &&
      geoResponse.data.results[0].confidence >= 5
    ) {
      const { lat, lng } = geoResponse.data.results[0].geometry

      // Find stations within a 10km radius
      stations = await StationFuelPrice.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            $maxDistance: 10000, // in meters (10km)
          },
        },
      })
    } else {
      // If not a location, search by name or address text
      stations = await StationFuelPrice.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
        ],
      })
    }

    res.json(stations)
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
}

module.exports = {
  getStations,
}
