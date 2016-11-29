'use strict';

var base   = require('../');
var expect = require('chai').expect;

var testCwd = 'test/testCache';

describe('readToObj.js', function () {
    it('should read a json file to object', function (done) {
        base.readToObj('package.json', function (data, err) {
            expect(err).to.not.exist;

            expect(data).to.be.an('object');
            expect(data.name).to.be.a('string');

            done();
        });
    });

    it('should fail', function (done) {
        base.readToObj('doesnotexist.json', function (data, err) {
            expect(err).to.be.false;

            done();
        });
    });
});
