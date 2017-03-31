var express = require('express');
var router = express.Router();
var user = require('../classes/user');
var CASAuthentication = require('cas-authentication');


// Create a new instance of CASAuthentication. 
var cas = new CASAuthentication({
    cas_url     : 'https://login.oregonstate.edu/cas/login',
    service_url : '10.214.154.52:3000/user/login/cas'
});


/* GET user login */
router.get('/login', function (req, res, next) {
    res.redirect(cas.cas_url);
});

/* POST user login */
router.post('/login', function (req, res, next) {
    // get info back to CAS 

});

/* GET user login for master */
router.get('/login/master', function (req, res, next) {
    res.render('user/login');
});

/* POST user login for master */
router.post('/login/master', function (req, res, next) {
    console.log("In post method")
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
