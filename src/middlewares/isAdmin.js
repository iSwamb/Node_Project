const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Only admins are allowed to perform this action.' });
    }
};

module.exports = isAdmin;