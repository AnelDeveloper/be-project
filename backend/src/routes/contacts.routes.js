const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts.controller');

// Get all contacts
router.get('/', contactsController.getAllContacts);

// Search contacts
router.get('/search', contactsController.searchContacts);

// Get contact by ID
router.get('/:id', contactsController.getContactById);

// Create new contact
router.post('/', contactsController.createContact);

// Update contact
router.put('/:id', contactsController.updateContact);

// Delete contact
router.delete('/:id', contactsController.deleteContact);

module.exports = router; 