var db = require('../classes/database');
/**
 * Inserts a user in to the database
 * @param  {[type]}   data     [user object]
 * @param  {Function} callback [callback function]
 */
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

/**
 * Deletes a user from the database
 * @param  {[type]}   id       [id of user to be deleted]
 * @param  {Function} callback [callback funciton]
 */
exports.deleteUser = function(id, callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('DELETE FROM user WHERE id = ?', id, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        callback(results);
    });

    // close connection to database
    db.connection.end();
};

/**
 * Gets all user from the database
 * @param  {Function} callback [callback funciton]
 */
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

/**
 * Gets user by onid for checking
 * @param  {[type]}   onid     [user onid]
 * @param  {Function} callback [callback function]
 */
exports.checkUser = function(onid, callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT * FROM user WHERE onid = ? LIMIT 1', onid, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        callback(results);
    });

    // close connection to database
    db.connection.end();
};