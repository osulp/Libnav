var express = require('express');
var router = express.Router();
var location = require('../modal/location');

/*
    GET get all locations
 */
router.get('/getAllLocation', function (req, res, next) {

    location.getLocations(function (results) {

        res.contentType('json');
        res.json(JSON.stringify(results));
    })
});
module.exports = router;

router.get("/getTags", function (req, res, next){
    location.getTags(location, function(results) {
        res.contentType('json');
        res.json(JSON.stringify(results))
    })
});
module.exports = router;


router.get("/getAttributes", function (req, res, next){
    location.getAttributes(function(results) {
        res.contentType('json');
        res.json(JSON.stringify(results))
    })
});
module.exports = router;