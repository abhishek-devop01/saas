const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ message: 'Authentication required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) return res.status(401).json({ message: 'Invalid token' });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token verification failed' });
    }
};

module.exports = authenticate;
