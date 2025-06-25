
const DrinkSize = require('../models/DrinkSize');
const MilkType = require('../models/MilkType');
const CoffeeStrength = require('../models/CoffeeStrength');
const Flavor = require('../models/Flavor');

// Require the new data files
const drinkSizesData = require('../data/drinkSizes');
const milkTypesData = require('../data/milkTypes');
const coffeeStrengthsData = require('../data/coffeeStrengths');
const flavorsData = require('../data/flavors');

const seedDrinkOptions = async () => {
    try {
        // Seed Drink Sizes
        const sizesCount = await DrinkSize.countDocuments();
        if (sizesCount === 0) {
        await DrinkSize.insertMany(drinkSizesData);
        console.info("Drink sizes data was seeded successfully!");
        } else {
        console.info(`Database already contains ${sizesCount} Drink Sizes. Skip seeding.`);
        }

        // Seed Milk Types
        const milksCount = await MilkType.countDocuments();
        if (milksCount === 0) {
        await MilkType.insertMany(milkTypesData);
        console.info("Milk types data was seeded successfully!");
        } else {
        console.info(`Database already contains ${milksCount} Milk Types. Skip seeding.`);
        }

        // Seed Coffee Strengths
        const strengthsCount = await CoffeeStrength.countDocuments();
        if (strengthsCount === 0) {
        await CoffeeStrength.insertMany(coffeeStrengthsData);
        console.info("Coffee strengths data was seeded successfully!");
        } else {
        console.info(`Database already contains ${strengthsCount} Coffee Strengths. Skip seeding.`);
        }

        // Seed Flavors
        const flavorsCount = await Flavor.countDocuments();
        if (flavorsCount === 0) {
        await Flavor.insertMany(flavorsData);
        console.info("Flavors data was seeded successfully!");
        } else {
        console.info(`Database already contains ${flavorsCount} Flavors. Skip seeding.`);
        }

        return true;
    } catch (error) {
        console.error("Error seeding drink options:", error);
        return false;
    }
};

module.exports = seedDrinkOptions;