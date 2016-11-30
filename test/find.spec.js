'use strict';

var base   = require('../');
var expect = require('chai').expect;

describe('find.js', function () {
    it('should return the expected output', function () {
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
    });

    it('should check if it is an array or object', function () {
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
    });

    describe('check its options', function() {
        var jsonfile;

        beforeEach(function () {
            jsonfile = {
                path: 'a path',
                nested: {
                    path: 'a second path',
                    findme: 'find this string',
                    nested: {
                        path: 'a third path',
                        findme: {test: 'find this an object'}
                    },
                },
                findme: ['this is an array']
            };
        });

        it('type: should check the type option as string', function () {
            var foundKeys = base.find(jsonfile, {
                type: 'string'
            }, 'findme');

            expect(foundKeys.length).to.equal(1);
            expect(foundKeys[0].type).to.equal('string');
        });

        it('type: should check the type option as array', function () {
            var foundKeys = base.find(jsonfile, {
                type: ['object', 'array']
            }, 'findme');

            expect(foundKeys.length).to.equal(2);
            expect(foundKeys[0].type).to.equal('object');
            expect(foundKeys[1].type).to.equal('array');
        });

        it('max: should check if the maximum is reduced', function () {
            var foundKeys = base.find(jsonfile, {
                max: 1
            }, 'findme');
            var foundKeys2 = base.find(jsonfile, {
                max: 2
            }, 'findme');

            expect(foundKeys.length).to.equal(1);
            expect(foundKeys2.length).to.equal(2);
        });
    });
});
