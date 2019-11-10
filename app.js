require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const passport = require('passport');
const generateAdmin = require('./generateAdmin');
const router = express.Router();

var usersRouter = require('./routes/users');
var eventRouter = require('./routes/event');
var adminRouter = require('./routes/admin');
var participantRouter = require('./routes/participant');
var teamDetailsRouter = require('./routes/team');

var app = express();

//MONGOOSE CONFIGURATION
var mongoose = require('mongoose');
var util = require('util');
const db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

db.once('open', function() {
  console.log('Connected to DB');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));

app.use('/users', usersRouter);
app.use('/event', eventRouter);
app.use('/admin', adminRouter);
app.use('/participant', participantRouter);
app.use('/team', teamDetailsRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

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
  console.log(err);
  res.render('error');
});

generateAdmin();

module.exports = app;
