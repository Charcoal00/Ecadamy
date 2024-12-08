const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Verify admin JWT for fetching all users.
exports.verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res
            .status(401)
            .json({ message: "Access Denied. No token was provided." });

    try {
        const verified = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        req.admin = verified;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Admin Token" });
    }
};
