'use strict';

const base   = require('../dest/');
const expect = require('chai').expect;

const testCwd = 'test/testCache';

describe('readToObj.js', () => {
    it('should read a json file to object', done => {
        base.readToObj('package.json', (data, err) => {
            expect(err).to.not.exist;

            expect(data).to.be.an('object');
            expect(data.name).to.be.a('string');

            done();
        });
    });

    it('should fail', done => {
        base.readToObj('doesnotexist.json', (data, err) => {
            expect(err).to.be.false;

            done();
        });
    });
});
