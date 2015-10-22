'use strict';

/**
 * check if a json file is valid
 *
 * @param {String} json
 *
 * @return {Boolean}
 */
function check(type, json) {
    if (!!json) {
        json = type;
        type = 'string';
    }

    var returnVal = false;
    try {
        JSON.parse(json);
    } catch (e) {
        return false;
    }
    return typeof json === type;
}

module.exports = check;
