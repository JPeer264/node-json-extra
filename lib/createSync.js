'use strict';

var fs    = require('fs-extra');
var path  = require('path');
var check = require('./check');

/**
 * Create a file
 *
 * @param {String} pathString
 * @param {String} filename
 * @param {String} [content]
 */
function createSync(pathString, filename, content) {
    var combinePath = path.join(pathString, filename);

    content = typeof content === 'undefined' ? '{}' : content;

    if (typeof content === 'object') {
        if (!check('object', content)) {
            return false;
        }

        content = JSON.stringify(content);
    }

    if (typeof content !== 'string') {
        console.log('Error. Please enter a json string as content.'.bold.red);
        return false;
    }

    if (!check(content)) {
        return false;
    }

    fs.ensureDirSync(pathString);
    fs.writeFileSync(combinePath, content, 'utf8');
}

module.exports = createSync;
