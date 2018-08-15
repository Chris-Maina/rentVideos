const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({
      status: 'failure',
      message: 'No token provided. Please login again. '
    });
    else {
      // verifies secret and checks exp
      const decoded = await jwt.verify(token, config.secret);
      req.loggedInUser = decoded.email;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ status: 'failue', message: 'There was a problem during authorization. Please login.'})
  }
};
