const goHighLevelService = require('../services/gohighlevel.service');

// Get all pipelines
exports.getAllPipelines = async (req, res, next) => {
    try {
        const pipelines = await goHighLevelService.opportunities.getPipelines();

        res.status(200).json({
            status: 'success',
            data: pipelines
        });
    } catch (error) {
        next(error);
    }
};

// Get all opportunities for a specific pipeline
exports.getAllOpportunities = async (req, res, next) => {
    try {
        const { pipelineId } = req.params;
        const { limit, startAfterId, startAfter } = req.query;

        if (!pipelineId) {
            return res.status(400).json({
                status: 'error',
                message: 'Pipeline ID is required'
            });
        }

        const opportunities = await goHighLevelService.opportunities.getOpportunities(
            pipelineId,
            undefined,
            limit,
            startAfterId,
            startAfter
        );

        res.status(200).json({
            status: 'success',
            data: opportunities
        });
    } catch (error) {
        next(error);
    }
};

exports.getOpportunityById = async (req, res, next) => {
    try {
        const { pipelineId, id } = req.params;

        if (!pipelineId || !id) {
            return res.status(400).json({
                status: 'error',
                message: 'Pipeline ID and Opportunity ID are required'
            });
        }

        const opportunity = await goHighLevelService.opportunities.getOpportunityById(pipelineId, id);

        res.status(200).json({
            status: 'success',
            data: opportunity
        });
    } catch (error) {
        next(error);
    }
};

exports.createOpportunity = async (req, res, next) => {
    try {
        const { pipelineId } = req.params;
        const opportunityData = req.body;

        if (!pipelineId) {
            return res.status(400).json({
                status: 'error',
                message: 'Pipeline ID is required'
            });
        }

        const newOpportunity = await goHighLevelService.opportunities.createOpportunity(pipelineId, opportunityData);

        res.status(201).json({
            status: 'success',
            data: newOpportunity
        });
    } catch (error) {
        next(error);
    }
};

exports.updateOpportunity = async (req, res, next) => {
    try {
        const { pipelineId, id } = req.params;
        const opportunityData = req.body;

        if (!pipelineId || !id) {
            return res.status(400).json({
                status: 'error',
                message: 'Pipeline ID and Opportunity ID are required'
            });
        }

        const updatedOpportunity = await goHighLevelService.opportunities.updateOpportunity(pipelineId, id, opportunityData);

        res.status(200).json({
            status: 'success',
            data: updatedOpportunity
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteOpportunity = async (req, res, next) => {
    try {
        const { pipelineId, id } = req.params;

        if (!pipelineId || !id) {
            return res.status(400).json({
                status: 'error',
                message: 'Pipeline ID and Opportunity ID are required'
            });
        }

        await goHighLevelService.opportunities.deleteOpportunity(pipelineId, id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

exports.searchOpportunities = async (req, res, next) => {
    try {
        const { pipelineId } = req.params;
        const query = req.query;

        if (!pipelineId) {
            return res.status(400).json({
                status: 'error',
                message: 'Pipeline ID is required'
            });
        }

        const opportunities = await goHighLevelService.opportunities.searchOpportunities(pipelineId, query);

        res.status(200).json({
            status: 'success',
            data: opportunities
        });
    } catch (error) {
        next(error);
    }
}; 