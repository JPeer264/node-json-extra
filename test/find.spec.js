'use strict';

var base   = require('../');
var expect = require('chai').expect;

describe('find.js', function () {
    it('should return the expected output', function (done) {
        var jsonfile = {
            path: 'a path',
            nested: {
                path: 'a second path',
                findme: 'find this string',
                nested: {
                    path: 'a third path',
                    findme: 'find this second string'
                },
            },
            findme: ['test']
        };
        var foundKeys = base.find(jsonfile, 'findme');

        expect(foundKeys).to.be.an('array');
        expect(foundKeys.length).to.equal(3);
        expect(foundKeys[0].data).to.be.an('string');
        expect(foundKeys[2].data).to.be.an('array');
        expect(foundKeys[0].data).to.equal('find this string');

        done();
    });

    it('should check if it is an array or object', function (done) {
        var jsonfile = {
            findme: ['test'],
            test: {
                findme: {test: 'test'}
            }
        };
        var foundKeys = base.find(jsonfile, 'findme');

        expect(foundKeys).to.be.an('array');
        expect(foundKeys.length).to.equal(2);
        expect(foundKeys[0].data).to.be.an('array');
        expect(foundKeys[0].type).to.equal('array');
        expect(foundKeys[1].data).to.be.an('object');
        expect(foundKeys[1].type).to.equal('object');

        done();
    });
});