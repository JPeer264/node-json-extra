import test from 'ava';
import fs from 'fs-extra';
import path from 'path';

import { writeSync } from '../lib';

const testCwd = 'test/testCache';

test.afterEach(() => {
  fs.removeSync(testCwd);
});

test.serial('should generate a json file from string', (t) => {
  writeSync(testCwd, 'test.json', '{"test": "string"}');

  t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);
});

test.serial('should generate a json file from object', (t) => {
  writeSync(testCwd, 'test.json', { test: 'string' });

  t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);
});

test.serial('should generate an empty json file', (t) => {
  writeSync(testCwd, 'test.json');

  t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);
});

test.serial('should fail', (t) => {
  const file = writeSync(testCwd, 'test.json', '{"test"; "string"}');

  t.is(file, false);
});

test.serial('should fail', (t) => {
  const file = writeSync(testCwd, 'test.json', 123123);

  t.is(file, false);
});
