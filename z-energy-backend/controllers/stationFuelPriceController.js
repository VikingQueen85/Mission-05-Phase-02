const stationFuelPriceService = require("../services/stationFuelPriceService")
const catchAsync = require("../utils/catchAsync")

// ----- FUNCTION 1: To Search for Stations -----
const getStations = catchAsync(async (req, res, next) => {
  const { term } = req.query

  if (!term)
    return res.status(400).json({ message: "Search term is required." })

  // Call the service to search for stations
  // For errors, cathAsync will pass the error the next()
  const stations = await stationFuelPriceService.searchForStations(term)

  // Returns only if service was successful
  res.status(200).json(stations)
})

// ----- FUNCTION 2: To Get Prices for a Specific Station -----
const getStationPrices = catchAsync(async (req, res, next) => {
  const { slug } = req.params

  if (!slug)
    return res.status(400).json({ message: "Station slug is required." })

  // Call the service to fetch station prices
  const stationDetails = await stationFuelPriceService.fetchStationPricesBySlug(
    slug
  )

  res.status(200).json(stationDetails)
})

module.exports = { getStations, getStationPrices }
