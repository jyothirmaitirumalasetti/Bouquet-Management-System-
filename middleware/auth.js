// middleware/auth.js
const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');
//   if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, 'mysecret');
//     req.user = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Token is not valid' });
//   }
// };

module.exports = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, 'mysecret');
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid token.' });
    }
  };

// module.exports = auth;
