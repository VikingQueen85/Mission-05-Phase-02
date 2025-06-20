const axios = require("axios")
const randomUserAgent = require("random-useragent")
const cheerio = require("cheerio")
const config = require("../config/config")

// --- Constants ---
// HTTP headers to use for requests
const HEADERS = {
  "User-Agent": randomUserAgent.getRandom(), // Random user agent for each request
  Referer: config.GASSY_API.REFERER_URL, // Referer URL for the API
}

/**
 * Service to search for stations by a search term.
 * It filters for "Z" stations and formats the result.
 * @param {string} term - The search term.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of found stations.
 */

const searchForStations = async term => {
  const searchApiUrl = `${
    config.GASSY_API.SEARCH_URL
  }?term=${encodeURIComponent(term)}` // Encode search term to make it URL-safe

  // Fetch data from API
  const response = await axios.get(searchApiUrl, { headers: HEADERS })

  // Filter the stations that start with "Z "
  // Map according to website's format
  const zStationsFound = response.data
    .filter(
      station => station.label && station.label.toLowerCase().startsWith("z ")
    )
    .map(station => {
      const id = station.value.split("-")[0]
      return {
        id: parseInt(id, 10),
        name: station.label,
        slug: station.value,
      }
    })

  return zStationsFound
}

/**
 * Service to scrape a station's page for price details.
 * @param {string} slug - The station slug (e.g., "112-z-courtenay-place").
 * @returns {Promise<Object>} - A promise that resolves to the station's details.
 */

const fetchStationPricesBySlug = async slug => {
  // Construct the URL for the station's page
  const stationUrl = `${config.GASSY_API.REFERER_URL}${slug}/`

  // Fetch the HTML content of the station's page
  const response = await axios.get(stationUrl, { headers: HEADERS })
  const html = response.data

  // Load the HTML into Cheerio for parsing
  const $ = cheerio.load(html)

  // Extract the station name and address from the page
  // The first div.well contains the station name in an h3 tag
  const stationName = $("div.well").first().find("h3").first().text().trim()
  // The second div.well contains the address in a p tag
  const stationAddress = $("div.well").eq(1).find("p").first().text().trim()

  // Initialize an array to hold the fuel details
  const fuels = []
  // Extract fuel prices from the first div.well
  // Each fuel type is in an h3 tag, and the price is in the text of that tag
  $("div.well")
    .first()
    .find("h3")
    .each((i, el) => {
      const h3Text = $(el).text().trim()
      let fuelType = null

      if (h3Text.toLowerCase().includes("diesel")) fuelType = "Diesel"
      else if (h3Text.includes("91")) fuelType = "Unleaded 91"
      else if (h3Text.includes("95")) fuelType = "Unleaded 95"

      if (fuelType) {
        const priceMatch = h3Text.match(/\$(\d+(\.\d+)?)/)
        if (priceMatch && priceMatch[1]) {
          const price = priceMatch[1]
          fuels.push({
            fuelType: fuelType,
            price: !isNaN(parseFloat(price)) ? parseFloat(price) : null, //
          })
        }
      }
    })

  // Extract the id from the slug
  const id = slug.split("-")[0]

  const zStationDetails = {
    _id: id,
    name: stationName,
    address: stationAddress,
    slug: slug,
    fuels: fuels,
  }

  return zStationDetails
}

module.exports = {
  searchForStations,
  fetchStationPricesBySlug,
}
