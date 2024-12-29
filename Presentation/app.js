const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authMiddleware = require("./middlewares/authMiddleware");
const optionalAuthMiddleware = require("./middlewares/optionalAuthMiddleware");

//routes ---------------------------------------------------------------------
const AuthRoutes = require("./routes/AuthRoutes");
const ExercisePublicRoutes = require("./routes/ExercisePublicRoute");
const ExerciseRoutes = require("./routes/ExerciseRoutes");
const WorkoutPublicRoutes = require("./routes/WorkoutPublicRoutes");
const WorkoutPrivateRoutes = require("./routes/WorkoutPrivateRoutes");
const WorkoutScheduleRoutes = require("./routes/WorkoutScheduleRoutes");
const CommentsRoutes = require("./routes/CommentRoute");

const swaggerOptions = require("./config/swagger");

const app = express();

app.use(express.json());
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(AuthRoutes);
app.use("/exercises", optionalAuthMiddleware, ExercisePublicRoutes);
app.use("/exercises", authMiddleware, ExerciseRoutes);
app.use("/workout", optionalAuthMiddleware, WorkoutPublicRoutes);
app.use("/workout", authMiddleware, WorkoutPrivateRoutes);
app.use("/workout/schedule", authMiddleware, WorkoutScheduleRoutes);
app.use("/comments", optionalAuthMiddleware, CommentsRoutes);

//error handling -------------------------------------------------------------
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        message: err.message || 'Internal Server Error',
    });
});


module.exports = app;