import { readToObjSync } from '../lib';

test('should read a json file to object', () => {
  const data = readToObjSync('package.json');

  expect(Object.prototype.toString.call(data)).toBe('[object Object]');
  expect(typeof data.name).toBe('string');
});

test('file is no json', () => {
  const data = readToObjSync('README.md');

  expect(data).toBe(false);
});


test('file does not exist', () => {
  const data = readToObjSync('doesnotexist.json');

  expect(data).toBe(false);
});
