'use strict';

/**
 * check if a json file is valid
 *
 * @param {String} json
 */
function check(json) {
    try {
        JSON.parse(json);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = check;
