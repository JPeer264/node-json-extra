# json-extra

[![Build Status](https://travis-ci.org/JPeer264/node-json-extra.svg?branch=master)]((https://travis-ci.org/JPeer264/node-json-extra))
[![Coverage Status](https://coveralls.io/repos/github/JPeer264/node-json-extra/badge.svg)](https://coveralls.io/github/JPeer264/node-json-extra)

> `json-extra` gives you a little more power to json files and strings

## Getting started

```sh
npm install --save json-extra
```

or

```sh
yarn add json-extra
```

## Usage

With `json-extra` you can do such things like read json files and directly parse them into an object or just create a new json file.
`JSON.parse` and `JSON.stringify` is also attached to `json-extra`.

Include `json-extra` as follows:
```js
import * as json from 'json-extra';
```

## Sync vs. Async

Most methods are async by default. All async methods will return a promise if the callback isn't passed.

Sync methods on the other hand will throw if an error occurs.

Example:
```js
import { write, writeSync } from 'json-extra';

// Async with promises:
write('/any/path/you/want', 'filename.json', '{json: "string or object"}')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))

// Async with callbacks:
write('/any/path/you/want', 'filename.json', '{json: "string or object"}', err => {
  if (err) return console.error(err)
  console.log('success!')
})

// Sync:
try {
  writeSync('/any/path/you/want', 'filename.json', '{json: "string or object"}')
  console.log('success!')
} catch (err) {
  console.error(err)
}
```

## Methods

- [isJson](#isJson)
- [isJsonString](#isJsonString)
- [chain](#chain)
- [readToObj](#readToObj)
- [readToObjSync](#readToObj)
- [write](#write)
- [writeSync](#write)
- [find](#find)

### isJson()

**isJson(json)**

Checks if the input is a valid json object

Example:

```js
import { isJson } from 'json-extra';

isJson({ myJson: '' }); // true
isJson('{ myJson: '' }'); // false
isJson('nope'); // false
```

### isJsonString()

**isJsonString(jsonString)**

Checks if the given string would be a valid json object

Example:

```js
import { isJsonString } from 'json-extra';

isJsonString('{ myJson: '' }'); // true
isJsonString({ myJson: '' }); // false
isJsonString('nope'); // false
```

### chain()

**chain(json[, options])**

Options:

- type (array | string): Get specific types. Available options: `array`, `object`, `string`, `boolean` or `number`
- delimiter (string): Changes the delimiter between the chained strings. Default: `'/'`

Example:

```js
import { chain } from 'json-extra';

var myJsonString = {
    myJson: {
        sub: [
            'components',
            'pages',
            'services',
        ],
    },
};

chain(myJsonString);
// returns: [ 'myJson', 'myJson/sub', 'myJson/sub/components', 'myJson/sub/pages', 'myJson/sub/services' ]
chain(myJsonString, { type: 'array' });
// returns: [ 'myJson/sub' ]
chain(myJsonString, { type: 'string' });
// returns: [ 'myJson/sub/components', 'myJson/sub/pages', 'myJson/sub/services' ]
```

### readToObj()

**readToObj(path[, callback])**

Read a json file and returns an obj.

Sync: `readToObjSync()`

Example:

```js
import { readToObj } from 'json-extra';

// read a json file and return an object
readToObj('/path/to/json')
    .then(data => console.log('My nice data: ', data))
    .catch(console.error);
```

### write()

**write(path, filename[, content, callback])**

write a new json file. The content could be a object or a json string.

Sync: `writeSync()`

Example:

```js
import { write } from 'json-extra';

// writed a new json file
write('/any/path/you/want', 'filename.json', '{json: "string or object"}')
    .then(() => console.log('Written!'))
    .catch(console.error);
```

### find()

**find(jsonObject, findString[, options])**

Finds a specific key in the json

Options:

- type (array | string): Get specific types. Available options: `array`, `object`, `string`, `boolean` or `number`
- max (boolean): The maximum of keys to find. Default: `-1` alias unlimited

Example:

```js
import { find, readToObj } from 'json-extra';

const myJsonObejct = readToObj('./package.json')
const foundKeys = find(myJsonObject, 'dependencies')
// returns: [ { key: 'dependencies', type: 'object', data: {} } ]
```
