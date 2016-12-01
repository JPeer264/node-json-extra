'use strict';

var base   = require('../');
var expect = require('chai').expect;

describe('toPath.js', function () {
    it('should create a path', function () {
        var pathArray;
        var jsonObj = {
            one: {
                two: [
                    'two-one',
                    'two-two'
                ],
                'twotwo': {
                    three: [
                        'three-one',
                        'three-two',
                        'three-three'
                    ],
                    'threetwo': {
                        four: [
                            'four-one',
                            'four-two',
                            'four-three'
                        ]
                    }
                }
            },
            two: ['hallo']
        };

        pathArray = base.toPath(jsonObj);

        expect(pathArray[0]).to.equal('one');
        expect(pathArray[1]).to.equal('one/two');
        expect(pathArray[2]).to.equal('one/two/two-one');
        expect(pathArray[3]).to.equal('one/two/two-two');
        expect(pathArray[4]).to.equal('one/twotwo');
        expect(pathArray[5]).to.equal('one/twotwo/three');
        expect(pathArray[6]).to.equal('one/twotwo/three/three-one');
        expect(pathArray[9]).to.equal('one/twotwo/threetwo');
    });

    it('should not create a path', function () {
        var jsonString = '{test; "test"}';
        var pathArray = base.toPath(jsonString);

        expect(pathArray).to.be.an('array');
        expect(pathArray.length).to.equal(0);
    });
});
