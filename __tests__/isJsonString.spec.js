import { isJsonString } from '../lib';

test('should fail', () => {
  const invalidJson = '{"test"; "invalid"}';

  expect(isJsonString(invalidJson)).toBe(false);
});

test('should be a invalid json', () => {
  const jsonString = '{"test": "valid"}';

  expect(isJsonString(jsonString)).toBe(true);
});

test('should be a valid json object', () => {
  const jsonObject = { test: 'valid' };

  expect(isJsonString(jsonObject)).toBe(false);
});
