import entries from 'object.entries';
import includes from 'lodash.includes';

import { check } from './index';

let delimiterSeperatedArray;

/**
 * Make a json file into a delimiter seperated string.
 * It will push everything into the global delimiterSeperatedArray
 *
 * @param {Object} _json
 * @param {Object} options
 * @param {String} delimiter='/' the delimiter to seperate every single key/value.
 */
const jsonConcat = (_json, options, _delimiter, _jsonString) => {
  entries(_json).forEach((entryArray) => {
    const key = entryArray[0];
    const value = entryArray[1];

    let jsonString;
    let typeOfString = typeof value;

    // convert arrays from object to array
    if (Object.prototype.toString.call(value) === '[object Array]') {
      typeOfString = 'array';
    }

    if (_jsonString) {
      // if the objects are nested, _jsonString is not empty
      jsonString = _jsonString + _delimiter + key;
    } else {
      // for the first object for loop
      jsonString = key;
    }

    if (options.type.length === 0 || includes(options.type, typeOfString)) {
      delimiterSeperatedArray.push(jsonString);
    }

    if (typeOfString === 'array') {
      // arrays should iterate over single values and add it to the global delimiterSeperatedArray
      value.forEach((item) => {
        if (options.type.length === 0 || includes(options.type, typeof item)) {
          delimiterSeperatedArray.push(jsonString + _delimiter + item);
        }
      });
    } else if (typeOfString === 'object') {
      // objects should just recursivly call the function
      jsonConcat(value, options, _delimiter, jsonString);
    }
  });
};

/**
 * creates a delimiter seperated chain of single keys/values
 *
 * @param {Object} json
 * @param {Object} options
 * @param {String} delimiter='/' the delimiter to seperate every single key/value.
 */
export const chain = (_json, options = {}, delimiter = '/') => {
  let thisOptions = options;
  let thisDelimiter = delimiter;

  delimiterSeperatedArray = [];

  if (typeof options === 'string') {
    thisDelimiter = options;
    thisOptions = {};
  }

  thisOptions.type = thisOptions.type || [];

  if (!check('object', _json)) {
    return [];
  }

  jsonConcat(_json, thisOptions, thisDelimiter);

  return delimiterSeperatedArray;
};
