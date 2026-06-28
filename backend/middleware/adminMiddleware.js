module.exports = function (req, res, next) {
  // Check if req.user exists and has admin role
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied. Admin access only.' });
  }
};
