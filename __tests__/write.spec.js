import fs from 'fs-extra';
import path from 'path';

import { write } from '../lib';

const testCwd = 'test/testCache';

afterEach(() => {
  fs.removeSync(testCwd);
});

test('should generate a json file from string', (done) => {
  write(testCwd, 'test.json', '{"test": "string"}', (err) => {
    expect(err).toBe(undefined);
    expect(fs.existsSync(path.join(testCwd, 'test.json'))).toBe(true);

    done();
  });
});

test('should generate a json file from string', (done) => {
  write(testCwd, 'test.json', '{"test": "string"}').then((err) => {
    expect(err).toBe(undefined);
    expect(fs.existsSync(path.join(testCwd, 'test.json'))).toBe(true);

    done();
  });
});

test('should generate a json file from object', (done) => {
  write(testCwd, 'test.json', { test: 'string' }, (err) => {
    expect(err).toBe(undefined);
    expect(fs.existsSync(path.join(testCwd, 'test.json'))).toBe(true);

    done();
  });
});

test('should generate an empty json file', (done) => {
  write(testCwd, 'test.json', (err) => {
    expect(err).toBe(undefined);
    expect(fs.existsSync(path.join(testCwd, 'test.json'))).toBe(true);

    done();
  });
});

test('should set the extname to json if it is not set to it', (done) => {
  write(testCwd, 'test.jayson', '{"test": "string"}', (err) => {
    expect(err).toBe(undefined);
    expect(fs.existsSync(path.join(testCwd, 'test.json'))).toBe(true);
    expect(fs.existsSync(path.join(testCwd, 'test.jayson'))).toBe(false);

    done();
  });
});

test('should fail', (done) => {
  write(testCwd, 'test.jayson', 123123, (err) => {
    expect(err.error).toBe('NOJSON');

    done();
  });
});

test('should fail', (done) => {
  write(testCwd, 'test.json', '{"test"; "string"}', (err) => {
    expect(err.error).toBe('NOJSON');

    done();
  });
});
