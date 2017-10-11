import test from 'ava';

import { chain } from '../lib';

let jsonString;

test.beforeEach((t) => {
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

test('creates a chained path', (t) => {
    let pathArray = chain(jsonString);

    t.is(pathArray[0], 'one');
    t.is(pathArray[1], 'one/two');
    t.is(pathArray[2], 'one/two/two-one');
    t.is(pathArray[3], 'one/two/two-two');
    t.is(pathArray[4], 'one/twotwo');
    t.is(pathArray[5], 'one/twotwo/three');
    t.is(pathArray[6], 'one/twotwo/three/three-one');
    t.is(pathArray[9], 'one/twotwo/threetwo');
});


test('should not create a path', (t) => {
    jsonString = '{test; "test"}';

    const pathArray = chain(jsonString);

    t.deepEqual(pathArray, []);
    t.is(pathArray.length, 0);
});

test('type: should just get the keys of objects', (t) => {
    const pathArray = chain(jsonString, {
        'type': 'object'
    });

    t.is(pathArray.length, 3);
});

test('type: should just get keys of objects and strings of arrays', (t) => {
    const pathArray = chain(jsonString, {
        'type': ['object', 'string']
    });

    t.is(pathArray.length, 12);
});

test('type: should just get arrays', (t) => {
    const pathArray = chain(jsonString, {
        'type': ['array']
    });

    t.is(pathArray.length, 4);
});
