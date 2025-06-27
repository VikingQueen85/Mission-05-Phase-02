
const mongoose = require('mongoose');

const flavorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    extraCost: { type: Number, default: 0.00 }
});

const Flavor = mongoose.model('Flavor', flavorSchema);

module.exports = Flavor;