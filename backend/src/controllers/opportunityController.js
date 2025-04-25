const highLevelService = require('../services/highLevelService');

exports.getOpportunity = async (req, res, next) => {
    try {
        const { opportunityId } = req.params;
        const data = await highLevelService.getOpportunity(opportunityId);
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllOpportunities = async (req, res, next) => {
    try {
        const { locationId } = req.params;
        const data = await highLevelService.getAllOpportunities(locationId);
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};


exports.createOpportunity = async (req, res, next) => {
    try {
        const { locationId } = req.params;
        const opportunityData = req.body;
        const data = await highLevelService.createOpportunity(locationId, opportunityData);
        res.status(201).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};


exports.updateOpportunity = async (req, res, next) => {
    try {
        const { opportunityId } = req.params;
        const opportunityData = req.body;
        const data = await highLevelService.updateOpportunity(opportunityId, opportunityData);
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};


exports.deleteOpportunity = async (req, res, next) => {
    try {
        const { opportunityId } = req.params;
        const data = await highLevelService.deleteOpportunity(opportunityId);
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
}; 