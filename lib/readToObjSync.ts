import fs from 'fs';

import isJsonString from './isJsonString';

const readToObjSync = <T extends object>(path: string): false | T => {
  // search for file. Fail fast if there is no json File
  if (!fs.existsSync(path)
    || !fs.statSync(path).isFile()
  ) {
    return false;
  }

  const fileString = fs.readFileSync(path, 'utf8');

  if (!isJsonString(fileString)) {
    return false;
  }

  const strToObj = JSON.parse(fileString);

  return strToObj;
};

export default readToObjSync;
