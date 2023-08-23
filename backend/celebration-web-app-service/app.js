var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var authMiddleware = require('./middlewares/auth')

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var eventRouter = require('./routes/event');
var companyRouter = require('./routes/company');
var employeeRouter = require('./routes/employee');
var imgUploadRouter = require('./routes/imgUpload');
var exportDataRouter = require('./routes/exportData');

var bodyParser = require('body-parser');
var multer = require('multer');
require('@prisma/client');
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/adminDataBaseUrl', authMiddleware, adminRouter);
app.use('/eventDataBaseUrl', authMiddleware, eventRouter);
app.use('/companyDataBaseUrl', authMiddleware, companyRouter);
app.use('/employeeDataBaseUrl', authMiddleware, employeeRouter);
app.use('/imgDataBaseUrl', authMiddleware, imgUploadRouter);
app.use('/exportData', exportDataRouter);
app.use('/', indexRouter);

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
