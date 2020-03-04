import { isJson } from '../lib';

test('should fail', () => {
  const invalidJson = '{"test"; "invalid"}';

  expect(isJson(invalidJson)).toBe(false);
});

test('should be a invalid json', () => {
  const jsonString = '{"test": "valid"}';

  expect(isJson(jsonString)).toBe(false);
});

test('should be a valid json object', () => {
  const jsonObject = { test: 'valid' };

  expect(isJson(jsonObject)).toBe(true);
});
