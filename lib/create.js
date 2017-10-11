import fs from 'fs-extra';
import path from 'path';
import { fromCallback } from 'universalify';

import { isJsonString } from './isJsonString';

export const create = fromCallback((pathString, filename, content, callback) => {
  let thisContent = content;
  let thisFilename = filename;
  let cb = callback;

  if (path.extname(thisFilename) !== '.json') {
    const nameCache = thisFilename;

    thisFilename = `${path.basename(nameCache, path.extname(nameCache))}.json`;
  }

  const combinePath = path.join(pathString, thisFilename);

  if (typeof thisContent === 'function' && !cb) {
    cb = thisContent;
    thisContent = '{}';
  }

  if (typeof thisContent === 'object') {
    thisContent = JSON.stringify(thisContent);
  }

  if (typeof thisContent !== 'string') {
    return cb({
      message: 'JSON is not valid',
      error: 'NOJSON',
    });
  }

  if (!isJsonString(thisContent)) {
    return cb({
      message: 'JSON is not valid',
      error: 'NOJSON',
    });
  }

  return fs.ensureDir(pathString, (err) => {
    if (err) return cb(err);

    return fs.writeFile(combinePath, thisContent, 'utf8', (er) => {
      if (er) return cb(er);
      return cb();
    });
  });
});
