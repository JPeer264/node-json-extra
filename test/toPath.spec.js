'use strict';

var base   = require('../');
var expect = require('chai').expect;

describe('toPath.js', function () {
    it('should create a path', function (done) {
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
                    ]
                }
            }
        };

        pathArray = base.toPath(jsonObj);

        console.log(pathArray);

        done();
    });

    it('should not create a path', function (done) {
        var jsonString = '{test; "test"}';

        expect(base.toPath(jsonString)).to.be.an('object');
    });
});
