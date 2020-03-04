import includes from 'lodash.includes';

type FindType =
  | 'array'
  | 'object'
  | 'string'
  | 'number'
  | 'bigint'
  | 'symbol'
  | 'boolean'
  | 'function'
  | 'undefined'

type FindResult = { key: string; type: FindType; data: any };

type FindOptions = { type?: FindType | FindType[]; max?: number };

const find = <T = any>(
  jsonObject: T,
  findString: string,
  options: FindOptions = {},
): FindResult[] => {
  const newOptions = {
    type: [],
    max: -1,
    ...options,
  };

  newOptions.type = Array.isArray(newOptions.type)
    ? newOptions.type
    : [newOptions.type];

  let resultArray: FindResult[] = [];

  // eslint-disable-next-line
  for (const key in jsonObject) {
    const value = jsonObject[key];

    if (key === findString) {
      let typeOfString: FindType = typeof value;

      // convert arrays from object to array
      if (Object.prototype.toString.call(value) === '[object Array]') {
        typeOfString = 'array';
      }

      // add if either
      // all are allowed => empty array or
      // if the specific type is in option.type
      if (newOptions.type.length === 0 || includes(newOptions.type, typeOfString)) {
        resultArray.push({
          key: findString,
          type: typeOfString,
          data: value,
        });

        if (newOptions.max !== -1 && resultArray.length === newOptions.max) {
          return resultArray;
        }
      }
    }

    // recursive if it is an object
    if (Object.prototype.toString.call(value) === '[object Object]') {
      const recursiveArray = find(value, findString, newOptions);

      resultArray = [...resultArray, ...recursiveArray];

      if (newOptions.max !== -1 && resultArray.length >= newOptions.max) {
        return resultArray;
      }
    }
  }

  return resultArray;
};

export default find;
