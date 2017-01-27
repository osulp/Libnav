var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var PF = require('pathfinding');
var d3 = require('d3');
var routes = require('./routes/home');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
/*app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');*/

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
  // Uses multiple partials dirs, partials in "shared/partials/" are shared
  // with the client-side of the app (see below).
  partialsDir: [
    'views/partials'
  ]
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// public folder
app.use('/public', express.static(__dirname + '/public/'));
// Jquery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
// Bootstrap
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
// Bootstrap
app.use('/fontawesome', express.static(__dirname + '/node_modules/font-awesome/'));
// MetisMenu
app.use('/metismenu', express.static(__dirname + '/node_modules/metismenu/dist'));
// Pathfinding.js
app.use('/pathfinding', express.static(__dirname + '/node_modules/pathfinding'));
//d3.js
app.use('/d3', express.static(__dirname+ '/node_modules/d3'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/dashboard',dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
