'use strict';

const base   = require('../dest/');
const expect = require('chai').expect;

describe('check.js', () => {
    it('should fail', done => {
        const invalidJson = '{"test"; "invalid"}';

        expect(base.check(invalidJson)).to.be.false;

        done();
    });

    it('should be a valid json string', done => {
        const jsonString = '{"test": "valid"}';

        expect(base.check(jsonString)).to.be.true;

        done();
    });

    it('should be a valid json object', done => {
        const jsonObject = {"test": "valid"};

        expect(base.check('object', jsonObject)).to.be.true;

        done();
    });
});
