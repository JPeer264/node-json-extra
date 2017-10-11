import test from 'ava';

import { find } from '../lib';

let jsonfile;

test.beforeEach(() => {
  jsonfile = {
    path: 'a path',
    nested: {
      path: 'a second path',
      findme: 'find this string',
      nested: {
        path: 'a third path',
        findme: { test: 'find this an object' },
      },
    },
    findme: ['this is an array'],
  };
});

test('should return the t.ised output', (t) => {
  const foundKeys = find(jsonfile, 'findme');

  t.is(Object.prototype.toString.call(foundKeys), '[object Array]');
  t.is(foundKeys.length, 3);
  t.is(typeof foundKeys[0].data, 'string');
  t.is(Object.prototype.toString.call(foundKeys[2].data), '[object Array]');
  t.is(foundKeys[0].data, 'find this string');
});

test('should check if it is an array or object', (t) => {
  jsonfile = {
    findme: ['test'],
    test: {
      findme: { test: 'test' },
    },
  };

  const foundKeys = find(jsonfile, 'findme');

  t.is(Object.prototype.toString.call(foundKeys), '[object Array]');
  t.is(foundKeys.length, 2);
  t.is(Object.prototype.toString.call(foundKeys[0].data), '[object Array]');
  t.is(foundKeys[0].type, 'array');
  t.is(Object.prototype.toString.call(foundKeys[1].data), '[object Object]');
  t.is(foundKeys[1].type, 'object');
});


test('type: should check the type option as string', (t) => {
  const foundKeys = find(jsonfile, {
    type: 'string',
  }, 'findme');

  t.is(foundKeys.length, 1);
  t.is(foundKeys[0].type, 'string');
});

test('type: should check the type option as array', (t) => {
  const foundKeys = find(jsonfile, {
    type: ['object', 'array'],
  }, 'findme');

  t.is(foundKeys.length, 2);
  t.is(foundKeys[0].type, 'object');
  t.is(foundKeys[1].type, 'array');
});

test('max: should check if the maximum is reduced', (t) => {
  const foundKeys = find(jsonfile, {
    max: 1,
  }, 'findme');
  const foundKeys2 = find(jsonfile, {
    max: 2,
  }, 'findme');

  t.is(foundKeys.length, 1);
  t.is(foundKeys2.length, 2);
});
