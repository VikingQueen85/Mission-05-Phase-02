
const express = require('express');
const router = express.Router();

// Import all models from the centralized index file
const { DrinkSize, MilkType, CoffeeStrength, Flavor } = require('../models');

// Route to get all drink sizes
router.get('/sizes', async (req, res, next) => {
  try {
    const sizes = await DrinkSize.find({});
    res.json(sizes);
  } catch (err) {
    next(err);
  }
});

// Route to get all milk types
router.get('/milks', async (req, res, next) => {
  try {
    const milks = await MilkType.find({});
    res.json(milks);
  } catch (err) {
    next(err);
  }
});

// Route to get all coffee strengths
router.get('/strengths', async (req, res, next) => {
  try {
    const strengths = await CoffeeStrength.find({});
    res.json(strengths);
  } catch (err) {
    next(err);
  }
});

// Route to get all flavors
router.get('/flavors', async (req, res, next) => {
  try {
    const flavors = await Flavor.find({});
    res.json(flavors);
  } catch (err) {
    next(err);
  }
});

module.exports = router;