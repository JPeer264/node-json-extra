import fs from 'fs';
import { fromCallback } from 'universalify';

/**
 * Read the file in the path and convert it into an Javascript Object
 *
 * @param {String} path
 *
 * @return {Objects} strToObj
 */
export const readToObj = fromCallback((path, callback) => {
    // search for file. Fail fast if there is no json File
  if (!fs.existsSync(path)) return callback(false);
  if (!fs.statSync(path).isFile()) return callback(false);

  return fs.readFile(path, 'utf8', (err, data) => {
    if (err) return callback(err);

    const strToObj = JSON.parse(data);

    return callback(null, strToObj);
  });
});
