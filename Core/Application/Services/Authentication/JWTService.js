const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

function generateToken (uid){
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: uid,
    }

    const token = jwt.sign(data, jwtSecretKey);

    return token;
}

function validateToken(req, res, next){
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            req.user = verified;
            return res.send("Successfully Verified");
        } else {
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = {
    generateToken: generateToken,
    validateToken: validateToken
};