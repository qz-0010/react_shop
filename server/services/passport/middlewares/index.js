const requireAdmin = (req, res, next) => {
  if(!req.user || !req.user._doc.admin) return res.end('unavailable');
  next();
}

module.exports = {
  requireAdmin
}