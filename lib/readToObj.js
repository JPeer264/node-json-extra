'use strict';

const fs = require('fs');

/**
 * Read the file in the path and convert it into an Javascript Object
 *
 * @param {String} path
 *
 * @return {Objects} strToObj
 */
function readToObj (path, callback) {
    // search for file. Fail fast if there is no json File
    if (!fs.existsSync(path)) return callback(null, false);
    if (!fs.statSync(path).isFile()) return callback(null, false);

    const fileString = fs.readFile(path, 'utf8', (err, data) => {
        if (err) return callback(null, err);

        const strToObj = JSON.parse(data);

        return callback(strToObj);
    });
}

module.exports = readToObj;
