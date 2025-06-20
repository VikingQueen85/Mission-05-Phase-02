const winston = require("winston")

const logger = winston.createLogger({
  level: "info", // Log only info and below (info, warn, error)
  format: winston.format.json(), // Log in JSON format
  transports: [
    // In production, write to a file or a logging service.
    // For development, writing to the console is fine.
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
})

module.exports = logger
