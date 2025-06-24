
const mongoose = require('mongoose');

// Define the schema for your food items
const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true, enum: ['hot_drinks', 'cold_drinks', 'food', 'combo']},
    price: { type: Number, required: true, min: 0 },
    description: { type: String },
    imageUrl: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.models.FoodItem || mongoose.model('FoodItem', foodItemSchema);
