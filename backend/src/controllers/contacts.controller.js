const goHighLevelService = require('../services/gohighlevel.service');

exports.getAllContacts = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const contacts = await goHighLevelService.contacts.getContacts(page, limit);

        res.status(200).json({
            status: 'success',
            data: contacts
        });
    } catch (error) {
        next(error);
    }
};

exports.getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await goHighLevelService.contacts.getContactById(id);

        res.status(200).json({
            status: 'success',
            data: contact
        });
    } catch (error) {
        next(error);
    }
};

exports.createContact = async (req, res, next) => {
    try {
        const contactData = req.body;
        const newContact = await goHighLevelService.contacts.createContact(contactData);

        res.status(201).json({
            status: 'success',
            data: newContact
        });
    } catch (error) {
        next(error);
    }
};

exports.updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contactData = req.body;
        const updatedContact = await goHighLevelService.contacts.updateContact(id, contactData);

        res.status(200).json({
            status: 'success',
            data: updatedContact
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        await goHighLevelService.contacts.deleteContact(id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

exports.searchContacts = async (req, res, next) => {
    try {
        const query = req.query;
        const contacts = await goHighLevelService.contacts.searchContacts(query);

        res.status(200).json({
            status: 'success',
            data: contacts
        });
    } catch (error) {
        next(error);
    }
}; 