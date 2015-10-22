'use strict';

var fs = require('fs');

/**
 * Read the file in the path and convert it into an Javascript Object
 *
 * @param {String} path
 *
 * @return {Objects} strToObj
 */
function readToObj(path, callback) {
    // search for file. Fail fast if there is no json File
    if (!fs.statSync(path).isFile()) return false;
    if (!fs.existsSync(path)) return false;


    var fileString = fs.readFile(path, 'utf8', function(err, data) {
        if (err) return callback(null, err);
        var strToObj = JSON.parse(data);
        return callback(strToObj);
    });
}

module.exports = readToObj;
