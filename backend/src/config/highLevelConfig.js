// HighLevel API Configuration
module.exports = {
    baseUrl: 'https://services.leadconnectorhq.com',
    endpoints: {
        opportunity: {
            get: '/opportunities/{opportunityId}',
            getAll: '/opportunities/location/{locationId}',
            create: '/opportunities/location/{locationId}',
            update: '/opportunities/{opportunityId}',
            delete: '/opportunities/{opportunityId}'
        }
    }
}; 