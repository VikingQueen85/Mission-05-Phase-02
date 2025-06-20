
const FoodItem = require('../models/FoodItem');

class FoodService {
    async getAllFoodItems() {
        return await FoodItem.find({});
    }

    async getFoodItemsByCategory(category) {
        return await FoodItem.find({ category });
    }

    async getFoodItemById(id) {
        return await FoodItem.findById(id);
    }

    async createFoodItem(itemData) {
        const foodItem = new FoodItem(itemData);
        return await foodItem.save();
    }

    async updateFoodItem(id, updateData) {
        return await FoodItem.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }

    async deleteFoodItem(id) {
        return await FoodItem.findByIdAndDelete(id);
    }
}

module.exports = new FoodService();