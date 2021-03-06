import fs from 'fs-extra';
import path from 'path';

import isJsonString from './isJsonString';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const writeSync = (pathString: string, filename: string, content: any): boolean => {
  const combinePath = path.join(pathString, filename);

  let thisContent = content;

  thisContent = typeof thisContent === 'undefined' ? '{}' : thisContent;

  if (typeof thisContent === 'object') {
    thisContent = JSON.stringify(thisContent);
  }

  if (typeof thisContent !== 'string') return false;

  if (!isJsonString(thisContent)) return false;

  fs.ensureDirSync(pathString);
  fs.writeFileSync(combinePath, thisContent, 'utf8');

  return true;
};

export default writeSync;
