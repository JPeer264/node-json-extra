'use strict';

var fs = require('fs');

/**
 * Read the file in the path and convert it into an Javascript Object
 *
 * @param {String} path
 *
 * @return {Objects} strToObj
 */
function readToObjSync (path) {
    // search for file. Fail fast if there is no json File
    if (!fs.existsSync(path)) return false;
    if (!fs.statSync(path).isFile()) return false;

    var fileString = fs.readFileSync(path, 'utf8');
    var strToObj = JSON.parse(fileString);

    return strToObj;
}

module.exports = readToObjSync;
