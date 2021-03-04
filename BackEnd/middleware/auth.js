const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   const token = req.header('x-auth-token');

   if (!token) return res.status(401).json({ msg: 'No token...' });
   try {
      const decoded = jwt.decode(token, process.env.jwtSecret);
      if (decoded.currentUser.role !== true) {
         return res.status(401).json({ msg: '...' });
      }
      req.currentUser = decoded.currentUser;
      next();
   } catch (errors) {
      console.error(errors.message);
      res.status(401).json({ msg: 'Token not valid' });
   }
}