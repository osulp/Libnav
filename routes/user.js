var express = require('express');
var router = express.Router();
var user = require('../classes/user');
var userModal = require('../modal/user');
var request = require('request');
var parseString = require('xml2js').parseString;
var hostname = 'lib-sandbox.library.oregonstate.edu';

/* GET user login */
router.get('/login', function(req, res, next){
	res.redirect('https://login.oregonstate.edu/cas/login?service=http://' + hostname + '/user/login/authenticate');
});

/* GET user login */
router.get('/login/authenticate', function (req, res, next) {

	// makes requres to cas with token to get session infomation
	request('https://login.oregonstate.edu/cas/serviceValidate?ticket=' + 
		req.query.ticket + 
		'&service=http://' + hostname + '/user/login/authenticate',
		function(error, responce, body){

			// parse cas xml
			parseString(body, {trim: true}, function (err, result) {

console.log(result);
				// retrives onid from cas xml
				var onid = result['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];

				// Query database for matching onids
				userModal.checkUser(onid,function(result){
					for(var r in result){
						console.log(result[r].onid + ' ? ' + onid );
						if(result[r].onid == onid){
							req.session.isAuthenticated = true;
						}
					}

					if (req.session.isAuthenticated) {
						res.render('dashboard/index', {session: true});
					} else {
						res.render('error/login');

					}

				});
			});
		});
	//https://login.oregonstate.edu/cas/serviceValidate?ticket=ST-1-klasfKF398FLKaa&service=http://example.oregonstate.edu


});

/* GET user login for master */
router.get('/login/master', function (req, res, next) {
	res.render('user/login');
});

/* POST user login for master */
router.post('/login/master', function (req, res, next) {
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
