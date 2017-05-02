 var express = require('express');
var router = express.Router();
var location = require('../modal/location');
var navigation = require('../modal/navigation');

/**
 * GETS all grids from database
 */

router.get('/grids', function (req, res, next) {
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

/**
 * GETS Search term
 * Depercated
 */
router.get('/getSearch', function(req, res,next){
    location.getSearch(function (results) {
        res.contentType('json');
        res.json(JSON.stringify(results));
    })
});

/**
 * GETS tags
 * Depercated
 */

router.post("/getTags", function (req, res, next){

    location.getTags(req.body.location, function(results) {
        res.contentType('json');
        res.json(JSON.stringify(results))
    })
});

/**
 * GETS attributes
 * Depercated
 */

router.post("/getAttributes", function (req, res, next){
    location.getAttributes(req.body.location, function(results) {
        res.contentType('json');
        res.json(JSON.stringify(results))
    })
});

/**
 * GETS entrypoints of location
 * Depercated
 */

router.post("/getEntryPoint", function (req, res, next){
    location.getEntryPoint(req.body.location, function(results) {
        res.contentType('json');
        res.json(JSON.stringify(results))
    })
});
module.exports = router;