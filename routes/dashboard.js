var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/index', {title: 'Express'})
    }else {
        res.render('error/index', {
            message: '<div class="fa-container">' +
            '<h1>' +
            '<i class="fa fa-exclamation-triangle fa-2x fa-vertical"></i> ' +
            'Access Denied</h1>' +
            '</div>',
            body: '<div class="col-lg-12"><h3>Please login to continue.</h3></div>'
        });
    }
});

/* Get Known Location page */
router.get('/known', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/known')
    }else {
        res.render('error/index', {
            message: '<div class="fa-container">' +
            '<h1>' +
            '<i class="fa fa-exclamation-triangle fa-2x fa-vertical"></i> ' +
            'Access Denied</h1>' +
            '</div>',
            body: '<div class="col-lg-12"><h3>Please login to continue.</h3></div>'
        });
    }
});

/* Post Know Location page */
router.post('/known', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/known', {title: 'Known Location Form'})
    }else {
        res.render('error/index', {
            message: '<div class="fa-container">' +
            '<h1>' +
            '<i class="fa fa-exclamation-triangle fa-2x fa-vertical"></i> ' +
            'Access Denied</h1>' +
            '</div>',
            body: '<div class="col-lg-12"><h3>Please login to continue.</h3></div>'
        });
    }
});

/* Get Unknown Location page */
router.get('/unknown', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/unknown')
    }else {
        res.render('error/index', {
            message: '<div class="fa-container">' +
            '<h1>' +
            '<i class="fa fa-exclamation-triangle fa-2x fa-vertical"></i> ' +
            'Access Denied</h1>' +
            '</div>',
            body: '<div class="col-lg-12"><h3>Please login to continue.</h3></div>'
        });
    }
});



module.exports = router;
