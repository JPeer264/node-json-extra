import test from 'ava';

import { readToObj } from '../lib';

test.cb('should read a json file to object', (t) => {
  readToObj('package.json', (err, data) => {
    t.is(err, null);

    t.is(Object.prototype.toString.call(data), '[object Object]');
    t.is(typeof data.name, 'string');

    t.end();
  });
});

test.cb('should read a json file to object | promise', (t) => {
  readToObj('package.json')
    .then((data) => {
      t.is(Object.prototype.toString.call(data), '[object Object]');
      t.is(typeof data.name, 'string');

      t.end();
    });
});

test.cb('should fail', (t) => {
  readToObj('doesnotexist.json', (err) => {
    t.is(err, false);

    t.end();
  });
});
