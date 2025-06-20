const axios = require("axios")
const randomUserAgent = require("random-useragent")
const cheerio = require("cheerio")
const config = require("../config/config")
const logger = require("../config/logger") // Import the logger
const StationFuelPrice = require("../models/StationFuelPrice") // Import the ZStation model

// --- CONSTANTS ---
const CACHE_EXPIRATION = 8 * 60 * 60 * 1000 // Cache for 8 hours

/**
 * Generate fresh request headers with a new random user agent
 * @returns {Object} Fresh headers object
 */
const getFreshHeaders = () => {
  return {
    "User-Agent": randomUserAgent.getRandom(),
    Referer: config.GASSY_API.REFERER_URL,
  }
}

/**
 * Service to search for stations by a search term.
 * It filters for "Z" stations and formats the result.
 * @param {string} term - The search term.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of found stations.
 */

const searchForStations = async term => {
  try {
    const searchApiUrl = `${
      config.GASSY_API.SEARCH_URL
    }?term=${encodeURIComponent(term)}` // Encode search term to make it URL-safe

    // Fetch data from API
    const response = await axios.get(searchApiUrl, {
      headers: getFreshHeaders(),
    })

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
  } catch (error) {
    logger.error("Failed to search for stations", {
      term: term,
      error: error.message,
      axiosStatus: error.response?.status,
      stack: error.stack,
    })
    throw error
  }
}

/**
 * Service to scrape a station's page for price details.
 * @param {string} slug - The station slug (e.g., "112-z-courtenay-place").
 * @returns {Promise<Object>} - A promise that resolves to the station's details.
 */

const fetchStationPricesBySlug = async slug => {
  try {
    // Extract the station ID from the slug
    const stationId = parseInt(slug.match(/\d+/)[0], 10)

    // 1. CHECK THE CACHE (DATABASE) FIRST
    const cachedStation = await StationFuelPrice.findById(stationId)

    if (cachedStation) {
      const isCacheFresh =
        new Date() - new Date(cachedStation.lastUpdated) < CACHE_EXPIRATION

      if (isCacheFresh) {
        logger.info("Serving fresh data from cache", {
          slug: slug,
          stationId: stationId,
        })
        return cachedStation // Return the cached station if it's fresh
      }
    }

    logger.info("Cache stale, initiating scrape", {
      slug: slug,
      stationId: stationId,
    })

    // 2. IF NOT IN CACHE OR CACHE IS STALE, SCRAPE THE DATA
    // Construct the URL for the station's page
    const stationUrl = `${config.GASSY_API.REFERER_URL}${slug}/`

    // Fetch the HTML content of the station's page
    const response = await axios.get(stationUrl, { headers: getFreshHeaders() })
    const html = response.data

    // Load the HTML into Cheerio for parsing
    const $ = cheerio.load(html)

    // EXTRACTION OF DATA FROM HTML ---

    // 1: Find the containers using robust "anchor" selectors ---

    // Find the station block by looking for a div.well that CONTAINS a span with a class starting with "_"
    const $stationInfoBlock = $("div.well:has(span[class^='_'])")

    // Find the address block by looking for a div.well that CONTAINS a paragraph with the class "tel"
    const $addressBlock = $("div.well:has(p.tel)")

    // - Critical Validation -
    // If we can't find these essential blocks, we can't proceed.
    if (!$stationInfoBlock.length || !$addressBlock.length) {
      throw new Error(
        "Could not find station info or address blocks. Page layout may have changed."
      )
    }

    // --- 2: Extract data from within those specific blocks ---

    // The station name is the h3 in the info block that DOES NOT have a span inside it
    const stationName = $stationInfoBlock
      .find("h3:not(:has(span))")
      .text()
      .trim()

    // The address is the first paragraph in the address block
    const stationAddress = $addressBlock.find("p").first().text().trim()

    // - Final validation on individual fields -
    if (!stationName || !stationAddress) {
      throw new Error(
        "Failed to extract station name or address from the blocks."
      )
    }

    // --- Step 3: Extract fuel details from the station info block ---
    const fuels = []

    // Find only the h3s that have a span (the fuel prices)
    $stationInfoBlock.find("h3:has(span)").each((i, el) => {
      const $h3 = $(el)

      // Get fuel type directly from the span's class name, removing the underscore
      const fuelType = $h3.find("span").attr("class").replace("_", "").trim()

      // To get just the price, remove the child span's text from the parent h3's text
      // e.g., "91 $2.459" -> remove "91" -> " $2.459"
      const priceText = $h3.clone().children().remove().end().text().trim() // A safe way to get text without children

      const priceMatch = priceText.match(/(\d+\.\d+)/)

      if (fuelType && priceMatch && priceMatch[1]) {
        fuels.push({
          fuelType: fuelType, // Will be "91", "95", "Diesel"
          price: parseFloat(priceMatch[1]),
        })
      }
    })

    const zStationDetails = {
      _id: stationId,
      name: stationName,
      address: stationAddress,
      slug: slug,
      fuels: fuels,
      lastUpdated: new Date(),
    }

    // 3. SAVE THE NEW SCRAPED DATA TO THE DATABASE
    // findByIdAndUpdate with `upsert: true` will UPDATE if it exists, or INSERT if it doesn't.
    // `new: true` ensures it returns the updated document.
    const updatedStationDetails = await StationFuelPrice.findByIdAndUpdate(
      stationId,
      zStationDetails,
      {
        upsert: true, // Create if it doesn't exist
        new: true, // Return the updated document
      }
    )

    return updatedStationDetails
  } catch (error) {
    logger.error("Failed to fetch station fuel prices", {
      slug: slug,
      error: error.message,
      axiosStatus: error.response?.status,
      stack: error.stack,
    })
    throw error
  }
}

module.exports = {
  searchForStations,
  fetchStationPricesBySlug,
}
