var express = require('express');
var router = express.Router();
var encrypt  =  require('../classes/encrypt');
var fs = require('fs');

var config = {
    'login': {
        'username': null,
        'password': null
    },
    'database': {
        'host': null,
        'name': null,
        'username': null,
        'password': null
    },
    'salt': null
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('setup/index', {title: 'Express'});
});

/* GET home page. */
router.post('/', function (req, res, next) {
    var salt = encrypt.genSalt(16);
    config['login']['username'] = encrypt.hash(req.body.loginUsername, salt);
    config['login']['password'] = encrypt.hash( req.body.loginPassword, salt);
    config['database']['host'] = req.body.dbHost;
    config['database']['name'] = req.body.dbName;
    config['database']['username'] = encrypt.hash(req.body.dbUsername, salt);
    config['database']['password'] = encrypt.hash( req.body.dbPassword, salt);
    config['salt'] = salt;

    fs.writeFile('config/config.json', JSON.stringify(config));

    res.render('home/index', { title: 'Express' });

});


module.exports = router;
