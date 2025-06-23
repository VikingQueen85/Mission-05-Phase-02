
const express = require('express');
const router = express.Router();
const {
    getFoodItems,
    getFoodItemsByCategory,
    getFoodItemById,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
} = require('../controllers/foodController');

// Define routes
router.route('/').get(getFoodItems).post(createFoodItem);
router.route('/category/:category').get(getFoodItemsByCategory);
router.route('/:id').get(getFoodItemById).put(updateFoodItem).delete(deleteFoodItem);

module.exports = router;