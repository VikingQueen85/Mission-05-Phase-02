
const FoodItem = require('../models/FoodItem');
const foodItemsData = require('../data/foodItems');

const seedFoodItems = async () => {
    try {
        const count = await FoodItem.countDocuments();
        if (count === 0) {
            await FoodItem.insertMany(foodItemsData);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error seeding food items:", error);
        return false;
    }
};

module.exports = seedFoodItems;