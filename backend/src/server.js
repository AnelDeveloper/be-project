require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const config = require('./config');

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    // Log detailed error information for debugging
    console.error('ERROR DETAILS:');
    console.error(`Error message: ${err.message}`);
    console.error(`Error stack: ${err.stack}`);
    console.error(`Request path: ${req.path}`);
    console.error(`Request method: ${req.method}`);
    console.error(`Request body: ${JSON.stringify(req.body)}`);

    // Handle rate limit errors specifically
    if (err.statusCode === 429) {
        return res.status(429).json({
            status: 'error',
            message: 'API rate limit exceeded. Please try again later.',
            retryAfter: err.retryAfter || '1 minute'
        });
    }

    // Handle other API errors with appropriate status codes
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    // Default error response for unexpected errors
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong on the server'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 