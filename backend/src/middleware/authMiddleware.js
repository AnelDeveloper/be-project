const highLevelService = require('../services/highLevelService');

exports.authenticateRequest = (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'] || req.query.apiKey;

        if (!apiKey) {
            return res.status(401).json({
                success: false,
                message: 'API key is required'
            });
        }

        // Set API key for the HighLevel service
        highLevelService.setAuthToken(apiKey);

        next();
    } catch (error) {
        next(error);
    }
}; 