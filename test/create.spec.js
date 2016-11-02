'use strict';

var base   = require('../');
var fs     = require('fs-extra');
var path   = require('path');
var expect = require('chai').expect;

var testCwd = 'test/testCache';

describe('create.js', function () {
    afterEach(function () {
        fs.removeSync(testCwd);
    });

    it('should generate a json file from string', function (done) {
        base.create(testCwd, 'test.json', '{"test": "string"}', function (err) {
            expect(err).to.not.exist;

            expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

            done();
        });
    });

    it('should generate a json file from object', function (done) {
        base.create(testCwd, 'test.json', {"test": "string"}, function (err) {
            expect(err).to.not.exist;

            expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

            done();
        });
    });

    it('should fail', function (done) {
        base.create(testCwd, 'test.json', '{"test"; "string"}', function (err) {
            expect(err.error).to.equal('NOJSON');

            done();
        });
    });
});