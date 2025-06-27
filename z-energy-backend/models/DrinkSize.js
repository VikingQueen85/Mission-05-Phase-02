
const mongoose = require('mongoose');

const drinkSizeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    extraCost: { type: Number, default: 0.00 }
});

const DrinkSize = mongoose.model('DrinkSize', drinkSizeSchema);

module.exports = DrinkSize;