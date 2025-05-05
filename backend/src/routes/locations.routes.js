const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations.controller');

// Get all locations
router.get('/', locationsController.getAllLocations);

// Get location by ID
router.get('/:id', locationsController.getLocationById);

module.exports = router; 