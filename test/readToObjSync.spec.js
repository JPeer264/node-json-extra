'use strict';

var base   = require('../');
var expect = require('chai').expect;

var testCwd = 'test/testCache';

describe('readToObjSync.js', function () {
    it('should read a json file to object', function (done) {
        var data = base.readToObjSync('package.json');

        expect(data).to.be.an('object');
        expect(data.name).to.be.a('string');

        done();
    });

    it('should fail', function (done) {
        var data = base.readToObjSync('doesnotexist.json');

        expect(data).to.be.false;

        done();
    });
});
