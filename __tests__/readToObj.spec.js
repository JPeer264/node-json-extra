import { readToObj } from '../lib';

test('should read a json file to object', (done) => {
  readToObj('package.json', (err, data) => {
    expect(err).toBe(null);

    expect(Object.prototype.toString.call(data)).toBe('[object Object]');
    expect(typeof data.name).toBe('string');

    done();
  });
});

test('should read a json file to object | promise', (done) => {
  readToObj('package.json')
    .then((data) => {
      expect(Object.prototype.toString.call(data)).toBe('[object Object]');
      expect(typeof data.name).toBe('string');

      done();
    });
});

test('should read a md file', (done) => {
  readToObj('README.md')
    .catch((err) => {
      expect(err.error).toBe('NOJSON');

      done();
    });
});

test('should fail', (done) => {
  readToObj('doesnotexist.json', (err) => {
    expect(err).toBe(false);

    done();
  });
});
