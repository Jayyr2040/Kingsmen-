// DEPENDENCIES
require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
//const User = require('./controllers/users');

// MIDDLEWARE
// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
// static files middleware
app.use(express.static('public'))
app.use(session({
  secret: process.env.SECRET, //some random string
  resave: false,
  saveUninitialized: false
}));


// CONTROLLERS
// fitting room three
const roomController = require('./controllers/room.js');
app.use('/room', roomController);
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);


// GET INDEX
app.get('/', (req, res) => {
 const isAuthenticated = req.session.currentUser;
 res.render('index.ejs', {isAuthenticated});

});


// SEED ROUTE
// NOTE: Do NOT run this route until AFTER you have a create user route up and running, as well as encryption working!
const seed = require('./models/seed.js');
const User = require('./models/users.js');

app.get('/seedAgents', (req, res) => {
  // encrypts the given seed passwords
  seed.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });
  // seeds the data
  User.create(seed, (err, createdUsers) => {
    // logs created users
    console.log(createdUsers);
    // redirects to index
    res.redirect('/');
  });
});


// CONNECTIONS
app.listen(port , () => {
  console.log('listening on port: ', port);
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
