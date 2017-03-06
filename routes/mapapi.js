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

router.post("/getTags", function (req, res, next){
    console.log("in get tags")
    console.log(req.body.location)
    location.getTags(req.body.location, function(results) {
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