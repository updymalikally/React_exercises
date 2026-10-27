import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/auth.js';
import { createUser, findUserByEmail, publicUser } from '../services/userStore.js';

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function issueToken(user) {
  return jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    issuer: 'backend-nodejs-exercise3',
    audience: 'backend-nodejs-client'
  });
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (normalizedName.length < 2 || normalizedName.length > 80) {
    return res.status(400).json({ error: 'Name must be between 2 and 80 characters.' });
  }
  if (!emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
    return res.status(400).json({ error: 'Provide a valid email address.' });
  }
  if (typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
    return res.status(400).json({ error: 'Password must be at least 8 characters and no more than 72 UTF-8 bytes.' });
  }

  let role = 'user';
  if (req.body.role !== undefined) {
    if (!['user', 'admin'].includes(req.body.role)) return res.status(400).json({ error: 'Role must be either user or admin.' });
    if (req.body.role === 'admin') {
      const adminCode = process.env.ADMIN_REGISTRATION_CODE;
      if (!adminCode || typeof req.body.adminCode !== 'string' || req.body.adminCode !== adminCode) {
        return res.status(403).json({ error: 'A valid admin registration code is required to create an admin account.' });
      }
      role = 'admin';
    }
  }

  try {
    if (await findUserByEmail(normalizedEmail)) return res.status(409).json({ error: 'An account with this email already exists.' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser({
      id: randomUUID(),
      name: normalizedName,
      email: normalizedEmail,
      passwordHash,
      role,
      createdAt: new Date().toISOString()
    });
    return res.status(201).json({ message: 'Account created successfully.', token: issueToken(user), user: publicUser(user) });
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.status ? error.message : 'Unable to create the account right now.' });
  }
});

router.post('/login', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

  try {
    const user = await findUserByEmail(email);
    const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash) : false;
    if (!passwordMatches) return res.status(401).json({ error: 'Email or password is incorrect.' });
    return res.json({ message: 'Login successful.', token: issueToken(user), user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ error: 'Unable to log in right now.' });
  }
});

router.get('/profile', protect, (req, res) => res.json({ user: req.user }));

export default router;
