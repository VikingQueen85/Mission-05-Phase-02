
require('dotenv').config();
const mongoose = require('mongoose');

// --- Model and Data Imports ---
const FoodItem = require("../models/FoodItem");
const foodItemsData = require("../data/foodItems");

// --- Seeder Function ---
/**
 * Seeds the food items data only if the collection is empty.
 * @returns {Promise<boolean>}
 * @param {boolean} force
 */

const seedFoodItems = async (force = false) => {
    try {
        const count = await FoodItem.countDocuments();

        // If collection has data and force is false, skip seeding
        if (count > 0 && !force) {
            console.info(`Database already contains ${count} food items. Skipping seed.`);
            return false;
        }

        console.info("No food items data found. Seeding database with food items...");

        // Clear existing data (optional safety measure, only runs if force is true or count is 0)
        await FoodItem.deleteMany({});
        console.info('Existing food items cleared (if any, before initial seed).');

        // Insert new data
        const createdFoodItems = await FoodItem.insertMany(foodItemsData);

        console.info(`${createdFoodItems.length} Food items data seeded successfully!`);
        return true;
    } catch (err) {
        console.error('Error seeding Food Items:', err.message);
        return false;
    }
};

// Allow running the seeder directly from command line if needed
if (require.main === module) {
    mongoose
        .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/zpetrolapp")
        .then(() => {
            console.log("Connected to MongoDB for food items seeding.");
            return seedFoodItems();
        })
        .then(() => {
            console.log("Food items seeding completed.");
            mongoose.connection.close();
        })
        .catch(err => {
            console.error("Error during food items seeding:", err);
            process.exit(1);
        });
} else {
    module.exports = seedFoodItems;
}