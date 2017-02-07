var db = require('../classes/database');

exports.insertLocation = function (callback) {
    var results = null;
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert information into floor table
    db.connection.query('INSERT INTO location SET ?', data, function (error, results, fields) {
        if (error) throw error;

        callback(results.insertId);
    });

    // close connection to database
    db.connection.end();

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
    db.connection.query('INSERT INTO point (location_id, y, x) VALUES ?', [data]);

    // close connection to database
    db.connection.end();
};


exports.getLocationPoints = function(callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT l.id, l.floor, p.x , p.y FROM location l JOIN point p ON p.location_id = l.id', function (error, results, fields) {
        if (error) throw error;

        callback(results);
    });

    // close connection to database
    db.connection.end();
};