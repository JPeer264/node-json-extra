import test from 'ava';
import fs from 'fs-extra';
import path from 'path';

import { write } from '../lib';

const testCwd = 'test/testCache';

test.afterEach(() => {
  fs.removeSync(testCwd);
});

test.cb.serial('should generate a json file from string', (t) => {
  write(testCwd, 'test.json', '{"test": "string"}', (err) => {
    t.is(err, undefined);
    t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);

    t.end();
  });
});

test.cb.serial('should generate a json file from string', (t) => {
  write(testCwd, 'test.json', '{"test": "string"}').then((err) => {
    t.is(err, undefined);
    t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);

    t.end();
  });
});

test.cb.serial('should generate a json file from object', (t) => {
  write(testCwd, 'test.json', { test: 'string' }, (err) => {
    t.is(err, undefined);
    t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);

    t.end();
  });
});

test.cb.serial('should generate an empty json file', (t) => {
  write(testCwd, 'test.json', (err) => {
    t.is(err, undefined);
    t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);

    t.end();
  });
});

test.cb.serial('should set the extname to json if it is not set to it', (t) => {
  write(testCwd, 'test.jayson', '{"test": "string"}', (err) => {
    t.is(err, undefined);
    t.is(fs.existsSync(path.join(testCwd, 'test.json')), true);
    t.is(fs.existsSync(path.join(testCwd, 'test.jayson')), false);

    t.end();
  });
});

test.cb.serial('should fail', (t) => {
  write(testCwd, 'test.jayson', 123123, (err) => {
    t.is(err.error, 'NOJSON');

    t.end();
  });
});

test.cb.serial('should fail', (t) => {
  write(testCwd, 'test.json', '{"test"; "string"}', (err) => {
    t.is(err.error, 'NOJSON');

    t.end();
  });
});
