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

test('should generate a json file from string', (done) => {
  write(testCwd.name, 'test.json', '{"test": "string"}', (err) => {
    expect(err).toBe(undefined);
    expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);

    done();
  });
});

test('should generate a json file from string', (done) => {
  write(testCwd.name, 'test.json', '{"test": "string"}').then((err) => {
    expect(err).toBe(undefined);
    expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);

    done();
  });
});

test('should generate a json file from object', (done) => {
  write(testCwd.name, 'test.json', { test: 'string' }, (err) => {
    expect(err).toBe(undefined);
    expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);

    done();
  });
});

test('should generate an empty json file', (done) => {
  write(testCwd.name, 'test.json', (err) => {
    expect(err).toBe(undefined);
    expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);

    done();
  });
});

test('should set the extname to json if it is not set to it', (done) => {
  write(testCwd.name, 'test.jayson', '{"test": "string"}', (err) => {
    expect(err).toBe(undefined);
    expect(fs.existsSync(path.join(testCwd.name, 'test.json'))).toBe(true);
    expect(fs.existsSync(path.join(testCwd.name, 'test.jayson'))).toBe(false);

    done();
  });
});

test('should fail', (done) => {
  write(testCwd.name, 'test.jayson', 123123, (err) => {
    expect(err.error).toBe('NOJSON');

    done();
  });
});

test('should fail', (done) => {
  write(testCwd.name, 'test.json', '{"test"; "string"}', (err) => {
    expect(err.error).toBe('NOJSON');

    done();
  });
});
