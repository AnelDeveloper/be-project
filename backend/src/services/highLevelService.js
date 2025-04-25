const axios = require('axios');
const config = require('../config/highLevelConfig');

class HighLevelService {
    constructor() {
        this.baseUrl = config.baseUrl;
        this.endpoints = config.endpoints;
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
    }


    setAuthToken(apiKey) {
        this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
    }

    async getOpportunity(opportunityId) {
        try {
            const endpoint = this.endpoints.opportunity.get.replace('{opportunityId}', opportunityId);
            const response = await this.client.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error getting opportunity:', error.message);
            throw error;
        }
    }

    async getAllOpportunities(locationId) {
        try {
            const endpoint = this.endpoints.opportunity.getAll.replace('{locationId}', locationId);
            const response = await this.client.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error getting all opportunities:', error.message);
            throw error;
        }
    }


    async createOpportunity(locationId, opportunityData) {
        try {
            const endpoint = this.endpoints.opportunity.create.replace('{locationId}', locationId);
            const response = await this.client.post(endpoint, opportunityData);
            return response.data;
        } catch (error) {
            console.error('Error creating opportunity:', error.message);
            throw error;
        }
    }


    async updateOpportunity(opportunityId, opportunityData) {
        try {
            const endpoint = this.endpoints.opportunity.update.replace('{opportunityId}', opportunityId);
            const response = await this.client.put(endpoint, opportunityData);
            return response.data;
        } catch (error) {
            console.error('Error updating opportunity:', error.message);
            throw error;
        }
    }


    async deleteOpportunity(opportunityId) {
        try {
            const endpoint = this.endpoints.opportunity.delete.replace('{opportunityId}', opportunityId);
            const response = await this.client.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error deleting opportunity:', error.message);
            throw error;
        }
    }
}

module.exports = new HighLevelService(); 