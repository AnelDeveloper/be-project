const goHighLevelService = require('../services/gohighlevel.service');

exports.getAllLocations = async (req, res, next) => {
    try {
        const locations = await goHighLevelService.locations.getLocations();

        res.status(200).json({
            status: 'success',
            data: locations
        });
    } catch (error) {
        next(error);
    }
};

exports.getLocationById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'Location ID is required'
            });
        }

        const location = await goHighLevelService.locations.getLocationById(id);

        res.status(200).json({
            status: 'success',
            data: location
        });
    } catch (error) {
        next(error);
    }
}; 