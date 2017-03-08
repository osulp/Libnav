var express = require('express');
var router = express.Router();
var location = require('../modal/location');

router.get('/mapapi/grid', function (req, res, next) {

    location.getLocationPoints(function (results) {

    });
});

/*
    GET get all locations
 */
router.get('/getAllLocation', function (req, res, next) {

    location.getLocations(function (results) {

        res.contentType('json');
        res.json(JSON.stringify(results));
    })

});


router.post("/getTags", function (req, res, next){
    console.log("in get tags")
    console.log(req.body.location)
    location.getTags(req.body.location, function(results) {
        res.contentType('json');
        res.json(JSON.stringify(results))
    })
});



router.post("/getAttributes", function (req, res, next){
    location.getAttributes(req.body.location, function(results) {
        res.contentType('json');
        console.log(results);
        res.json(JSON.stringify(results))
    })
});
module.exports = router;