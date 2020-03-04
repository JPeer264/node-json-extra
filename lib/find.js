import includes from 'lodash.includes';

/**
 * The recursive method to find the specific key
 */
const matchJsonKey = (jsonObject, options, findString) => {
  let resultArray = [];

  // eslint-disable-next-line
  for (const key in jsonObject) {
    const value = jsonObject[key];

    if (key === findString) {
      let typeOfString = typeof value;

      // convert arrays from object to array
      if (Object.prototype.toString.call(value) === '[object Array]') {
        typeOfString = 'array';
      }

      // add if either
      // all are allowed => empty array or
      // if the specific type is in option.type
      if (options.type.length === 0 || includes(options.type, typeOfString)) {
        resultArray.push({
          key: findString,
          type: typeOfString,
          data: value,
        });

        if (options.max !== -1 && resultArray.length === options.max) {
          return resultArray;
        }
      }
    }

    // recursive if it is an object
    if (Object.prototype.toString.call(value) === '[object Object]') {
      const recursiveArray = matchJsonKey(value, options, findString);

      resultArray = resultArray.concat(recursiveArray);

      if (options.max !== -1 && resultArray.length >= options.max) {
        return resultArray;
      }
    }
  }

  return resultArray;
};

const find = (jsonObject, options, findString) => {
  let typeCache;

  let thisFindString = findString;
  let thisOptions = options;

  if (typeof options === 'string') {
    thisFindString = thisOptions;
    thisOptions = {};
  }

  thisOptions.type = thisOptions.type || [];
  thisOptions.max = thisOptions.max || -1;

  if (typeof thisOptions.type === 'string') {
    typeCache = thisOptions.type;

    thisOptions.type = [];
    thisOptions.type.push(typeCache);
  }

  return matchJsonKey(jsonObject, thisOptions, thisFindString);
};

export default find;
