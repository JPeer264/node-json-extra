'use strict';

const base   = require('../');
const expect = require('chai').expect;

const testCwd = 'test/testCache';

describe('readToObjSync.js', () => {
    it('should read a json file to object', () => {
        const data = base.readToObjSync('package.json');

        expect(data).to.be.an('object');
        expect(data.name).to.be.a('string');
    });

    it('should fail', () => {
        const data = base.readToObjSync('doesnotexist.json');

        expect(data).to.be.false;
    });
});
