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
    return false;
  };
  