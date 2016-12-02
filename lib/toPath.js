'use strict';

var path     = require('path');
var json     = require('../index');
var includes = require('lodash.includes');
var delimiterSeperatedArray;

/**
 *  creates a delimiter seperated chain of single keys/values
 *
 *  @param {Object} json
 *  @param {Object} options
 *  @param {String} delimiter='/' the delimiter to seperate every single key/value.
 */
function toPath(_json, options, delimiter) {
    delimiterSeperatedArray = [];

    if (typeof options === 'string') {
        delimiter = options;
        options = {};
    }

    delimiter    = delimiter || '/';
    options      = options || {};
    options.type = options.type || [];

    if (!json.check('object', _json)) {
        return []
    }

    _jsonConcat(_json, options, delimiter);

    return delimiterSeperatedArray
}

/**
 *  Make a json file into a delimiter seperated string. It will push everything into the global delimiterSeperatedArray
 *
 *  @param {Object} _json
 *  @param {Object} options
 *  @param {String} delimiter='/' the delimiter to seperate every single key/value.
 */
function _jsonConcat(_json, options, _delimiter, _jsonString) {
    for (var key in _json) {
        var jsonString;
        var value = _json[key];
        var typeOfString = typeof value;

        // convert arrays from object to array
        if (Object.prototype.toString.call(value) === '[object Array]') {
            typeOfString = 'array';
        }

        if (_jsonString) {
            // if the objects are nested, _jsonString is not empty
            jsonString = _jsonString + _delimiter + key;
        } else {
            // for the first object for loop
            jsonString = key;
        }

        if (options.type.length === 0 || includes(options.type, typeOfString)) {
            delimiterSeperatedArray.push(jsonString);
        }

        if (typeOfString === 'array') {
            // arrays should iterate over single values and add it to the global delimiterSeperatedArray
            for (var i = 0; i < value.length; i++) {
                if (options.type.length === 0 || includes(options.type, typeof value[i])) {
                    delimiterSeperatedArray.push(jsonString + _delimiter + value[i])
                }
            }
        } else if (typeOfString === 'object') {
            // objects should just recursivly call the function
            _jsonConcat(value, options, _delimiter, jsonString);
        }
    }
}

module.exports = toPath;
