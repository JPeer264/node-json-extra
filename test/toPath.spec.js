'use strict';

const base   = require('../dest/');
const expect = require('chai').expect;

describe('toPath.js', () => {
    it('should create a path', () => {
        const jsonObj = {
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

        let pathArray = base.toPath(jsonObj);

        expect(pathArray[0]).to.equal('one');
        expect(pathArray[1]).to.equal('one/two');
        expect(pathArray[2]).to.equal('one/two/two-one');
        expect(pathArray[3]).to.equal('one/two/two-two');
        expect(pathArray[4]).to.equal('one/twotwo');
        expect(pathArray[5]).to.equal('one/twotwo/three');
        expect(pathArray[6]).to.equal('one/twotwo/three/three-one');
        expect(pathArray[9]).to.equal('one/twotwo/threetwo');
    });

    it('should not create a path', () => {
        const jsonString = '{test; "test"}';
        const pathArray = base.toPath(jsonString);

        expect(pathArray).to.be.an('array');
        expect(pathArray.length).to.equal(0);
    });

    describe('check its options', () => {
        let jsonString;

        beforeEach(() => {
            jsonString = {
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
        });

        it('type: should just get the keys of objects', () => {
            const pathArray = base.toPath(jsonString, {
                'type': 'object'
            });

            expect(pathArray.length).to.equal(3);
        });

        it('type: should just get keys of objects and strings of arrays', () => {
            const pathArray = base.toPath(jsonString, {
                'type': ['object', 'string']
            });

            expect(pathArray.length).to.equal(12);
        });

        it('type: should just get arrays', () => {
            const pathArray = base.toPath(jsonString, {
                'type': ['array']
            });

            expect(pathArray.length).to.equal(4);
        });
    });
});
