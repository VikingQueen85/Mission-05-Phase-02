
const mongoose = require('mongoose');

const coffeeStrengthSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    extraCost: { type: Number, default: 0.00 }
});

const CoffeeStrength = mongoose.model('CoffeeStrength', coffeeStrengthSchema);

module.exports = CoffeeStrength;