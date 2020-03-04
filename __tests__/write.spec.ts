import tmp from 'tmp';
import fs from 'fs-extra';
import path from 'path';

import { write } from '../lib';

let testCwd;

beforeEach(() => {
  testCwd = tmp.dirSync();
});

afterEach(() => {
  testCwd.removeCallback();
});

test('should generate a json file from string', async () => {
  await write(testCwd.name, 'test.json', '{"test": "string"}');

  expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);
});

test('should generate a json file from string', async () => {
  await write(testCwd.name, 'test.json', '{"test": "string"}');

  expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);
});

test('should generate a json file from object', async () => {
  await write(testCwd.name, 'test.json', { test: 'string' });

  expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);
});

test('should generate an empty json file', async () => {
  await write(testCwd.name, 'test.json');

  expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);
});

test('should set the extname to json if it is not set to it', async () => {
  await write(testCwd.name, 'test.jayson', '{"test": "string"}');

  expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);
  expect(fs.existsSync(path.join(testCwd.name, 'test.jayson'))).toBe(false);
});

test('should fail', async () => {
  await expect(write(testCwd.name, 'test.jayson', 123123)).rejects.toThrowError();
});

test('should fail', async () => {
  await expect(write(testCwd.name, 'test.json', '{"test"; "string"}')).rejects.toThrowError();
});
