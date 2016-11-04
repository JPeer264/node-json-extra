'use strict';

var path = require('path');
var json = require('../index');

var countArray;
var pathArray;
var baseCache;

/**
 *  creates the folder structure.
 *
 *  @param {Object} json
 */
function toPath(json) {
    countArray = 0;
    pathArray = [];

    if (typeof json === 'string') {
        try {
            JSON.parse(json);
        } catch(e)  {
            console.error("The json file is not valid. No folder structure created.".bold.red);
            return;
        }
    }

    var sortedArray = _jsonToPath(json);

    return sortedArray;
}

/**
 * Make a json file into a path.
 *
 * @param _json {Objects} - TODO look if its a valid json or an object
 * @param _count {Integer} - For internal usage, do not use it
 * @param folder {Integer} - For internal usage, do not use it
 *
 * @return pathArray
 */

function _jsonToPath(_json, _count, folderDepth) {
    _count = _count === undefined ? 0 : _count;
    folderDepth = folderDepth === undefined ? 0 : folderDepth;

    for (var key in _json) {

        if (typeof _json[key] === 'object') {
            _jsonToPath(_json[key], _count, folderDepth);
        }

        if (typeof _json[key] === 'string') {
            if (key === 'base') {
                // FOR DEBUGGING
                // console.log('');
                // console.log('base'.red);
                // console.log(key + ": " + _json[key]);
                // console.log('Folder depht: ' + (folderDepth));
                // console.log('Count: ' + _count);
                // console.log("Base cache: " + baseCache);
                // console.log('');

                // check if it is a subfolder
                // if so, it should look where the his parent is (baseCache)
                // if not, it should create a complete new basepath
                if (countArray != 0) {
                    pathArray[countArray] = path.join(pathArray[folderDepth], _json[key]);
                } else {
                    pathArray[countArray] = _json[key];
                }

                folderDepth = countArray;
                baseCache = _count;

            } else {
                // FOR DEBUGGING
                // console.log('');
                // console.log('No Base: '.green);
                // console.log(key + ": " + json[key]);
                // console.log("Folder depth: " + (folderDepth));
                // console.log("Count: " + _count);
                // console.log("Base cache: " + baseCache);
                // console.log('');

                // check if it is a subfolder
                // if so, it should look where his parent is (basecache)
                // if not, it should create a new basepath
                if (countArray != 0) {
                    pathArray[countArray] = path.join(pathArray[folderDepth], _json[key]);
                } else {
                    pathArray[countArray] = path.join(pathArray[countArray - (_count)], _json[key]);
                }
            }
            countArray++;
        }
        _count++;
    }
    return pathArray;
}

module.exports = toPath;
