'use strict';

/**
 * check if a json file is valid
 *
 * @param {String} json
 *
 * @return {Boolean}
 */
function check (type, json) {
    var returnVal = false;

    if (json === undefined) {
        json = type;
        type = 'string';
    }

    if (type === 'string') {
        try {
            JSON.parse(json);
        } catch (e) {
            return false;
        }
    }

    return typeof json === type;
}

module.exports = check;
