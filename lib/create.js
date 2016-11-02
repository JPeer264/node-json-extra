'use strict';

var check = require('./check');
var path  = require('path');
var fs    = require('fs-extra');

/**
 * Create a file
 *
 * @param {String} pathString
 * @param {String} filename
 * @param {String} content
 */
function create (pathString, filename, content, callback) {
    var combinePath;

    if (path.extname(filename) !== '.json') {
        var nameCache = filename;
        filename = path.basename(nameCache, path.extname(nameCache)) + '.json';
    }

    combinePath = path.join(pathString, filename);

    if (typeof content === 'function' && !callback) {
        callback = content;
        content = '{}';
    }

    if (typeof content === 'object') {
        content = JSON.stringify(content);
    }

    if (typeof content !== 'string') {
        return callback({
            message: 'JSON is not valid',
            error: 'NOJSON'
        });
    }

    if (!check(content)) {
        return callback({
            message: 'JSON is not valid',
            error: 'NOJSON'
        });
    }

    fs.ensureDir(pathString, function (err) {
        if (err) return callback(err);

        fs.writeFile(combinePath, content, 'utf8', function (err) {
            if (err) return callback(err);
            return callback();
        });
    });
}

module.exports = create;
