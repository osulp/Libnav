/**
 * Description:
 *  handles all logic for authenticating a user and starting a session.
 */

var crypt = require('./crypt');
var config = '';

// try to load config
try{
    config = require('../config/config');
}
catch(e){
    console.log('Config file was not loaded.');
}


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
    userOG = crypt.encrypt(userOG);
    passwdOG = crypt.encrypt(passwdOG);

    if((userOG == userCK) && (passwdOG == passwdCK)){
        isMatch = true;
    }

    return isMatch;
};

