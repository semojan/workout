//requirements ----------------------------------------------------------------------------------
const app = require("./Presentation/app");
const dotenv = require("dotenv");
const {sequelize} = require("./Infrastructure/database/db");

dotenv.config();

const port = process.env.PORT || 3000;

//db connection initialization ------------------------------------------------------------------
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        // Sync models if necessary
        await sequelize.sync({ alter: true }); 
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the app if the database is unreachable
    }
})();
//-----------------------------------------------------------------------------------------------



app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
// pool.connect().then(() => {
//         app.listen(port, () => {
//         console.log(`Server running on port ${port}`);
//         });
//     })
//     .catch((err) => {
//         console.error("Failed to connect to the database:", err);
//     });