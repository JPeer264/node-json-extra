'use strict';

var includes = require('lodash.includes');

/**
 * Finds specific keys in an array
 *
 * @param {String} jsonObject
 * @param {Object} [options]
 * @param {String} findString the key to find in an json object
 *
 * @return {Array} an array of found objects
 */
function find (jsonObject, options, findString) {
    var typeCache;

    if (typeof options === 'string') {
        findString = options;
        options    = {};
    }

    options.type = options.type || [];
    options.max = options.max || -1;

    if (typeof options.type === 'string') {
        typeCache = options.type;

        options.type = [];
        options.type.push(typeCache);
    }

    return matchJsonKey(jsonObject, options, findString)
}

/**
 * The recursive method to find the specific key
 *
 * @param {String} jsonObject
 * @param {Object} [options]
 * @param {String} findString the key to find in an json object
 *
 * @return {Array} an array of found objects
 */
function matchJsonKey (jsonObject, options, findString) {
    var resultArray = []

    for (var key in jsonObject) {
        var value = jsonObject[key];

        if (key === findString) {
            var typeOfString = typeof value;

            // convert arrays from object to array
            if (Object.prototype.toString.call(value) === '[object Array]') {
                typeOfString = 'array';
            }

            // add if either
            // all are allowed => empty array or
            // if the specific type is in option.type
            if (options.type.length === 0 || includes(options.type, typeOfString)) {
                resultArray.push({
                    key: findString,
                    type: typeOfString,
                    data: value
                });

                if (options.max !== -1 && resultArray.length === options.max) {
                    return resultArray
                }
            }
        }

        // recursive if it is an object
        if (Object.prototype.toString.call(value) === '[object Object]') {
            var recursiveArray = matchJsonKey(value, options, findString)

            resultArray = resultArray.concat(recursiveArray)

            if (options.max !== -1 && resultArray.length >= options.max) {
                return resultArray
            }
        }
    }

    return resultArray
}

module.exports = find;
