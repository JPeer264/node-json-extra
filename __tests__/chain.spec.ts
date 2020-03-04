import { chain } from '../lib';

let jsonString;

beforeEach(() => {
  jsonString = {
    one: {
      two: [
        'two-one',
        'two-two',
      ],
      twotwo: {
        three: [
          'three-one',
          'three-two',
          'three-three',
        ],
        threetwo: {
          four: [
            'four-one',
            'four-two',
            'four-three',
          ],
        },
      },
    },
    two: ['hallo'],
  };
});

test('creates a chained path', () => {
  const pathArray = chain(jsonString);

  expect(pathArray[0]).toBe('one');
  expect(pathArray[1]).toBe('one/two');
  expect(pathArray[2]).toBe('one/two/two-one');
  expect(pathArray[3]).toBe('one/two/two-two');
  expect(pathArray[4]).toBe('one/twotwo');
  expect(pathArray[5]).toBe('one/twotwo/three');
  expect(pathArray[6]).toBe('one/twotwo/three/three-one');
  expect(pathArray[9]).toBe('one/twotwo/threetwo');
});

test('creates a chained path with another delimiter', () => {
  const pathArray = chain(jsonString, { delimiter: '--' });

  expect(pathArray[0]).toBe('one');
  expect(pathArray[1]).toBe('one--two');
  expect(pathArray[2]).toBe('one--two--two-one');
  expect(pathArray[3]).toBe('one--two--two-two');
  expect(pathArray[4]).toBe('one--twotwo');
  expect(pathArray[5]).toBe('one--twotwo--three');
  expect(pathArray[6]).toBe('one--twotwo--three--three-one');
  expect(pathArray[9]).toBe('one--twotwo--threetwo');
});


test('should not create a path', () => {
  jsonString = '{test; "test"}';

  const pathArray = chain(jsonString);

  expect(pathArray).toEqual([]);
  expect(pathArray.length).toBe(0);
});

test('type: should just get the keys of objects', () => {
  const pathArray = chain(jsonString, {
    type: 'object',
  });

  expect(pathArray.length).toBe(3);
});

test('type: should just get keys of objects and strings of arrays', () => {
  const pathArray = chain(jsonString, {
    type: ['object', 'string'],
  });

  expect(pathArray.length).toBe(12);
});

test('type: should just get arrays', () => {
  const pathArray = chain(jsonString, {
    type: ['array'],
  });

  expect(pathArray.length).toBe(4);
});
