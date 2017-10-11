import test from 'ava';

import { isJsonString } from '../lib';

test('should fail', (t) => {
  const invalidJson = '{"test"; "invalid"}';

  t.is(isJsonString(invalidJson), false);
});

test('should be a invalid json', (t) => {
  const jsonString = '{"test": "valid"}';

  t.is(isJsonString(jsonString), true);
});

test('should be a valid json object', (t) => {
  const jsonObject = { test: 'valid' };

  t.is(isJsonString(jsonObject), false);
});
