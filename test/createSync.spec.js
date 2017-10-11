import test from 'ava';
import fs from 'fs-extra';
import path from 'path';

import { createSync } from '../lib';

const testCwd = 'test/testCache';

test.afterEach(() => {
  fs.removeSync(testCwd);
});

test('should generate a json file from string', (t) => {
  createSync(testCwd, 'test.json', '{"test": "string"}');

  t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);
});

test('should generate a json file from object', (t) => {
  createSync(testCwd, 'test.json', { test: 'string' });

  t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);
});

test('should generate an empty json file', (t) => {
  createSync(testCwd, 'test.json');

  t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);
});

test('should fail', (t) => {
  const file = createSync(testCwd, 'test.json', '{"test"; "string"}');

  t.is(file, false);
});

test('should fail', (t) => {
  const file = createSync(testCwd, 'test.json', 123123);

  t.is(file, false);
});
