
const mongoose = require('mongoose');

const foodItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name for the food item'],
            unique: true,
        },
        category: {
            type: String,
            required: [true, 'Please add a category (e.g., hot_drinks, cold_drinks, food, combo)'],
            enum: ['hot_drinks', 'cold_drinks', 'food', 'combo'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: 0,
        },
        description: {
            type: String,
            default: '',
        },
        imageUrl: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('FoodItem', foodItemSchema);