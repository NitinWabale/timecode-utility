import {  convertFramesToTimeCode, convertTimeCodeToFrames } from '../src/timecode-utility';

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