const express = require('express');
const router = express.Router();
const opportunitiesController = require('../controllers/opportunities.controller');

// Get all pipelines
router.get('/pipelines', opportunitiesController.getAllPipelines);

// Routes for a specific pipeline's opportunities
// Get all opportunities for a pipeline
router.get('/pipelines/:pipelineId/opportunities', opportunitiesController.getAllOpportunities);

// Search opportunities in a pipeline
router.get('/pipelines/:pipelineId/opportunities/search', opportunitiesController.searchOpportunities);

// Get opportunity by ID from a pipeline
router.get('/pipelines/:pipelineId/opportunities/:id', opportunitiesController.getOpportunityById);

// Create new opportunity in a pipeline
router.post('/pipelines/:pipelineId/opportunities', opportunitiesController.createOpportunity);

// Update opportunity in a pipeline
router.put('/pipelines/:pipelineId/opportunities/:id', opportunitiesController.updateOpportunity);

// Delete opportunity from a pipeline
router.delete('/pipelines/:pipelineId/opportunities/:id', opportunitiesController.deleteOpportunity);

module.exports = router; 