var db = require('../classes/database');

exports.insertGrid = function (data, callback) {
    var results = null;
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert information into floor table
    db.connection.query('INSERT INTO grid SET ?', data, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log(fields);
    });

    // close connection to database
    db.connection.end();

};

