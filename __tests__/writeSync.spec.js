import tmp from 'tmp';
import fs from 'fs-extra';
import path from 'path';

import { writeSync } from '../lib';

let testCwd;

beforeEach(() => {
  testCwd = tmp.dirSync();
});

afterEach(() => {
  testCwd.removeCallback();
});

test('should generate a json file from string', () => {
  writeSync(testCwd.name, 'test.json', '{"test": "string"}');

  expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);
});

test('should generate a json file from object', () => {
  writeSync(testCwd.name, 'test.json', { test: 'string' });

  expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);
});

test('should generate an empty json file', () => {
  writeSync(testCwd.name, 'test.json');

  expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);
});

test('should fail', () => {
  const file = writeSync(testCwd.name, 'test.json', '{"test"; "string"}');

  expect(file).toBe(false);
});

test('should fail', () => {
  const file = writeSync(testCwd.name, 'test.json', 123123);

  expect(file).toBe(false);
});
