var express = require('express');
var router = express.Router();
var location = require('../modal/location');
var navigation = require('../modal/navigation');
var user = require('../modal/user');
var multer = require('multer');
var fs = require('fs');
var mv = require('mv');


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
        res.render('dashboard/known', {session: true, data:"null"});
    } else {
        res.render('error/login');

    }
});

/* Post Know Location page */
router.post('/known', function (req, res, next) {
    if (req.session.isAuthenticated) {

        // defining know data
        var data = {
            'floor': req.body.floor,
            'type': req.body.type,
            'name': req.body.name,
            'color' : req.body.color,
            'display' : req.body.display,
            'tag' : req.body.tag,
            'attribute' : req.body.attribute,
            'data_point': req.body.location,
            'entry_point': req.body.entry

        };

        if(!req.body.update){
            //res.json(JSON.stringify(true));

            location.insertLocation(data, function (id) {

                res.json(JSON.stringify(true));

            });
        }
        else{
            //res.json(JSON.stringify(true));

            location.updateLocation(data, req.body.id, function (results) {
                res.json(JSON.stringify(true));

            });
        }


    } else {
        res.render('error/login');
    }
});

/* Get Unknown Location page */
router.get('/unknown', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/unknown', {session: true, data:"null"})
    } else {
        res.render('error/login');
    }
});

/* Post Unknown Location page */
router.post('/unknown', function (req, res, next) {
    if (req.session.isAuthenticated) {

        // defining know data
        var data = {
            'floor': req.body.floor,
            'type': req.body.type,
            'name': req.body.name,
            'color' : req.body.color,
            'display' : req.body.display,
            'tag' : req.body.tag,
            'attribute' : req.body.attribute,
            'data_point': req.body.location,
            'entry_point': req.body.entry

        };

        var attributes = req.body.attribute;
        var tags = req.body.tag;

        if(!req.body.update){
            //res.json(JSON.stringify(true));

            location.insertLocation(data, function (id) {

                res.json(JSON.stringify(true));

            });
        }
        else{
            //res.json(JSON.stringify(true));

            location.updateLocation(data, req.body.id, function (results) {
                res.json(JSON.stringify(true));

            });
        }


    } else {
        res.render('error/login');
    }
});

/* Get Room Location page */
router.get('/room', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/room', {session: true, data:"null"})
    } else {
        res.render('error/login');
    }
});

/* Post Room Location page */
router.post('/room', function (req, res, next) {
    if (req.session.isAuthenticated) {

        // defining know data
        var data = {
            'floor': req.body.floor,
            'type': req.body.type,
            'name': req.body.name,
            'color' : req.body.color,
            'display' : req.body.display,
            'room_number': req.body.number,
            'room_cap': req.body.capacity,
            'tag' : req.body.tag,
            'attribute' : req.body.attribute,
            'data_point': req.body.location,
            'entry_point': req.body.entry

        };


        var attributes = req.body.attribute;
        var tags = req.body.tag;

        if(!req.body.update){
            //res.json(JSON.stringify(true));

            location.insertLocation(data, function (id) {

                res.json(JSON.stringify(true));

            });
        }
        else{
            //res.json(JSON.stringify(true));

            location.updateLocation(data, req.body.id, function (results) {
                res.json(JSON.stringify(true));

            });
        }


    } else {
        res.render('error/login');
    }
});

/* Get Service Point Location page */
router.get('/servicepoint', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/servicepoint', {session: true, data:"null"})
    } else {
        res.render('error/login');
    }
});

/* Post Service Point Location page */
router.post('/servicepoint', function (req, res, next) {
    if (req.session.isAuthenticated) {

        // defining know data
        var data = {
            'floor': req.body.floor,
            'type': req.body.type,
            'name': req.body.name,
            'color' : req.body.color,
            'display' : req.body.display,
            'room_number': req.body.number,
            'url': req.body.url,
            'tag' : req.body.tag,
            'attribute' : req.body.attribute,
            'data_point': req.body.location,
            'entry_point': req.body.entry

        };

        var attributes = req.body.attribute;
        var tags = req.body.tag;

        if(!req.body.update){
            //res.json(JSON.stringify(true));

            location.insertLocation(data, function (id) {

                res.json(JSON.stringify(true));

            });
        }
        else{
            //res.json(JSON.stringify(true));

            location.updateLocation(data, req.body.id, function (results) {
                res.json(JSON.stringify(true));

            });
        }

    } else {
        res.render('error/login');
    }
});

/* Get Navigation Grid  page */
router.get('/navigation', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/navigation', {session: true, data:null})
    } else {
        res.render('error/login');
    }
});

/* Post Navigation Grid page */
router.post('/navigation/save', function (req, res, next) {
    if (req.session.isAuthenticated) {
        var data = {
            'floor': req.body.floor,
            'data': req.body.grid
        };
        navigation.insertGrid(data);
        //navigation.getGird
        res.json(JSON.stringify(true));
    } else {
        res.render('error/login');
    }
});

/* Post Navigation Grid page */
router.post('/navigation/update', function (req, res, next) {
    if (req.session.isAuthenticated) {
        var data = {
            'floor': req.body.floor,
            'data': req.body.grid
        };
        navigation.updateGrid(data);
        //navigation.getGird
        res.json(JSON.stringify(true));
    } else {
        res.render('error/login');
    }
});

/* Get Details of location */
router.get('/details/:id', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/details', {session: true, data: req.params.id})
    } else {
        res.render('error/login');
    }
});

/* Get Details dat of location */
router.get('/details/data/:id', function (req, res, next) {
    if (req.session.isAuthenticated) {

        location.getLocationById(req.params.id, function (results) {
            res.contentType('json');
            res.json(JSON.stringify(results));
        });

    } else {
        res.render('error/login');
    }
});

/* Get Delete Location with id */
router.get('/location/delete/:id', function (req, res, next) {
    if (req.session.isAuthenticated) {

        location.deleteLocationById(req.params.id, function (results) {
            var result = false;
            if(results["affectedRows"] >= 1){
                result = true;
            }
            res.contentType('json');
            res.json(JSON.stringify(result));

            
        });

    } else {
        res.render('error/login');
    }
});

router.get('/location/edit/:id', function (req, res, next) {
    if (req.session.isAuthenticated) {

        location.getLocationById(req.params.id, function(location){

            res.locals.data = JSON.stringify(location);
            res.render('dashboard/' + location['type'], 
                {   session: true})
        });

    } else {
        res.render('error/login');
    }
});


/* Get User page */
router.get('/user', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/user', {session: true});
    } else {
        res.render('error/login');
    }
});

/* Get User page */
router.post('/user', function (req, res, next) {
    if (req.session.isAuthenticated) {

        // defining know data
        var data = {
            'onid': req.body.onid,
            'first': req.body.first,
            'last': req.body.last
            
        };
        user.insertUser(data, function(results){
            res.json(JSON.stringify(true));
        });


    } else {
        res.render('error/login');
    }
});

/* Get Map Upload page */
router.get('/mapupload', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/mapupload', {session: true})
    } else {
        res.render('error/login');
    }
});
/*
 Post Map Upload Page 
router.post('/mapupload', function(req, res) {

  console.log(req);
  console.log(res);
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  var sampleFile = req.body.image;

  fs.writeFile("image.jpg", sampleFile, (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
    }); 
});*/

module.exports = router;