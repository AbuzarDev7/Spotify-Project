const jwt = require('jsonwebtoken');
const userModal = require('../models/user.modal');

const protect = async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModal.findById(decoded.userId).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

const isArtist = (req, res, next) => {
    if (req.user && req.user.role === 'artist') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Only artists can perform this action." });
    }
};

module.exports = { protect, isArtist };
