import entries from 'object.entries';
import includes from 'lodash.includes';

import { FindType } from './find';
import isJson from './isJson';

let delimiterSeperatedArray: string[];

interface ChainOptions {
  type: FindType | FindType[];
  delimiter: string;
}

/**
 * Make a json file into a delimiter seperated string.
 * It will push everything into the global delimiterSeperatedArray
 */
const jsonConcat = <T extends object>(
  json: T,
  options: ChainOptions,
  jsonString?: string,
): void => {
  entries(json).forEach((entryArray: [string, any]) => {
    const key = entryArray[0];
    const value = entryArray[1];

    let generatedJsonString: string;
    let typeOfString: FindType = typeof value;

    // convert arrays from object to array
    if (Array.isArray(value)) {
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

    if (typeOfString === 'array' && Array.isArray(value)) {
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

const chain = <T extends object>(json: T, options: Partial<ChainOptions> = {}): string[] => {
  const newOptions: ChainOptions = {
    type: [],
    delimiter: '/',
    ...options,
  };

  delimiterSeperatedArray = [];

  if (!isJson(json)) {
    return [];
  }

  jsonConcat(json, newOptions);

  return delimiterSeperatedArray;
};

export default chain;
