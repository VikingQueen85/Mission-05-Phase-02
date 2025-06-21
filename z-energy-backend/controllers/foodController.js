
const foodService = require('../services/foodService');

const getFoodItems = async (req, res) => {
    try {
        const foodItems = await foodService.getAllFoodItems();
        res.status(200).json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFoodItemsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const foodItems = await foodService.getFoodItemsByCategory(category);
        if (foodItems.length === 0) {
            return res.status(404).json({ message: `No food items found for category: ${category}` });
        }
        res.status(200).json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFoodItemById = async (req, res) => {
    try {
        const foodItem = await foodService.getFoodItemById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json(foodItem);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid food item ID' });
        }
        res.status(500).json({ message: error.message });
    }
};

const createFoodItem = async (req, res) => {
    try {
        const newFoodItem = await foodService.createFoodItem(req.body);
        res.status(201).json(newFoodItem);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Food item with this name already exists' });
        }
        res.status(400).json({ message: error.message });
    }
};

const updateFoodItem = async (req, res) => {
    try {
        const updatedFoodItem = await foodService.updateFoodItem(req.params.id, req.body);
        if (!updatedFoodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json(updatedFoodItem);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid food item ID' });
        }
        res.status(400).json({ message: error.message });
    }
};

const deleteFoodItem = async (req, res) => {
    try {
        const deletedFoodItem = await foodService.deleteFoodItem(req.params.id);
        if (!deletedFoodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json({ message: 'Food item removed successfully' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid food item ID' });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFoodItems,
    getFoodItemsByCategory,
    getFoodItemById,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
};