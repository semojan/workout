const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const AuthRoutes = require("./routes/AuthRoute");

const swaggerOptions = require("./config/swagger");

const app = express();

app.use(express.json());
console.log(swaggerOptions)
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(AuthRoutes);

module.exports = app;