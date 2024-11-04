import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
console.log('JWT Secret:', process.env.JWT_SECRET);


  if (token == null) return res.sendStatus(401); // If no token, return 401 Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid, return 403 Forbidden
    req.user = user; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  });
};