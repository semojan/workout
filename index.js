const app = require("./Presentation/app");
const dotenv = require("dotenv");
const pool = require("./Infrastructure/database/db");

dotenv.config();

const port = process.env.PORT || 3000;


pool.connect().then(() => {
        app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
    });