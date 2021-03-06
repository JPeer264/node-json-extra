import fs from 'fs-extra';
import path from 'path';

import isJsonString from './isJsonString';

const write = async (
  pathString: string,
  filename: string,
  content: string | object = '{}',
): Promise<void> => {
  let thisContent = content;
  let thisFilename = filename;

  if (path.extname(thisFilename) !== '.json') {
    const nameCache = thisFilename;

    thisFilename = `${path.basename(nameCache, path.extname(nameCache))}.json`;
  }

  const combinePath = path.join(pathString, thisFilename);

  if (typeof thisContent === 'object') {
    thisContent = JSON.stringify(thisContent);
  }

  if (typeof thisContent !== 'string' || !isJsonString(thisContent)) {
    throw new Error('JSON is not valid');
  }

  await fs.ensureDir(pathString);
  await fs.writeFile(combinePath, thisContent, 'utf8');
};

export default write;
