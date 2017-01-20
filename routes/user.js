var express = require('express');
var router = express.Router();
var user = require('../models/user');
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

/* GET user login */
router.get('/login', function(req, res, next) {
  res.render('user/login', {title: 'Express'});
});

/* POST user login */
router.post('/login', function(req, res, next) {
  user.authenticate(req.body.username);
  var body = '<p>Username: ' + req.body.username + '</p><p>Password: ' + req.body.password + '</p>';
  res.render('error/development', {title: 'Checking User login POST Data', body: body });
});

module.exports = router;
