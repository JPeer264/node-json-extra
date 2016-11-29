'use strict';
'use strict';

var jsonExtra = module.exports = {
    // some json methods
    parse: JSON.parse,
    stringify: JSON.stringify,
}

function doRequire(name, alias) {
    if (alias){
        return jsonExtra[alias] = require('./lib/' + name);
    }

    return jsonExtra[name] = require('./lib/' + name);
}

doRequire('check');
doRequire('toPath');
doRequire('readToObj');
doRequire('readToObjSync');
doRequire('create');
doRequire('createSync');
doRequire('create', 'write');
doRequire('createSync', 'writeSync');
doRequire('find');
