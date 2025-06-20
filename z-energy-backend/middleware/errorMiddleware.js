const logger = require("../config/logger")

const globalErrorHandler = (err, req, res, next) => {
  // Check for status code attached in the service
  // or Axios-specific code
  // or default to 500 if none provided
  const statusCode =
    err.statusCode || (err.isAxiosError && err.response?.status) || 500
  let message = "An internal server error occurred."

  // Use a switch statement for clean, readable logic
  switch (statusCode) {
    case 404:
      message = "The requested resource could not be found."
      break
    case 400:
      message = "The request was invalid. Please check your inputs."
      break
    case 503:
      message =
        "An external service is temporarily unavailable. Please try again later."
      break
  }

  // The service layer already logged the detailed error.
  // This is a final log to show what the user received.
  logger.warn(`Responding with error`, {
    statusCode: statusCode,
    message: message,
    originalError: err.message,
    url: req.originalUrl,
  })

  res.status(statusCode).json({
    status: "error",
    message: message,
  })
}

module.exports = globalErrorHandler
