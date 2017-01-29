var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/index', {session:true});
    }else {
        res.render('error/login');
    }
});

/* Get Known Location page */
router.get('/known', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/known', {session:true});
    }else {
        res.render('error/login');
    }
});

/* Post Know Location page */
router.post('/known', function (req, res, next) {
    if (req.session.isAuthenticated) {
        console.log(req.body);
        res.json(JSON.stringify(true));
    }else {
        res.render('error/login');
    }
});

/* Get Unknown Location page */
router.get('/unknown', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/unknown', {session:true})
    }else {
        res.render('error/login');
    }
});

/* Post Unknown Location page */
router.post('/unknown', function (req, res, next) {
    if (req.session.isAuthenticated) {
        console.log(req.body);
        res.json(JSON.stringify(true));
    }else {
        res.render('error/login');
    }
});

/* Get Room Location page */
router.get('/room', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/room', {session:true})
    }else {
        res.render('error/login');
    }
});

/* Post Room Location page */
router.post('/room', function (req, res, next) {
    if (req.session.isAuthenticated) {
        console.log(req.body);
        res.json(JSON.stringify(true));
    }else {
        res.render('error/login');
    }
});

/* Get Service Point Location page */
router.get('/servicepoint', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.render('dashboard/servicepoint',{session:true})
    }else {
        res.render('error/login');
    }
});

/* Post Service Point Location page */
router.post('/servicepoint', function (req, res, next) {
    if (req.session.isAuthenticated) {
        console.log(req.body);
        res.json(JSON.stringify(true));
    }else {
        res.render('error/login');
    }
});



module.exports = router;
