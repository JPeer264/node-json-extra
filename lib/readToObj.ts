import fs from 'fs-extra';

import isJsonString from './isJsonString';

const readToObj = async <T extends object>(path: string): Promise<T> => {
  // search for file. Fail fast if there is no json File
  if (!fs.existsSync(path) || !fs.statSync(path).isFile()) {
    throw new Error();
  }

  const data = await fs.readFile(path, 'utf8');

  if (!isJsonString(data)) {
    throw new Error('JSON is not valid');
  }

  const strToObj = JSON.parse(data);

  return strToObj;
};

export default readToObj;
