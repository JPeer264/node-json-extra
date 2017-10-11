import fs from 'fs';

export const readToObjSync = (path) => {
  // search for file. Fail fast if there is no json File
  if (!fs.existsSync(path)) return false;
  if (!fs.statSync(path).isFile()) return false;

  const fileString = fs.readFileSync(path, 'utf8');
  const strToObj = JSON.parse(fileString);

  return strToObj;
};
