router.get('/mapapi/grid', function (req, res, next) {

    navigation.getGrid(function (results) {

        res.contentType('json');
        res.json(JSON.stringify(results));
    })

});
