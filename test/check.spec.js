'use strict';

var base   = require('../');
var expect = require('chai').expect;

describe('check.js', function () {
    it('should fail', function (done) {
        var invalidJson = '{"test"; "invalid"}';

        expect(base.check(invalidJson)).to.be.false;

        done();
    });

    it('should be a valid json string', function (done) {
        var jsonString = '{"test": "valid"}';

        expect(base.check(jsonString)).to.be.true;

        done();
    });

    it('should be a valid json object', function (done) {
        var jsonObject = {"test": "valid"};

        expect(base.check('object', jsonObject)).to.be.true;

        done();
    });
});