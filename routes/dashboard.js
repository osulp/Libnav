var express = require('express');
var router = express.Router();
var location = require('../modal/location');


/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/index', {session: true});
    } else {
        res.render('error/login');
    }
});

/* Get Known Location page */
router.get('/known', function (req, res, next) {
    if (1) {
        res.render('dashboard/known', {session: true});
    } else {
        res.render('error/login');

    }
});

/* Post Know Location page */
router.post('/known', function (req, res, next) {
    if (1) {
        console.log(req.body);

        // defining know data
        var data = {
            'floor': req.body.floor,
            'type': 'known',
            'name': req.body.name
        };

        var attributes = req.body.attribute;
        var tags = req.body.tag;
        var points = req.body.points;

        location.insertLocation(data, function (id) {

            // applying id to attributes
            if (attributes != null) {
                for (var att in attributes) {
                    attributes[att][0] = id;
                }
                location.insertAttribute(attributes);

            }

            // insuring attributes into attribute.
            if (tags != null) {

                // applying id to tags
                for (var att in tags) {
                    tags[att][0] = id;
                }

                // insert attributes into tags.
                location.insertTag(tags);
            }

            // insert points into point table
            if(points != null){
                // applying id to points
                for (var p in points) {
                    points[p][0] = id;
                }

                // insert attributes into tags.
                location.insertPoint(points);
            }

        });


        /*console.log(req.body);
         res.json(JSON.stringify(true));
         database.connect();
         console.log(database.connection);*/


    } else {
        res.render('error/login');
    }
});

/* Get Unknown Location page */
router.get('/unknown', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/unknown', {session: true})
    } else {
        res.render('error/login');
    }
});

/* Post Unknown Location page */
router.post('/unknown', function (req, res, next) {
    if (req.session.isAuthenticated) {
        console.log(req.body);
        res.json(JSON.stringify(true));
    } else {
        res.render('error/login');
    }
});

/* Get Room Location page */
router.get('/room', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/room', {session: true})
    } else {
        res.render('error/login');
    }
});

/* Post Room Location page */
router.post('/room', function (req, res, next) {
    if (req.session.isAuthenticated) {
        console.log(req.body);
        res.json(JSON.stringify(true));
    } else {
        res.render('error/login');
    }
});

/* Get Service Point Location page */
router.get('/servicepoint', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/servicepoint', {session: true})
    } else {
        res.render('error/login');
    }
});

/* Post Service Point Location page */
router.post('/servicepoint', function (req, res, next) {
    if (req.session.isAuthenticated) {
        console.log(req.body);
        res.json(JSON.stringify(true));
    } else {
        res.render('error/login');
    }
});


module.exports = router;
