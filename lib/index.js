'use strict';

const jsonExtra = module.exports = {
    // some json methods
    parse: JSON.parse,
    stringify: JSON.stringify,
}

function doRequire(name, alias) {
    jsonExtra[name] = require('./' + name);

    if (alias) {
        if (Object.prototype.toString.call(alias) === '[object Array]') {
            for (let aka in alias) {
                jsonExtra[aka] = require('./' + name);
            }

            return
        }

        return jsonExtra[alias] = require('./' + name);
    }
}

doRequire('check', ['isJson', 'isValid']);
doRequire('toPath', 'chain');
doRequire('readToObj');
doRequire('readToObjSync');
doRequire('create');
doRequire('createSync');
doRequire('create', 'write');
doRequire('createSync', 'writeSync');
doRequire('find');