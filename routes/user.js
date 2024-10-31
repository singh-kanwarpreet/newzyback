const express = require('express');
const router = express.Router();
const Notes = require('../model/User.js');
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');

// Sign Up Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try { 
    const user = new User({ email, password: hashedPassword });
    await user.save();
    // Send JSON response instead of redirecting
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
      // Send JSON response instead of redirecting
      return res.json({ success: true, message: 'Login successful'});
    });
  })(req, res, next);
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    // Send JSON response for logout confirmation
    res.json({ success: true, message: 'Logged out successfully' });
  });
});
module.exports = router;