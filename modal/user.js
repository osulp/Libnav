var db = require('../classes/database');

exports.insertUser = function (data, callback) {
    var results = null;
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert information into floor table
    db.connection.query('INSERT INTO user SET ?', data, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log(fields);
        callback(results);
    });

    // close connection to database
    db.connection.end();

};

exports.deleteUuser = function(callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('DELETE FROM user where id = ?', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        callback(results);
    });

    // close connection to database
    db.connection.end();
};

exports.getUsers = function(callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        callback(results);
    });

    // close connection to database
    db.connection.end();
};