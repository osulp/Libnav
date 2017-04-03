var express = require('express');
var router = express.Router();
var user = require('../classes/user');
/* GET users listing. */
/*router.get('/', function(req, res, next) {
 res.send('respond with a resource');
 });*/

/* GET user login */
router.get('/login', function (req, res, next) {
    res.render('user/login');
});

/* POST user login */
router.post('/login', function (req, res, next) {
    var isAuthenticated = false;

    isAuthenticated = user.authenticate(req.body.username, req.body.password);
    if (isAuthenticated) {
        req.session.isAuthenticated = true;
    }
    res.contentType('json');
    res.json(JSON.stringify(isAuthenticated));

});

/* GET user logut */
router.get('/logout', function (req, res, next) {
    req.session.isAuthenticated = false;
    res.redirect('/');
});


module.exports = router;
