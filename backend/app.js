const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")

// enviroment variables
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var settingsRouter = require('./routes/settings');
const { userVerification} = require("./middleware/auth.js");

var app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DATABASE_NAME })
  .then(() => console.log('Connected to MongoDB database: ' + process.env.DATABASE_NAME))
  .catch(err => console.error('Could not connect to MongoDB database', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* 
CORS (Cross origin resource sharing):
Allows for requests from other domains to be used on server
*/
app.use(cors({
  origin: ["http://localhost:9000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  origin: 'http://localhost:3000',
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 
Cookie-parser middleware for cookie-based sessions, allows
for extraction of information from cookies, needed to get token values
out of a cookie.
*/
app.use(cookieParser());

//Routing for login page
app.use('/login', loginRouter);

/*
Custom middleware that every page (except login) of our application runs through.
This is used for authentication anytime an API call is made.
See ./middleware/auth.js for more info.
*/
app.use(userVerification);

app.use(express.static(path.join(__dirname, 'public')));

//Routing for pages
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/settings', settingsRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
