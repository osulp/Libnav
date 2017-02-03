var db = require('../classes/database');

exports.insert = function (data) {
    var results = null;
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert information into floor table
    db.connection.query('INSERT INTO location SET ?', data, function (error, results, fields) {
        if (error) throw error;

        console.log(results.insertId);
    });

    // close connection to database
    db.connection.end();


};