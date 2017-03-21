var express = require('express');
var router = express.Router();
var location = require('../modal/location');
var navigation = require('../modal/navigation');
var multer = require('multer');

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
    if (req.session.isAuthenticated) {
        console.log(req.body);

        // defining know data
        var data = {
            'floor': req.body.floor,
            'type': 'known',
            'name': req.body.name,
            'data_point': req.body.location,
            'entry_point': req.body.entry

        };

        console.log(data);

        var attributes = req.body.attribute;
        var tags = req.body.tag;

        location.insertLocation(data, function (id) {

            // applying id to attributes
            if (attributes != null) {
                for (var att in attributes) {
                    attributes[att][0] = id;
                    console.log(attributes[att]);
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

            res.json(JSON.stringify(true));

        });


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

        // defining know data
        var data = {
            'floor': req.body.floor,
            'type': 'unknown',
            'name': req.body.name,
            'data_point': req.body.location,
            'entry_point': req.body.entry

        };

        console.log(data);

        var attributes = req.body.attribute;
        var tags = req.body.tag;

        location.insertLocation(data, function (id) {

            // applying id to attributes
            if (attributes != null) {
                for (var att in attributes) {
                    attributes[att][0] = id;
                    console.log(attributes[att]);
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

            res.json(JSON.stringify(true));

        });


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

        // defining know data
        var data = {
            'floor': req.body.floor,
            'type': 'room',
            'name': req.body.name,
            'room_number': req.body.number,
            'room_cap': req.body.capacity,
            'data_point': req.body.location,
            'entry_point': req.body.entry

        };

        console.log(data);

        var attributes = req.body.attribute;
        var tags = req.body.tag;

        location.insertLocation(data, function (id) {

            // applying id to attributes
            if (attributes != null) {
                for (var att in attributes) {
                    attributes[att][0] = id;
                    console.log(attributes[att]);
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

            res.json(JSON.stringify(true));

        });


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

        // defining know data
        var data = {
            'floor': req.body.floor,
            'type': 'servicepoint',
            'name': req.body.name,
            'room_number': req.body.number,
            'url': req.body.url,
            'data_point': req.body.location,
            'entry_point': req.body.entry

        };

        console.log(data);

        var attributes = req.body.attribute;
        var tags = req.body.tag;

        location.insertLocation(data, function (id) {

            // applying id to attributes
            if (attributes != null) {
                for (var att in attributes) {
                    attributes[att][0] = id;
                    console.log(attributes[att]);
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

            res.json(JSON.stringify(true));

        });


    } else {
        res.render('error/login');
    }

});

/* Get Navigation Grid  page */
router.get('/navigation', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/navigation', {session: true})
    } else {
        res.render('error/login');
    }
});

/* Post Navigation Grid page */
router.post('/navigation', function (req, res, next) {
    if (req.session.isAuthenticated) {
        var data = {
            'floor': req.body.floor,
            'data': req.body.grid
        };

        console.log(data['floor']);

        navigation.insertGrid(data);
        //navigation.getGird
        res.json(JSON.stringify(true));
    } else {
        res.render('error/login');
    }
});

/* details of location */
router.get('/details/:id', function (req, res, next) {
    if (req.session.isAuthenticated) {

        /*location.getLocationById(req.params.id, function(results){
         res.render('dashboard/details', {session: true, data:results})
         });*/

        res.render('dashboard/details', {session: true, data: req.params.id})
    } else {
        res.render('error/login');
    }
});

/* details of location */
router.get('/details/data/:id', function (req, res, next) {
    if (req.session.isAuthenticated) {

        location.getLocationById(req.params.id, function (results) {

            res.json(JSON.stringify(results));
        });

    } else {
        res.render('error/login');
    }
});


/* Get Map Upload   page */
router.get('/mapupload', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/mapupload', {session: true})
    } else {
        res.render('error/login');
    }
});



var uploading = multer({
  dest:'../public/images/',
  limits: {fileSize: 1000000, files:1},
});


router.post('/mapupload', uploading.any(), function(req, res,next) {
 console.log(req.body, 'Body');
 console.log(req.files, 'files');
 res.end();

    
});



module.exports = router;
