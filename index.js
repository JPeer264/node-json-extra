'use strict';
'use strict';

var jsonExtra = module.exports = {
    // some json methods
    parse: JSON.parse,
    stringify: JSON.stringify,
}

function doRequire(name, alias) {
    jsonExtra[name] = require('./lib/' + name);

    if (alias) {
        if (Object.prototype.toString.call(alias) === '[object Array]') {
            for (var aka in alias) {
                jsonExtra[aka] = require('./lib/' + name);
            }

            return
        }

        return jsonExtra[alias] = require('./lib/' + name);
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
