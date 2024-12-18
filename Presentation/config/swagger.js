const path = require("path");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Workout Tracker API",
            description: "CRUD API for managing workout plans",
            version: "1.0.0",
        },
        servers: [
            {
                url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000"
            }
        ],
    },
    apis:  [path.join(__dirname, "../routes/*.js")], 
};
  
module.exports = swaggerOptions;