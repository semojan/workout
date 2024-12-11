const express = require("express");
const app = express();
const AuthRoutes = require("./routes/AuthRoute");

app.use(express.json());

app.use(AuthRoutes);

module.exports = app;