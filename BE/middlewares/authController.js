// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    verifyToken,
};
