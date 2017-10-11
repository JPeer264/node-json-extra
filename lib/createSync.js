import fs from 'fs-extra';
import path from 'path';
import { check } from './check';

/**
 * Create a file
 *
 * @param {String} pathString
 * @param {String} filename
 * @param {String} [content]
 */
export const createSync = (pathString, filename, content) => {
  const combinePath = path.join(pathString, filename);

  let thisContent = content;

  thisContent = typeof thisContent === 'undefined' ? '{}' : thisContent;

  if (typeof thisContent === 'object') {
    thisContent = JSON.stringify(thisContent);
  }

  if (typeof thisContent !== 'string') return false;

  if (!check(thisContent)) return false;

  fs.ensureDirSync(pathString);
  fs.writeFileSync(combinePath, thisContent, 'utf8');

  return true;
};
