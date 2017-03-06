'use strict';

const base   = require('../dest/');
const fs     = require('fs-extra');
const path   = require('path');
const expect = require('chai').expect;

const testCwd = 'test/testCache';

describe('createSync.js', () => {
    afterEach(() => {
        fs.removeSync(testCwd);
    });

    it('should generate a json file from string', done => {
        const file = base.createSync(testCwd, 'test.json', '{"test": "string"}');

        expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

        done();
    });

    it('should generate a json file from object', done => {
        const file = base.createSync(testCwd, 'test.json', {"test": "string"});

        expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

        done();
    });

    it('should generate an empty json file', done => {
        const file = base.createSync(testCwd, 'test.json');

        expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

        done();
    });

    it('should fail', done => {
        const file = base.createSync(testCwd, 'test.json', '{"test"; "string"}');

        expect(file).to.be.false;

        done();
    });

    it('should fail', done => {
        const file = base.createSync(testCwd, 'test.json', 123123);

        expect(file).to.be.false;

        done();
    });
});
