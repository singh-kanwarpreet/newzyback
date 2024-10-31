const express = require('express');
const router = express.Router();
const User = require('../model/User.js'); // Corrected import
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('connect-flash'); // Added flash import
const session = require('express-session');

router.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

// Sign Up Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try { 
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ success: true, message: 'Signup successful' });
  } catch (e) {
    res.status(400).json({ success: false, message: 'Signup failed' });
  }
});

// Login Route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Login failed' });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, message: 'Login successful' });
    });
  })(req, res, next);
});

// Logout Route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

module.exports = router;
