const LocationWithService = require("../models/LocationWithService")

// Get all stations with services
exports.getStationsWithServices = async (req, res) => {
  try {
    const stations = await LocationWithService.find().lean()

    res.status(200).json(stations)
  } catch (error) {
    console.error("Error fetching stations with services:", error)
    res.status(500).json({ message: "Failed to fetch stations with services" })
  }
}

// Get stations near a location
exports.getNearbyStations = async (req, res) => {
  try {
    const { lng, lat, radius = 10 } = req.query

    if (!lng || !lat) {
      return res.status(400).json({
        message: "Longitude and latitude are required",
      })
    }

    const longitude = parseFloat(lng)
    const latitude = parseFloat(lat)
    const searchRadius = parseFloat(radius)

    if (isNaN(longitude) || isNaN(latitude)) {
      return res.status(400).json({
        message: "Invalid coordinates format",
      })
    }

    const stations = await LocationWithService.findNearby(
      longitude,
      latitude,
      searchRadius
    )

    // Calculate distance from search point to each station
    const stationsWithDistance = stations.map(station => {
      const [stationLng, stationLat] = station.location.coordinates

      // Calculate distance using Haversine formula
      const R = 6371 // Earth radius in km
      const dLat = ((latitude - stationLat) * Math.PI) / 180
      const dLng = ((longitude - stationLng) * Math.PI) / 180
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((stationLat * Math.PI) / 180) *
          Math.cos((latitude * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c

      // Return station with distance
      return {
        ...station,
        distance: parseFloat(distance.toFixed(2)),
      }
    })

    // Sort by distance
    stationsWithDistance.sort((a, b) => a.distance - b.distance)

    res.status(200).json(stationsWithDistance)
  } catch (error) {
    console.error("Error finding nearby stations:", error)
    res.status(500).json({ message: "Failed to find nearby stations" })
  }
}
