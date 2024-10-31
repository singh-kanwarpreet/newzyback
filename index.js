const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./model/User'); 
const Notes = require('./model/notes'); 


const app = express();
const port = 3000;

// Middleware./
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://kanwarpreet388:5wU6YXaBAc3uUmVL@cluster0.uoahkxk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// Passport.js setup
require('./passport.js')(passport); 
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes




app.use('/news', require('./routes/news')); 
app.use('/notes', require('./routes/notes')); 
app.use('/', require('./routes/user')); 


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
