const { verifyToken } = require("../../Core/Application/Services/Authentication/JWTService");

const TOKEN_HEADER_KEY = process.env.TOKEN_HEADER_KEY || 'authorization';

function validateToken(req, res, next) {
    const authHeader = req.header(TOKEN_HEADER_KEY);
    if (!authHeader) {
        const err = new Error('Authorization header missing');
        err.status = 401;
        return next(err);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        const err = new Error('Token missing');
        err.status = 401;
        return next(err);
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        const err = new Error('Invalid or expired token');
        err.status = 403;
        return next(err);
    }
}

module.exports = validateToken;
