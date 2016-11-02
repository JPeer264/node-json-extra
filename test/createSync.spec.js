'use strict';

var base   = require('../');
var fs     = require('fs-extra');
var path   = require('path');
var expect = require('chai').expect;

var testCwd = 'test/testCache';

describe('createSync.js', function () {
    afterEach(function () {
        fs.removeSync(testCwd);
    });

    it('should generate a json file from string', function (done) {
        var file = base.createSync(testCwd, 'test.json', '{"test": "string"}');

        expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

        done();
    });

    it('should generate a json file from object', function (done) {
        var file = base.createSync(testCwd, 'test.json', {"test": "string"});

        expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

        done();
    });

    it('should generate an empty json file', function (done) {
        var file = base.createSync(testCwd, 'test.json');

        expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

        done();
    });

    it('should fail', function (done) {
        var file = base.createSync(testCwd, 'test.json', '{"test"; "string"}');

        expect(file).to.be.false;

        done();
    });

    it('should fail', function (done) {
        var file = base.createSync(testCwd, 'test.json', 123123);

        expect(file).to.be.false;

        done();
    });
});
