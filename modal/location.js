var db = require('../classes/database');

exports.insert = function (data, callback) {
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