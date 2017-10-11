import test from 'ava';

import { isJson } from '../lib';

test('should fail', (t) => {
  const invalidJson = '{"test"; "invalid"}';

  t.is(isJson(invalidJson), false);
});

test('should be a invalid json', (t) => {
  const jsonString = '{"test": "valid"}';

  t.is(isJson(jsonString), false);
});

test('should be a valid json object', (t) => {
  const jsonObject = { test: 'valid' };

  t.is(isJson(jsonObject), true);
});