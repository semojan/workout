const { verifyToken } = require("../../Core/Application/Services/Authentication/JWTService");

const TOKEN_HEADER_KEY = process.env.TOKEN_HEADER_KEY || 'authorization';

function optionalAuth(req, res, next) {
    const authHeader = req.header(TOKEN_HEADER_KEY);

    if (!authHeader) {
        return next();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next();
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
    } catch (error) {
        req.user = null;
    }

    next();
}

module.exports = optionalAuth;
