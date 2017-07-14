var express = require('express');
var router = express.Router();
var crypt  =  require('../classes/crypt');
var path = require('path');
var fs = require('fs');

// Config varaibes to be saved to .json file
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
    }
};

/* GET setup index page. */
router.get('/', function (req, res, next) {
    res.render('setup/index', {title: 'Express'});
});

/* POST setup index page. */
router.post('/', function (req, res, next) {
    config['login']['username'] = crypt.encrypt(req.body.masterUsername);
    config['login']['password'] = crypt.encrypt( req.body.masterPassword);
    config['database']['host'] = req.body.dbHost;
    config['database']['name'] = req.body.dbName;
    config['database']['username'] = crypt.encrypt(req.body.dbUsername);
    config['database']['password'] = crypt.encrypt( req.body.dbPassword);

    // write config informaion to file.
    fs.writeFile(path.join(__dirname, '../config/config.json'), JSON.stringify(config), function(err) {
        if(err) throw err;
        console.log('The config file was saved.');
    });
    res.json(JSON.stringify(true));

});


module.exports = router;
