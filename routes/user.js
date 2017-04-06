var express = require('express');
var router = express.Router();
var user = require('../classes/user');
var userModal = require('../module/user');
var request = require('request');
var parseString = require('xml2js').parseString;

/* GET user login */
//router.get('/login', cas.bounce_redirect);
router.get('/login', function(req, res, next){
	res.redirect('https://login.oregonstate.edu/cas/login?service=http://fw-libnav.eecs.oregonstate.edu:3000/user/cas/validate');
});

/* GET user login */
router.get('/cas/validate', function (req, res, next) {

	// makes requres to cas with token to get session infomation
	request('https://login.oregonstate.edu/cas/serviceValidate?ticket=' + 
		req.query.ticket + 
		'&service=http://fw-libnav.eecs.oregonstate.edu:3000/user/cas/validate',
		function(error, responce, body){

			// parse cas xml
			parseString(body, {trim: true}, function (err, result) {
				// retrives onid from cas xml
				var onid = result['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];

				userModal.checkUser(onid,function(results){
					if(results != null){
						req.session.isAuthenticated = true;
						res.render('/dashboard', {session: true});
					} else {
						res.render('error/login');

					}
				});
			});
		});
	//https://login.oregonstate.edu/cas/serviceValidate?ticket=ST-1-klasfKF398FLKaa&service=http://example.oregonstate.edu

});

router.get('/cas/authorize', function(req,res,next){
	console.log('/cas/authorize');
	console.log(req.body);
	console.log(req.query);

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
