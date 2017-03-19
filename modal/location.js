var db = require('../classes/database');
var async = require('async');

exports.insertLocation = function (data, callback) {
    var results = null;
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert information into floor table
    db.connection.query('INSERT INTO location SET ?', data, function (error, results, fields) {
        db.connection.end();

        if (error) throw error;

        callback(results.insertId);

    });

    // close connection to database
/*
    db.connection.end();
*/



};

exports.insertAttribute = function(data){

    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('INSERT INTO attribute (location_id, attr) VALUES ?', [data]);

    // close connection to database
    db.connection.end();
};

exports.insertTag = function(data){

    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('INSERT INTO tag (location_id, attr) VALUES ?', [data]);

    // close connection to database
    db.connection.end();
};


exports.insertPoint = function(data){

    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('INSERT INTO point (location_id, x, y) VALUES ?', [data]);

    // close connection to database
    db.connection.end();
};


exports.getLocations = function(callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT id, floor, name, type, room_number , room_cap , data_point from location', function (error, results, fields) {
        if (error) throw error;


        console.log(results);
        callback(results);
    });

    // close connection to database
    db.connection.end();
};

/*exports.getLocations = function(id, callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT l.id, l.floor, l.name, l.type, l.url, l.room_number , l.room_cap , l.data_point from location l', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        callback(results);
    });

    // close connection to database
    db.connection.end();
};*/


exports.getAttributes = function ( location, callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT attr from attribute where location_id=? ', location , function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log(fields);

        callback(results);
    });

    // close connection to database
    db.connection.end();
}

exports.getTags = function (location, callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT attr from tag where location_id=? ', location, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        callback(results);
    });

    // close connection to database
    db.connection.end();
};

exports.getLocationById = function(id, callback){
    var tagQuery = 'SELECT attr from tag where location_id=?';
    var attrQuery = 'SELECT attr from attribute where location_id=?';
    var locationQuery = 'SELECT * from location where id=?';

    var location = {};

    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    async.parallel([
        function(parallel_done){
            db.connection.query(locationQuery, id, function(error, result, fields){
                if(error) return parallel_done(error);
                location.info = result;
                parallel_done();

            })
        },
        function(parallel_done){
            db.connection.query(tagQuery, id, function(error, result,  fields){
                if(error) return parallel_done(error);
                location.tags = result;
                parallel_done();

            })
        },
        function(parallel_done){
            db.connection.query(attrQuery, id, function(error, result, fields){
                if(error) return parallel_done(error);
                location.attr = result;
                parallel_done();

            })
        }
    ],
    function(error){
        if(error) console.log(error);
        db.connection.end();
        callback(location);
    });
    
};


exports.getSearch = function( callback){
    var tagQuery = 'SELECT id as "tagid", location_id as "id", attr from tag';
    var attrQuery = 'SELECT id as "attrid", location_id as "id", attr from attribute ';
    var locationQuery = 'SELECT id, name, floor, room_number, room_cap from location ';

    var location = [];

    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    async.parallel([
        function(parallel_done){
            db.connection.query(locationQuery, function(error, result){
                if(error) return parallel_done(error);
                //location.info = result;
                for(var r in result){
                    console.log(result[r]);
                    location.push(result[r]);
                }
                parallel_done();

            })
        },
        function(parallel_done){
            db.connection.query(tagQuery, function(error, result){
                if(error) return parallel_done(error);
                for(var r in result){
                    console.log(result[r]);
                    location.push(result[r]);
                }
                //location.tags = result;
                parallel_done();

            })
        },
        function(parallel_done){
            db.connection.query(attrQuery, function(error, result){
                if(error) return parallel_done(error);
                for(var r in result){
                    console.log(result[r]);
                    location.push(result[r]);
                }

                //location.attr =  result;
                parallel_done();

            })
        }
    ],
    function(error){
        if(error) console.log(error);
        db.connection.end();
        callback(location);
    });
    
};
