import jwt from 'jsonwebtoken';
import { findUserById, publicUser } from '../services/userStore.js';

export async function protect(req, res, next) {
  const authorization = req.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Authentication required. Provide a Bearer token.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'backend-nodejs-exercise3',
      audience: 'backend-nodejs-client'
    });
    if (!payload.sub || typeof payload.sub !== 'string') {
      return res.status(401).json({ error: 'Invalid authentication token.' });
    }
    const user = await findUserById(payload.sub);
    if (!user) return res.status(401).json({ error: 'The account for this token no longer exists.' });
    req.user = publicUser(user);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') return res.status(401).json({ error: 'Your token has expired. Please log in again.' });
    if (error.name === 'JsonWebTokenError' || error.name === 'NotBeforeError') return res.status(401).json({ error: 'Invalid authentication token.' });
    return next(error);
  }
}

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Authentication required.' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'You do not have permission to access this resource.' });
    }
    return next();
  };
}
