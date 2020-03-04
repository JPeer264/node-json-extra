import entries from 'object.entries';
import includes from 'lodash.includes';

import isJson from './isJson';

let delimiterSeperatedArray;

/**
 * Make a json file into a delimiter seperated string.
 * It will push everything into the global delimiterSeperatedArray
 */
const jsonConcat = (json, options, jsonString) => {
  entries(json).forEach((entryArray) => {
    const key = entryArray[0];
    const value = entryArray[1];

    let generatedJsonString;
    let typeOfString = typeof value;

    // convert arrays from object to array
    if (Object.prototype.toString.call(value) === '[object Array]') {
      typeOfString = 'array';
    }

    if (jsonString) {
      // if the objects are nested, jsonString is not empty
      generatedJsonString = jsonString + options.delimiter + key;
    } else {
      // for the first object for loop
      generatedJsonString = key;
    }

    if (options.type.length === 0 || includes(options.type, typeOfString)) {
      delimiterSeperatedArray.push(generatedJsonString);
    }

    if (typeOfString === 'array') {
      // arrays should iterate over single values and add it to the global delimiterSeperatedArray
      value.forEach((item) => {
        if (options.type.length === 0 || includes(options.type, typeof item)) {
          delimiterSeperatedArray.push(generatedJsonString + options.delimiter + item);
        }
      });
    } else if (typeOfString === 'object') {
      // objects should just recursivly call the function
      jsonConcat(value, options, generatedJsonString);
    }
  });
};

const chain = (json, options = {}) => {
  const otherOptions = options;

  otherOptions.type = otherOptions.type || [];
  otherOptions.delimiter = otherOptions.delimiter || '/';

  delimiterSeperatedArray = [];

  if (!isJson(json)) {
    return [];
  }

  jsonConcat(json, options);

  return delimiterSeperatedArray;
};

export default chain;
