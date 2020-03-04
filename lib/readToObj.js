import fs from 'fs';
import { fromCallback } from 'universalify';

import isJsonString from './isJsonString';

const readToObj = fromCallback((path, callback) => {
  // search for file. Fail fast if there is no json File
  if (!fs.existsSync(path)) return callback(false);
  if (!fs.statSync(path).isFile()) return callback(false);

  return fs.readFile(path, 'utf8', (err, data) => {
    if (err) return callback(err);

    if (!isJsonString(data)) {
      return callback({
        message: 'JSON is not valid',
        error: 'NOJSON',
      });
    }

    const strToObj = JSON.parse(data);

    return callback(null, strToObj);
  });
});

export default readToObj;
