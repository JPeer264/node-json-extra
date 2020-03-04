import fs from 'fs-extra';
import path from 'path';

import { writeSync } from '../lib';

const testCwd = 'test/testCache';

afterEach(() => {
  fs.removeSync(testCwd);
});

test('should generate a json file from string', () => {
  writeSync(testCwd, 'test.json', '{"test": "string"}');

  expect(fs.existsSync(path.join(testCwd, 'test.json'))).toBe(true);
});

test('should generate a json file from object', () => {
  writeSync(testCwd, 'test.json', { test: 'string' });

  expect(fs.existsSync(path.join(testCwd, 'test.json'))).toBe(true);
});

test('should generate an empty json file', () => {
  writeSync(testCwd, 'test.json');

  expect(fs.existsSync(path.join(testCwd, 'test.json'))).toBe(true);
});

test('should fail', () => {
  const file = writeSync(testCwd, 'test.json', '{"test"; "string"}');

  expect(file).toBe(false);
});

test('should fail', () => {
  const file = writeSync(testCwd, 'test.json', 123123);

  expect(file).toBe(false);
});
