require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    gohighlevel: {
        apiKey: process.env.GOHIGHLEVEL_API_KEY,
        baseUrl: process.env.GOHIGHLEVEL_BASE_URL || 'https://rest.gohighlevel.com/v1'
    }
}; 