import { isValidTimeCode, formatTimeCode, convertFramesToTimeCode, convertTimeCodeToFrames } from '../src/timecode-utility';

test('convertFramesToTimeCode', () => {
  expect(convertFramesToTimeCode(100, 23.98)).toBe('00:00:04:08');
  expect(convertFramesToTimeCode(100000, 23.98)).toBe('01:12:27:19');
  expect(convertFramesToTimeCode(1000, 23.98)).toBe('00:00:43:11');
  expect(convertFramesToTimeCode(10000000, 23.98)).toBe('120:46:22:14');
});

test('convertTimeCodeToFrames', () => {
  expect(convertTimeCodeToFrames('00:00:04:08', 23.98)).toBe(100);
  expect(convertTimeCodeToFrames('01:12:27:19', 23.98)).toBe(100000);
  expect(convertTimeCodeToFrames('00:00:43:11', 23.98)).toBe(1000);
  expect(convertTimeCodeToFrames('120:46:22:14', 23.98)).toBe(10000000);
});

test('isValidTimeCode', () => {
  expect(isValidTimeCode('')).toBeFalsy();
  expect(isValidTimeCode('a')).toBeFalsy();
  expect(isValidTimeCode('ff')).toBeFalsy();
  expect(isValidTimeCode('f100')).toBeTruthy();
  expect(isValidTimeCode('100f')).toBeTruthy();
  expect(isValidTimeCode('ff100')).toBeFalsy();
  expect(isValidTimeCode('100ff')).toBeFalsy();
  expect(isValidTimeCode('f1@00')).toBeFalsy();
  expect(isValidTimeCode('100')).toBeTruthy();
  expect(isValidTimeCode('1@00')).toBeFalsy();
  expect(isValidTimeCode('100#')).toBeFalsy();
  expect(isValidTimeCode('#100')).toBeFalsy();

  expect(isValidTimeCode('11:23:23:23')).toBeTruthy();
  expect(isValidTimeCode('31:23:23:23')).toBeFalsy();
  expect(isValidTimeCode('10:63:23:23')).toBeFalsy();
  expect(isValidTimeCode('10:53:78:23')).toBeFalsy();
  expect(isValidTimeCode('10:53:48:70')).toBeFalsy();
  expect(isValidTimeCode('10:53:18:69')).toBeTruthy();
  expect(isValidTimeCode('10:#3:78:23')).toBeFalsy();
  expect(isValidTimeCode('10:53:$8:70')).toBeFalsy();

  expect(isValidTimeCode('11:23:23')).toBeTruthy();
  expect(isValidTimeCode('31:23:23')).toBeFalsy();
  expect(isValidTimeCode('10:63:23')).toBeFalsy();
  expect(isValidTimeCode('10:53:78')).toBeFalsy();
  expect(isValidTimeCode('10:53:18')).toBeTruthy();
  expect(isValidTimeCode('10:#3:78')).toBeFalsy();
  expect(isValidTimeCode('10:53:$8')).toBeFalsy();
  expect(isValidTimeCode('10:53::')).toBeFalsy();

  expect(isValidTimeCode('11:23')).toBeTruthy();
  expect(isValidTimeCode('31:23')).toBeTruthy();
  expect(isValidTimeCode('10:63')).toBeFalsy();
  expect(isValidTimeCode('70:53')).toBeFalsy();
  expect(isValidTimeCode('10:53')).toBeTruthy();
  expect(isValidTimeCode('10:#3:')).toBeFalsy();
  expect(isValidTimeCode('10:5$')).toBeFalsy();
  expect(isValidTimeCode('10:')).toBeFalsy();
});

test('formatTimeCode', () => {
  expect(formatTimeCode('0', 24)).toBe('00:00:00:00');
  expect(formatTimeCode('', 24)).toBe('');
  expect(formatTimeCode('a', 24)).toBe('a');
  expect(formatTimeCode('ff', 24)).toBe('ff');
  expect(formatTimeCode('100#', 24)).toBe('100#');

  expect(formatTimeCode('f100', 24)).toBe('00:00:04:04');
  expect(formatTimeCode('100f', 24)).toBe('00:00:04:04');

  expect(formatTimeCode('0', 24)).toBe('00:00:00:00');
  expect(formatTimeCode('23', 24)).toBe('00:00:23:00');

  expect(formatTimeCode('0:3:23:23', 24)).toBe('00:03:23:23');
  expect(formatTimeCode('10:53:78:23', 24)).toBe('10:53:78:23');
  expect(formatTimeCode('0:0:3:23', 24)).toBe('00:00:03:23');
  expect(formatTimeCode('00:00:03', 24)).toBe('00:00:03:00');

  expect(formatTimeCode('0:3', 24)).toBe('00:00:03:00');
  expect(formatTimeCode('011:3', 24)).toBe('011:3');
  expect(formatTimeCode('0:03', 24)).toBe('00:00:03:00');
  expect(formatTimeCode('0:0:3:23', 24)).toBe('00:00:03:23');
  expect(formatTimeCode('00:00:03', 24)).toBe('00:00:03:00');
});