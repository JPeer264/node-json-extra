'use strict';

const base = require('../dest/');
const expect = require('chai').expect;

describe('isJson.js', () => {
    it('should fail', done => {
        const invalidJson = '{"test"; "invalid"}';

        expect(base.isJson(invalidJson)).to.be.false;

        done();
    });

    it('should be a valid json string', done => {
        const jsonString = '{"test": "valid"}';

        expect(base.isJson(jsonString)).to.be.true;

        done();
    });

    it('should be a valid json object', done => {
        const jsonObject = {"test": "valid"};

        expect(base.isJson('object', jsonObject)).to.be.true;

        done();
    });
});
