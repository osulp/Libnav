var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard/index', { title: 'Express', layout:'dashboard/base' });
});


module.exports = router;
