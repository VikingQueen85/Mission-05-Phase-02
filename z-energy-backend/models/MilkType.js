
const mongoose = require('mongoose');

const milkTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    extraCost: { type: Number, default: 0.00 }
});

const MilkType = mongoose.model('MilkType', milkTypeSchema);

module.exports = MilkType;