var express = require('express');
var router = express.Router();
var location = require('../modal/location');
var navigation = require('../modal/navigation');


router.get('/grid', function (req, res, next) {

     navigation.getGrid(function (results) {
        res.contentType('json');
        res.json(JSON.stringify(results));
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

    location.getTags(req.body.location, function(results) {
        res.contentType('json');
        res.json(JSON.stringify(results))
    })
});



router.post("/getAttributes", function (req, res, next){
    location.getAttributes(req.body.location, function(results) {
        res.contentType('json');
        res.json(JSON.stringify(results))
    })
});
module.exports = router;