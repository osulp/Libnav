var db = require('../classes/database');
var async = require('async');

/**
 * Inserts a locaiton into the database
 * @param  {[type]}   data     [Location object]
 * @param  {Function} callback [callback function]
 */
exports.insertLocation = function (data, callback) {
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

/**
 * Upddatas a location by id
 * @param  {[type]}   data     [Location object]
 * @param  {[type]}   id       [id of locaiton to be updated]
 * @param  {Function} callback [callback function]
 */
exports.updateLocation = function (data, id, callback) {

    var results = null;
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert information into floor table
    db.connection.query('UPDATE location set ? where id=' + id, data, function (error, results, fields) {

        if (error) throw error;

        

        callback(results);
        
    });

    // close connection to database
    db.connection.end();
    

};

/**
 * Inserts an Attributes into the database
 * @param  {[type]} data [an attribute, or list of attributes]
 * Depercated
 */
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

/**
 * Inserts an Tags into the database
 * @param  {[type]} data [a tags, or list of tag]
 * Depercated
 */
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

/**
 * Inserts an Points into the database
 * @param  {[type]} data [an points, or list of points]
 * Depercated
 */
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

/**
 * Gets all location from database
 * @param  {Function} callback [callback Function]
 */
exports.getLocations = function(callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // Get all locations
    db.connection.query('SELECT * from location', function (error, results, fields) {
        if (error) throw error;

        callback(results);
    });

    
};

/**
 * Deletes a location be id
 * @param  {[type]}   id       [id of location to be deleted]
 * @param  {Function} callback [call back function]
 */
exports.deleteLocationById = function(id, callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('DELETE FROM location where id=? ', id , function (error, results, fields) {
        if (error) throw error;

        callback(results);
    });

    // close connection to database
    db.connection.end();

    
}

/**
 * Gets the location entrypoint by id
 * @param  {[type]}   location [location id]
 * @param  {Function} callback [callback funciton]
 * Depercated
 */
exports.getEntryPoint = function ( location, callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT entry_point from location where id=? ', location , function (error, results, fields) {
        if (error) throw error;

        

        callback(results);
    });

    // close connection to database
    db.connection.end();
    
}

/**
 * Gets attributes of a locaiton
 * @param  {[type]}   location [location id]
 * @param  {Function} callback [call back function]
 * Depercated
 */
exports.getAttributes = function ( location, callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT attr from attribute where location_id=? ', location , function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });

    // close connection to database
    db.connection.end();
}

/**
 * Gets tags of a locaiton  
 * @param  {[type]}   location [location id]
 * @param  {Function} callback [call back function]
 * Depercated
 */
exports.getTags = function (location, callback){
    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    // insert attributes
    db.connection.query('SELECT attr from tag where location_id=? ', location, function (error, results, fields) {
        if (error) throw error;

        

        callback(results);

        
    });

    // close connection to database
    db.connection.end();
    
};

/**
 * Gets location by id
 * @param  {[type]}   id       [locaiton id]
 * @param  {Function} callback [callback funcation]
 * @return {[type]}            [description]
 */
exports.getLocationById = function(id, callback){

    // create database connection
    db.createConnection();

    // connect to database
    db.connection.connect();

    db.connection.query('SELECT * from location where id=' + id, function (error, results, fields) {
        if (error) throw error;
        callback(results[0]);
        
    });

    // close connection to database
    db.connection.end();

};

/**
 * Gets all search tags, attributes and locaiton
 * @param  {Function} callback [callback funciton]
 * Depercated
 */
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
                    location.push(result[r]);
                }
                parallel_done();

            })
        },
        function(parallel_done){
            db.connection.query(tagQuery, function(error, result){
                if(error) return parallel_done(error);
                for(var r in result){
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
                    location.push(result[r]);
                }

                //location.attr =  result;
                parallel_done();

            })
        }
        ],
        function(error){
            if(error) console.log(error);
            //db.connection.end();
            callback(location);
        });
    
};
