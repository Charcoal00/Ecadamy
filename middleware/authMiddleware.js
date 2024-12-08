const jwt = require("jsonwebtoken");

// Verify general user JWT.
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res
            .status(401)
            .json({ message: "Access Denied. No token provided." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Token" });
    }
};

// Verify admin JWT for fetching all users.
exports.verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res
            .status(401)
            .json({ message: "Access Denied. No token provided." });

    try {
        const verified = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        req.admin = verified;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Admin Token" });
    }
};
