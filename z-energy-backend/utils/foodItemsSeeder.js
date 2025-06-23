
const FoodItem = require('../models/FoodItem');
const foodItemsData = require('../data/foodItems');

const seedFoodItems = async () => {
    try {
        const count = await FoodItem.countDocuments();
        if (count === 0) {
            await FoodItem.insertMany(foodItemsData);
            console.info("Food items data was seeded successfully!"); 
            return true;
        } else {
            console.info(`Database already contains ${count} Food Items. Skip seeding.`);
            return false;
        }
    } catch (error) {
        console.error("Error seeding food items:", error);
        return false;
    }
};

module.exports = seedFoodItems;