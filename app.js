var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
//var crypto  = require('crypto');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var mv = require('mv');



var config = null;


// setting routes variables
var routes = require('./routes/home');
var user = require('./routes/user');
var dashboard = require('./routes/dashboard');
var mapapi = require('./routes/mapapi');
var userapi = require('./routes/userapi');
var setup = null;

// Defining application
var app = express();

// config file set up
try {
    setup = require('./routes/setup');
} catch(e){ // do nothing
 }


// view engine setup
app.set('views', path.join(__dirname, 'views'));

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
// jquery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
// bootstrap
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
// font-awesome
app.use('/fontawesome', express.static(__dirname + '/node_modules/font-awesome/'));
// MetisMenu
app.use('/metismenu', express.static(__dirname + '/node_modules/metismenu/dist'));
// Pathfinding.js
app.use('/pathfinding', express.static(__dirname + '/node_modules/pathfinding'));
// D3.js
app.use('/d3', express.static(__dirname+ '/node_modules/d3'));
// Approve.js
app.use('/approvejs', express.static(__dirname + '/node_modules/approvejs/dist/'));
// Lodash
app.use('/lodash', express.static(__dirname + '/node_modules/lodash/'));
// Datatables
app.use('/datatable', express.static(__dirname + '/node_modules/datatables.net/'));
app.use('/datatable-bs', express.static(__dirname + '/node_modules/datatables.net-bs/'));
app.use('/datatable-responsive', express.static(__dirname + '/node_modules/datatables.net-responsive/'));
app.use('/datatable-responsive-bs', express.static(__dirname + '/node_modules/datatables.net-responsive-bs/'));
//fileupload
app.use(fileUpload());

//move
app.use('/mv', express.static(__dirname + '/node_modules/mv'));;


//fuse.js
app.use('/fuse',  express.static(__dirname + '/node_modules/fuse.js'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));






app.use(logger('dev'));
app.use(bodyParser.json({limit:'10000mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true, limit:'10000mb'})); // support encoded bodies
app.use(cookieParser());

// Populates req.session
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'keyboard cat'
}));

// Cas Setup

//mapUpload
app.post('/mapUpload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  let newSVGMap = req.files.newSVGMap;
  let floorNum = req.body.floorNum;
  newSVGMap.name = "floor-" + floorNum + ".svg";
  console.log(__dirname);
  
  uploadPath = __dirname + '/public/images/mapUploadtest/' + newSVGMap.name;

  newSVGMap.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
  });
    
  res.send('success');
    
});

// setting routes
app.use('/', routes);
app.use('/user', user);
app.use('/dashboard', dashboard);
app.use('/mapapi', mapapi);
app.use('/userapi', userapi);
// set setup script
try{
    app.use('/setup', setup);
}
catch(e){
    // do nothing
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error/development', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/index', {
        message: err.message,
        error: {}
    });
});





module.exports = app;
