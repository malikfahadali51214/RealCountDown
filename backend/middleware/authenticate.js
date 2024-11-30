// backend/middleware/authenticate.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = async (req, res, next) => {
  if (req.path === '/api/public/register' || req.path === '/api/public/login') {
    return next(); // Skip authentication for these endpoints
  }
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticate;