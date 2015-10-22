'use strict';

var fs = require('fs'),
    path = require('path');

/**
 * Create a file
 *
 * @param {String} pathString
 * @param {String} filename
 * @param {String} content
 */
function createSync(pathString, filename, content) {
    var combinePath = path.join(pathString, filename);
    content = typeof content === 'undefined' ? '{}' : content;
    if (typeof content !== 'string') {
        console.log('Error. Please enter a json string as content.'.bold.red);
        process.exit(5);
    }

    fs.writeFileSync(combinePath, content, 'utf8');
}

module.exports = createSync;
