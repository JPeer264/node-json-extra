'use strict';

const fs    = require('fs-extra');
const path  = require('path');
const check = require('./check');

/**
 * Create a file
 *
 * @param {String} pathString
 * @param {String} filename
 * @param {String} [content]
 */
function createSync (pathString, filename, content) {
    const combinePath = path.join(pathString, filename);

    content = typeof content === 'undefined' ? '{}' : content;

    if (typeof content === 'object') {
        content = JSON.stringify(content);
    }

    if (typeof content !== 'string') return false;

    if (!check(content)) return false;

    fs.ensureDirSync(pathString);
    fs.writeFileSync(combinePath, content, 'utf8');
}

module.exports = createSync;
