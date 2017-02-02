/**
 * Description:
 *  handles encrypting and decrupting of data.
 *  Part of https://github.com/chris-rock/node-crypto-examples
 */

var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var salt = 'bf94dc3d7e875620';

exports.encrypt = function(text){
    console.log('In encrypt');
    var cipher = crypto.createCipher(algorithm,salt);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = function(text){
    var decipher = crypto.createDecipher(algorithm,salt);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
};

/**
 * Generates a salt
 * @returns {string}
 */
/*exports.genSalt = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /!** convert to hexadecimal format *!/
        .slice(0, length);
    /!** return required number of characters *!/
};*/

