const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

function generateToken(uid) {
    const data = {
        time: Date(),
        userId: uid,
    };
    return jwt.sign(data, jwtSecretKey);
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecretKey);
}

module.exports = {
    generateToken,
    verifyToken,
};
