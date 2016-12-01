'use strict';

var path = require('path');
var json = require('../index');
var pathArray;

/**
 *  creates the folder structure.
 *
 *  @param {Object} json
 */
function toPath(_json, delimiter) {
    pathArray = [];

    delimiter = delimiter || '/';

    if (!json.check('object', _json)) {
        return []
    }

    _jsonConcat(_json, delimiter);

    return pathArray
}

/**
 * Make a json file into a path.
 *
 * @param _json {Objects}
 *
 * @return pathArray
 */
function _jsonConcat(_json, _delimiter, _jsonString) {
    for (var key in _json) {
        var jsonString;
        var value = _json[key];

        if (_jsonString) {
            // if the objects are nested, _jsonString is not empty
            jsonString = _jsonString + _delimiter + key;
        } else {
            // for the first object for loop
            jsonString = key;
        }

        pathArray.push(jsonString);

        if (Object.prototype.toString.call(value) === '[object Array]') {
            // arrays should iterate over single values and add it to the global pathArray
            for (var i = 0; i < value.length; i++) {
                pathArray.push(jsonString + _delimiter + value[i])
            }
        } else if (Object.prototype.toString.call(value) === '[object Object]') {
            // objects should just recursivly call the function
            _jsonConcat(value, _delimiter, jsonString);
        }
    }
}

module.exports = toPath;
