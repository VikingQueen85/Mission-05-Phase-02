// controllers/stationController.js
const axios = require("axios")
const randomUserAgent = require("random-useragent")
const cheerio = require("cheerio")
const config = require("../config/config")

// // This helper function now transforms a SINGLE station object
// const transformStationDetails = station => {
//   const unleaded91 = station.prices.find(p => p.fuel_type === "unleaded_91")
//   const unleaded95 = station.prices.find(
//     p => p.fuel_type === "unleaded_95_premium"
//   )
//   const diesel = station.prices.find(p => p.fuel_type === "diesel")

//   const fuels = []
//   if (unleaded91)
//     fuels.push({ fuelType: "Unleaded 91", price: unleaded91.price / 100 })
//   if (unleaded95)
//     fuels.push({ fuelType: "Unleaded 95", price: unleaded95.price / 100 })
//   if (diesel) fuels.push({ fuelType: "Diesel", price: diesel.price / 100 })

//   return {
//     _id: station.id,
//     name: station.name,
//     address: station.address,
//     fuels: fuels,
//   }
// }

// ----- FUNCTION 1: To Search for Stations -----
const getStations = async (req, res) => {
  try {
    console.log("Request received with query:", req.query)
    const { term } = req.query
    if (!term)
      return res.status(400).json({ message: "Search term is required." })

    console.log(`Searching for term: '${term}'`) // Keep for debugging

    const headers = {
      "User-Agent": randomUserAgent.getRandom(),
      Referer: config.REFERER_URL,
    }
    const searchApiUrl = `${
      config.GASSY_API.SEARCH_URL
    }?term=${encodeURIComponent(term)}`

    const response = await axios.get(searchApiUrl, { headers })

    // --- DEBUGGING STEP ---
    // Log the entire response data from Gassy before we do anything with it.
    console.log("--- RAW RESPONSE FROM GASSY ---")
    console.log(response.data)
    console.log("-----------------------------")
    // --- END DEBUGGING STEP ---

    // The Gassy API returns { label: "...", value: "..." }
    const zStationsFound = response.data
      // 1. Filter by checking if the 'label' starts with 'Z '
      .filter(
        station => station.label && station.label.toLowerCase().startsWith("z ")
      )
      // 2. Map the new structure to what our frontend needs for the results list
      .map(station => {
        // Extract the ID from the 'value' string (e.g., "112-z-courtenay-place")
        const id = station.value.split("-")[0]

        return {
          id: parseInt(id, 10),
          name: station.label,
          // Send the full value string to the frontend called "slug"
          slug: station.value,
        }
      })

    console.log(`Found ${zStationsFound.length} matching Z stations.`)
    res.json(zStationsFound)
  } catch (error) {
    console.error("Search Error:", error.message)
    res.status(500).send("Server error during station search.")
  }
}

// ----- FUNCTION 2: To Get Prices for a Specific Station -----
const getStationPrices = async (req, res) => {
  try {
    const { slug } = req.params
    if (!slug)
      return res.status(400).json({ message: "Station slug is required." })

    console.log(`Fetching prices for station slug: ${slug}`)

    const stationUrl = `https://www.gassy.co.nz/${slug}/`

    console.log(`Station URL: ${stationUrl}`)

    const headers = {
      "User-Agent": randomUserAgent.getRandom(),
    }

    // 1. Fetch the HTML of the station's page
    const response = await axios.get(stationUrl, { headers })
    const html = response.data

    // 2. Load the HTML into Cheerio to parse it like jQuery
    const $ = cheerio.load(html)

    // 3. Extract the data by finding the right HTML elements
    // Find the station name inside the first <h3> tag within the first <div class="well">
    const stationName = $("div.well").first().find("h3").first().text().trim()

    // Find the address in the second <div class="well">, it's the first <p> tag
    const stationAddress = $("div.well").eq(1).find("p").first().text().trim()

    const fuels = []

    // Find all <h3> tags within the first <div class="well">
    $("div.well")
      .first()
      .find("h3")
      .each((i, el) => {
        const h3Text = $(el).text().trim() // e.g., "91 $2.499" or "Diesel $1.789"

        // We need to separate the fuel type from the price
        // Let's check for known fuel types
        if (h3Text.toLowerCase().includes("diesel")) {
          const price = h3Text.split("$")[1] // Get the part after the '$'
          if (price) {
            fuels.push({
              fuelType: "Diesel",
              price: parseFloat(price),
            })
          }
        } else if (h3Text.includes("91")) {
          const price = h3Text.split("$")[1]
          if (price) {
            fuels.push({
              fuelType: "Unleaded 91",
              price: parseFloat(price),
            })
          }
        } else if (h3Text.includes("95")) {
          const price = h3Text.split("$")[1]
          if (price) {
            fuels.push({
              fuelType: "Unleaded 95",
              price: parseFloat(price),
            })
          }
        }
        // You can add more 'else if' blocks here for other fuel types like 98
      })

    // We no longer have a simple station ID, so we can use the slug
    const id = slug.split("-")[0]

    // 4. Construct the final JSON object to send to the frontend
    const stationDetails = {
      _id: id,
      name: stationName,
      address: stationAddress,
      fuels: fuels,
    }

    res.json(stationDetails)
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res
        .status(404)
        .json({ message: `Could not find a Gassy page for this station.` })
    }
    console.error(`Scraping Error for slug ${req.params.slug}:`, error.message)
    res
      .status(500)
      .send("An unexpected error occurred while fetching station prices.")
  }
}

module.exports = { getStations, getStationPrices }
