const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user._doc.admin) return res.status(401).end('unauthorized');
  next();
};

module.exports = {
  requireAdmin
};
