
const foodService = require('../services/foodService');

const getFoodItems = async (req, res) => {
    try {
        const foodItems = await foodService.getAllFoodItems();
        res.status(200).json(foodItems);
    } catch (error) {
        console.error("Error in getFoodItems:", error);
        res.status(500).json({ message: error.message });
    }
};

const getFoodItemsByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        console.log(`Attempting to fetch food items for category: ${category}`);

        const foodItems = await foodService.getFoodItemsByCategory(category);
        console.log("Food items fetched from service (raw data):", foodItems);

        if (!foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
            console.log(`No food items found or invalid response for category: ${category}`);
            return res.status(404).json({ message: `No food items found for category: ${category}` });
        }

        const itemsWithFullUrls = foodItems.map(item => {
            const itemObj = item && item.toObject ? item.toObject() : item;
            const finalImageUrl = itemObj.imageUrl;

            return {
                ...itemObj,
                src: finalImageUrl,
                alt: itemObj.name
            };
        });

        res.status(200).json(itemsWithFullUrls);
    } catch (error) {
        console.error("Critical Error in getFoodItemsByCategory:", error);
        next(error);
    }
};

const getFoodItemById = async (req, res, next) => {
    try {
        const foodItem = await foodService.getFoodItemById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        const itemObj = foodItem.toObject ? foodItem.toObject() : foodItem;
        const finalImageUrl = itemObj.imageUrl;
        res.status(200).json({
            ...itemObj,
            src: finalImageUrl,
            alt: itemObj.name
        });
    } catch (error) {
        console.error("Error in getFoodItemById:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid food item ID' });
        }
        next(error);
    }
};

const createFoodItem = async (req, res, next) => {
    try {
        const newFoodItem = await foodService.createFoodItem(req.body);
        const itemObj = newFoodItem.toObject ? newFoodItem.toObject() : newFoodItem;
        const finalImageUrl = itemObj.imageUrl;
        res.status(201).json({
            ...itemObj,
            src: finalImageUrl,
            alt: itemObj.name
        });
    } catch (error) {
        console.error("Error in createFoodItem:", error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Food item with this name already exists' });
        }
        next(error);
    }
};

const updateFoodItem = async (req, res, next) => {
    try {
        const updatedFoodItem = await foodService.updateFoodItem(req.params.id, req.body);
        if (!updatedFoodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        const itemObj = updatedFoodItem.toObject ? updatedFoodItem.toObject() : updatedFoodItem;
        const finalImageUrl = itemObj.imageUrl;
        res.status(200).json({
            ...itemObj,
            src: finalImageUrl,
            alt: itemObj.name
        });
    } catch (error) {
        console.error("Error in updateFoodItem:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid food item ID' });
        }
        next(error);
    }
};

const deleteFoodItem = async (req, res, next) => {
    try {
        const deletedFoodItem = await foodService.deleteFoodItem(req.params.id);
        if (!deletedFoodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json({ message: 'Food item removed successfully' });
    } catch (error) {
        console.error("Error in deleteFoodItem:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid food item ID' });
        }
        next(error);
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