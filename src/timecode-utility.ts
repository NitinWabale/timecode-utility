// convert timecode to frames
export const convertTimeCodeToFrames = (timecode: string, frameRate: number) => {
    const timecodeArray = timecode.split(':');
    const hours = parseInt(timecodeArray[0], 10);
    const minutes = parseInt(timecodeArray[1], 10);
    const seconds = parseInt(timecodeArray[2], 10);
    const frames = parseInt(timecodeArray[3], 10);
    return (hours * 3600 + minutes * 60 + Math.trunc(seconds)) * Math.trunc(frameRate) + Math.trunc(frames);
  };
  
  // pad the 0 if number less than 10
  const pad = (input: number) => (input < 10 ? `0${input}` : input);
  
  // convert frames to time code
  export const convertFramesToTimeCode = (frames: number, fps: number) => {
    const seconds = Math.trunc(frames / Math.trunc(fps));
  
    return [
      pad(Math.trunc(seconds / 3600)),
      pad(Math.trunc((seconds % 3600) / 60)),
      pad(Math.trunc(seconds % 60)),
      pad(Math.trunc(frames % Math.trunc(fps))),
    ].join(':');
  };

  export const isValidTimeCode = (timecode: string) => {
    // return true if it matches complete time code fomat like 10:23:23:00
    if (timecode.match(/^([0-1]?[0-9]|[0-2]?[0-3]):([0-5]?[0-9]):([0-5]?[0-9])[:]([0-6]?[0-9])$/g)) return true;
  
    // return true if it matches complete time code fomat like 10:23:23
    if (timecode.match(/^([0-1]?[0-9]|[0-2]?[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/g)) return true;
  
    // return true if it matches complete time code fomat like 10:23
    if (timecode.match(/^([0-5]?[0-9]):([0-5]?[0-9])$/g)) return true;
  
    // return valid if its like 234 or f1000 or 1000f
    if (timecode.match(/^f[0-9]+$|^[0-9]+f$|^[0-9]+$/g)) return true;
  
    // other scenarios are invalid
    return false;
  };

  export const formatTimeCode = (timecode: string, fps: number) => {
    // format timecode if its valid
    const isValid = isValidTimeCode(timecode);
  
    if (isValid) {
      // check for values like f200 or 200f
      if (timecode.includes('f')) {
        // if starts with f then remove f and convert frames to time code
        if (timecode.startsWith('f')) {
          const frames = parseInt(timecode.replace('f', ''), 10);
          return convertFramesToTimeCode(frames, fps);
        }
        // if ends with f then remove f and convert frames to time code
        const frames = parseInt(timecode.replace('f', ''), 10);
        return convertFramesToTimeCode(frames, fps);
      }
  
      // check for :
      if (timecode.includes(':')) {
        // check for 4 : for format 00:12:12:00 or 0:2:2:00
        if (timecode.match(/([0-1]?[0-9]|[0-2]?[0-3]):([0-5]?[0-9]):([0-5]?[0-9])[:]([0-6]?[0-9])$/) !== null) {
          const parts = timecode.split(':');
          return [
            pad(Math.trunc(parseInt(parts[0], 10))),
            pad(Math.trunc(parseInt(parts[1], 10))),
            pad(Math.trunc(parseInt(parts[2], 10))),
            pad(Math.trunc(parseInt(parts[3], 10))),
          ].join(':');
        }
  
        // check for 3 : for format 00:12:12 or 0:2:2
        if (timecode.match(/^([0-1]?[0-9]|[0-2]?[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/g) !== null) {
          const parts = timecode.split(':');
          return [
            pad(Math.trunc(parseInt(parts[0], 10))),
            pad(Math.trunc(parseInt(parts[1], 10))),
            pad(Math.trunc(parseInt(parts[2], 10))),
            pad(0),
          ].join(':');
        }
  
        // check for 2 : for format 00:12 or 0:2
        const parts = timecode.split(':');
        return [pad(0), pad(parseInt(parts[0], 10)), pad(parseInt(parts[1], 10)), pad(0)].join(':');
      }
      return [pad(0), pad(0), pad(parseInt(timecode, 10)), pad(0)].join(':');
    }
    return timecode;
  };
  
  