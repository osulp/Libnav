var express = require('express');
var router = express.Router();
var location = require('../modal/location');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home/index', {title: 'Express'});
});

router.get('/home/location', function (req, res, next) {

    location.getLocationPoints(function (results) {

        res.contentType('json');
        res.json(JSON.stringify(results));
    })
});
module.exports = router;


