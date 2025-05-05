const express = require('express');
const router = express.Router();

const contactsRoutes = require('./contacts.routes');
const opportunitiesRoutes = require('./opportunities.routes');
const locationsRoutes = require('./locations.routes');

router.use('/contacts', contactsRoutes);
router.use('/opportunities', opportunitiesRoutes);
router.use('/locations', locationsRoutes);

module.exports = router; 