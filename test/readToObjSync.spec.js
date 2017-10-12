import test from 'ava';

import { readToObjSync } from '../lib';

test('should read a json file to object', (t) => {
  const data = readToObjSync('package.json');

  t.is(Object.prototype.toString.call(data), '[object Object]');
  t.is(typeof data.name, 'string');
});

test('file is no json', (t) => {
  const data = readToObjSync('README.md');

  t.is(data, false);
});


test('file does not exist', (t) => {
  const data = readToObjSync('doesnotexist.json');

  t.is(data, false);
});
