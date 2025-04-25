const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');
const { authenticateRequest } = require('../middleware/authMiddleware');

router.use(authenticateRequest);

router.get('/:opportunityId', opportunityController.getOpportunity);

router.get('/location/:locationId', opportunityController.getAllOpportunities);

router.post('/location/:locationId', opportunityController.createOpportunity);

router.put('/:opportunityId', opportunityController.updateOpportunity);

router.delete('/:opportunityId', opportunityController.deleteOpportunity);

module.exports = router; 