import test from 'ava';

import { readToObj } from '../lib';

test.cb('should read a json file to object', (t) => {
  readToObj('package.json', (data, err) => {
    t.is(err, undefined);

    t.is(Object.prototype.toString.call(data), '[object Object]');
    t.is(typeof data.name, 'string');

    t.end();
  });
});

test.cb('should fail', (t) => {
  readToObj('doesnotexist.json', (data, err) => {
    t.is(err, false);

    t.end();
  });
});
