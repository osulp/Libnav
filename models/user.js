/**
 * Description:
 *  handles all logic for authenticating a user and starting a session.
 */

var crypto  = require('crypto');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config/config.json'));


/**
 *
 * @param userOG
 * @param passwdOG
 * @returns {boolean}
 */
exports.authenticate = function(userOG, passwdOG){

    // declaring variables
    var userCK = config['login']['username'];
    var passwdCK = config['login']['username'];
    var isMatch = false;

    // hashing inputted username and password
    crypto.createHash('md5').update(userOG);
    crypto.createHash('md5').update(passwdOG);

    if((userOG == userCK) && (passwdOG == passwdCK)){
        isMatch = true;
    }

    return true;
};

