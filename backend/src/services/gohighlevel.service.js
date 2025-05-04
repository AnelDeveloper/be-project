const axios = require('axios');
const config = require('../config');

// Configuration
const API_KEY = config.gohighlevel.apiKey;
const BASE_URL = config.gohighlevel.baseUrl;

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    }
});

// Contacts API service
const contactsService = {
    // Get all contacts with pagination
    getContacts: async (page = 1, limit = 20) => {
        try {
            const response = await api.get('/contacts', {
                params: { page, limit }
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // Get contact by ID
    getContactById: async (id) => {
        try {
            const response = await api.get(`/contacts/${id}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // Create new contact
    createContact: async (contactData) => {
        try {
            const response = await api.post('/contacts', contactData);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // Update existing contact
    updateContact: async (id, contactData) => {
        try {
            const response = await api.put(`/contacts/${id}`, contactData);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // Delete contact
    deleteContact: async (id) => {
        try {
            const response = await api.delete(`/contacts/${id}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // Search contacts
    searchContacts: async (query) => {
        try {
            const response = await api.get('/contacts', { params: query });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
};

// Error handler
function handleApiError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const statusCode = error.response.status;
        const errorData = error.response.data;

        // Handle rate limiting specifically
        if (statusCode === 429) {
            const rateLimitError = new Error(`Rate limit exceeded: ${JSON.stringify(errorData)}`);
            rateLimitError.statusCode = 429;
            rateLimitError.rateLimited = true;
            throw rateLimitError;
        }

        const apiError = new Error(`GoHighLevel API Error (${statusCode}): ${JSON.stringify(errorData)}`);
        apiError.statusCode = statusCode;
        throw apiError;
    } else if (error.request) {
        // The request was made but no response was received
        const noResponseError = new Error('No response received from GoHighLevel API');
        noResponseError.statusCode = 503; // Service Unavailable
        throw noResponseError;
    } else {
        // Something happened in setting up the request that triggered an Error
        const requestError = new Error(`Error making request: ${error.message}`);
        requestError.statusCode = 500;
        throw requestError;
    }
}

module.exports = contactsService; 