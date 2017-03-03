var db = require('../classes/database');

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


/*
exports.insertPoint = function(data){

    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('INSERT INTO point (location_id, y, x) VALUES ?', [data]);

    // close connection to database
    db.connection.end();
};*/

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

exports.getAttributes = function (callback, location){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT * from attributes where location = ?', location , function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        callback(results);
    });

    // close connection to database
    db.connection.end();
}

exports.getTags = function (callback, location){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT * from tags where location = ? ', location, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        callback(results);
    });

    // close connection to database
    db.connection.end();
}