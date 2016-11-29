'use strict';

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
    if (typeof options === 'string') {
        findString = options;
        options    = {};
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

            resultArray.push({
                key: findString,
                type: typeOfString,
                data: value
            });
        }

        // recursive if it is an object
        if (Object.prototype.toString.call(value) === '[object Object]') {
            var recursiveArray = matchJsonKey(value, options, findString)

            resultArray = resultArray.concat(recursiveArray)
        }
    }

    return resultArray
}

module.exports = find;
