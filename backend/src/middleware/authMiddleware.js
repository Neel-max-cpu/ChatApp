const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization'); // Tokens are typically sent in the Authorization header

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach the decoded user data to the request object
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token." });
    }
};

module.exports = authenticateUser;
