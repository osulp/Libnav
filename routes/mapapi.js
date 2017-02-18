router.get('/mapapi/grid', function (req, res, next) {

    location.getLocationPoints(function (results) {

        res.contentType('json');
        res.json(JSON.stringify(results));
    })

});
