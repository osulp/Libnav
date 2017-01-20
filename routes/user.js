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
  user.openconfig();
  if(user.authenticate(req.body.username, req.body.password)){
    req.session.authenticated = true;
    res.redirect('/dashboard')
  }
  res.redirect('/login');
});

module.exports = router;
