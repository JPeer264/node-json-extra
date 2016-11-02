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

    it('should generate an empty json file', function (done) {
        base.create(testCwd, 'test.json', function (err) {
            expect(err).to.not.exist;

            expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

            done();
        });
    });

    it('should set the extname to json if it is not set to it', function (done) {
        base.create(testCwd, 'test.jayson', '{"test": "string"}', function (err) {
            expect(err).to.not.exist;

            expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;
            expect(fs.existsSync(path.join(testCwd, 'test.jayson'))).to.be.false;

            done();
        });
    });

    it('should fail', function (done) {
        base.create(testCwd, 'test.jayson', 123123, function (err) {
            expect(err.error).to.equal('NOJSON');

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