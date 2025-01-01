const Redis = require("redis");
require('dotenv').config();

// const client = Redis.createClient({
//     host: process.env.REDIS_HOST || '127.0.0.1',
//     port: process.env.REDIS_PORT || 6379,
// });
const client = Redis.createClient();

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.connect();

module.exports = client;