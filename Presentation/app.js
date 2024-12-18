const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authMiddleware = require("./middlewares/authMiddleware");

//routes ---------------------------------------------------------------------
const AuthRoutes = require("./routes/AuthRoute");
const ExerciseRoutes = require("./routes/ExerciseRoute");

const swaggerOptions = require("./config/swagger");

const app = express();

app.use(express.json());
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(AuthRoutes);
app.use("/exercises", authMiddleware, ExerciseRoutes);

//error handling -------------------------------------------------------------
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        message: err.message || 'Internal Server Error',
    });
});


module.exports = app;