import { readToObj } from '../lib';

test('should read a json file to object', async () => {
  const data = await readToObj('package.json');

  expect(Object.prototype.toString.call(data)).toBe('[object Object]');
  expect(typeof data.name).toBe('string');
});

test('should read a json file to object | promise', (done) => {
  readToObj('package.json')
    .then((data) => {
      expect(Object.prototype.toString.call(data)).toBe('[object Object]');
      expect(typeof data.name).toBe('string');

      done();
    });
});

test('should read a md file', async () => {
  await expect(readToObj('README.md')).rejects.toThrow(new Error('JSON is not valid'));
});

test('should fail', async () => {
  await expect(readToObj('doesnotexist.json')).rejects.toThrow(new Error());
});
