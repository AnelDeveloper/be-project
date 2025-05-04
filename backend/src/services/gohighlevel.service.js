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
        'Content-Type': 'application/json',
        'version': 'v1'
    }
});

// Rate limiting configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 2000; // 2 seconds
const MAX_RETRY_DELAY = 60000; // 60 seconds (1 minute)

// Utility function for delay
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to execute API calls with retry logic
const executeWithRetry = async (apiCall, retries = MAX_RETRIES, delay = INITIAL_RETRY_DELAY) => {
    try {
        return await apiCall();
    } catch (error) {
        // Check if error is rate limit related (429)
        if (error.statusCode === 429 && retries > 0) {
            console.log(`Rate limited by external API. Retrying after ${delay}ms. Retries left: ${retries}`);
            await wait(delay);

            // Exponential backoff with jitter for next retry
            const nextDelay = Math.min(delay * 2, MAX_RETRY_DELAY) * (0.8 + Math.random() * 0.4);

            // Retry the call with reduced retry count and increased delay
            return executeWithRetry(apiCall, retries - 1, nextDelay);
        }

        // For other errors or if we've exhausted retries, propagate the error
        throw error;
    }
};

// Contacts API service
const contactsService = {
    // Get all contacts with pagination
    getContacts: async (page = 1, limit = 20) => {
        return executeWithRetry(async () => {
            try {
                const response = await api.get('/contacts', {
                    params: { page, limit }
                });
                return response.data;
            } catch (error) {
                throw handleApiError(error);
            }
        });
    },

    // Get contact by ID
    getContactById: async (id) => {
        return executeWithRetry(async () => {
            try {
                const response = await api.get(`/contacts/${id}`);
                return response.data;
            } catch (error) {
                throw handleApiError(error);
            }
        });
    },

    // Create new contact
    createContact: async (contactData) => {
        return executeWithRetry(async () => {
            try {
                const response = await api.post('/contacts', contactData);
                return response.data;
            } catch (error) {
                throw handleApiError(error);
            }
        });
    },

    // Update existing contact
    updateContact: async (id, contactData) => {
        return executeWithRetry(async () => {
            try {
                const response = await api.put(`/contacts/${id}`, contactData);
                return response.data;
            } catch (error) {
                throw handleApiError(error);
            }
        });
    },

    // Delete contact
    deleteContact: async (id) => {
        return executeWithRetry(async () => {
            try {
                const response = await api.delete(`/contacts/${id}`);
                return response.data;
            } catch (error) {
                throw handleApiError(error);
            }
        });
    },

    // Search contacts
    searchContacts: async (query) => {
        return executeWithRetry(async () => {
            try {
                const response = await api.get('/contacts', { params: query });
                return response.data;
            } catch (error) {
                throw handleApiError(error);
            }
        });
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
            return rateLimitError;
        }

        const apiError = new Error(`GoHighLevel API Error (${statusCode}): ${JSON.stringify(errorData)}`);
        apiError.statusCode = statusCode;
        return apiError;
    } else if (error.request) {
        // The request was made but no response was received
        const noResponseError = new Error('No response received from GoHighLevel API');
        noResponseError.statusCode = 503; // Service Unavailable
        return noResponseError;
    } else {
        // Something happened in setting up the request that triggered an Error
        const requestError = new Error(`Error making request: ${error.message}`);
        requestError.statusCode = 500;
        return requestError;
    }
}

module.exports = contactsService; 