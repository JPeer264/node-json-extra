'use strict';

const base   = require('../');
const fs     = require('fs-extra');
const path   = require('path');
const expect = require('chai').expect;

const testCwd = 'test/testCache';

describe('create.js', () => {
    afterEach(() => {
        fs.removeSync(testCwd);
    });

    it('should generate a json file from string', done => {
        base.create(testCwd, 'test.json', '{"test": "string"}', err => {
            expect(err).to.not.exist;

            expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

            done();
        });
    });

    it('should generate a json file from object', done => {
        base.create(testCwd, 'test.json', {"test": "string"}, err => {
            expect(err).to.not.exist;

            expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

            done();
        });
    });

    it('should generate an empty json file', done => {
        base.create(testCwd, 'test.json', err => {
            expect(err).to.not.exist;

            expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;

            done();
        });
    });

    it('should set the extname to json if it is not set to it', done => {
        base.create(testCwd, 'test.jayson', '{"test": "string"}', err => {
            expect(err).to.not.exist;

            expect(fs.existsSync(path.join(testCwd, 'test.json'))).to.be.true;
            expect(fs.existsSync(path.join(testCwd, 'test.jayson'))).to.be.false;

            done();
        });
    });

    it('should fail', done => {
        base.create(testCwd, 'test.jayson', 123123, err => {
            expect(err.error).to.equal('NOJSON');

            done();
        });
    });

    it('should fail', done => {
        base.create(testCwd, 'test.json', '{"test"; "string"}', err => {
            expect(err.error).to.equal('NOJSON');

            done();
        });
    });
});
