import test from 'ava';

import { readToObjSync } from '../lib';

const testCwd = 'test/testCache';

test('should read a json file to object', (t) => {
    const data = readToObjSync('package.json');

    t.is(Object.prototype.toString.call(data), '[object Object]');
    t.is(typeof data.name, 'string');
});

test('should fail', (t) => {
    const data = readToObjSync('doesnotexist.json');

    t.is(data, false);
});
