import { find } from '../lib';

let jsonfile;

beforeEach(() => {
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

test('should return the t.ised output', () => {
  const foundKeys = find(jsonfile, 'findme');

  expect(Object.prototype.toString.call(foundKeys)).toBe('[object Array]');
  expect(foundKeys.length).toBe(3);
  expect(typeof foundKeys[0].data).toBe('string');
  expect(Object.prototype.toString.call(foundKeys[2].data)).toBe('[object Array]');
  expect(foundKeys[0].data).toBe('find this string');
});

test('should check if it is an array or object', () => {
  jsonfile = {
    findme: ['test'],
    test: {
      findme: { test: 'test' },
    },
  };

  const foundKeys = find(jsonfile, 'findme');

  expect(Object.prototype.toString.call(foundKeys)).toBe('[object Array]');
  expect(foundKeys.length).toBe(2);
  expect(Object.prototype.toString.call(foundKeys[0].data)).toBe('[object Array]');
  expect(foundKeys[0].type).toBe('array');
  expect(Object.prototype.toString.call(foundKeys[1].data)).toBe('[object Object]');
  expect(foundKeys[1].type).toBe('object');
});


test('type: should check the type option as string', () => {
  const foundKeys = find(jsonfile, {
    type: 'string',
  }, 'findme');

  expect(foundKeys.length).toBe(1);
  expect(foundKeys[0].type).toBe('string');
});

test('type: should check the type option as array', () => {
  const foundKeys = find(jsonfile, {
    type: ['object', 'array'],
  }, 'findme');

  expect(foundKeys.length).toBe(2);
  expect(foundKeys[0].type).toBe('object');
  expect(foundKeys[1].type).toBe('array');
});

test('max: should check if the maximum is reduced', () => {
  const foundKeys = find(jsonfile, {
    max: 1,
  }, 'findme');
  const foundKeys2 = find(jsonfile, {
    max: 2,
  }, 'findme');

  expect(foundKeys.length).toBe(1);
  expect(foundKeys2.length).toBe(2);
});
