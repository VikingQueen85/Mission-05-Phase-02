const stationFuelPriceService = require("../services/stationFuelPriceService")

// ----- FUNCTION 1: To Search for Stations -----
const getStations = async (req, res) => {
  try {
    const { term } = req.query

    if (!term)
      return res.status(400).json({ message: "Search term is required." })

    // Call the service to search for stations
    const stations = await stationFuelPriceService.searchForStations(term)

    res.json(stations)
  } catch (error) {
    console.error("Search Controller Error:", error.message)
    res.status(500).json({ message: "Server error during station search." })
  }
}

// ----- FUNCTION 2: To Get Prices for a Specific Station -----
const getStationPrices = async (req, res) => {
  try {
    const { slug } = req.params

    if (!slug)
      return res.status(400).json({ message: "Station slug is required." })

    // Call the service to fetch station prices
    const stationDetails =
      await stationFuelPriceService.fetchStationPricesBySlug(slug)

    res.json(stationDetails)
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res
        .status(404)
        .json({ message: `Could not find page for this station.` })
    }

    console.error(
      `Price Fetch Controller Error for slug ${req.params.slug}:`,
      error.message
    )
    return res
      .status(500)
      .json({ message: "An unexpected error occurred while fetching station prices." })
  }
}

module.exports = { getStations, getStationPrices }
