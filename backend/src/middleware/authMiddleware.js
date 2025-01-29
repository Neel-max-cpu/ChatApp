const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;


const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};


module.exports = authenticateUser;
