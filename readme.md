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
var json = require('json-extra');
```

## Methods

- [check](#check)
- [isJson](#check)
- [isValid](#check)
- [toPath](#toPath)
- [chain](#toPath)
- [readToObj](#readToObj)
- [readToObjSync](#readToObj)
- [create](#create)
- [createSync](#create)
- [write](#create)
- [writeSync](#create)
- [find](#find)


### check()

**check([type,] json)**

Check if it is a valid string or object. Just do a `JSON.parse` but with `try - catch`. Returns a boolean. The `type` is optional it its default is `string`. If you want to check if you have a object you can type in `object` as `type`.

`type` valid values: `string` or `object`. Default: `string`

Alias: `isJson()`
Alias: `isValid()`

Example:

```js
var json = require('json-extra')

json.check('object', myObject) // true | false
json.isJson(myJsonString) // true | false
```

### toPath()

**toPath(json[, options][, delimiter])**

Options:

- type (array | string): Get specific types. Available options: `array`, `object`, `string`, `boolean` or `number`

If you want to change your json string into a path just hit this method.
`base` in an object is always the name of the folder.
`subfolders` create new subfolders

Alias: `chain()`

Example:

```js
var json = require('json-extra')

var myJsonString = {
    "src": {
        "app": {
            "base": "app",
            "subfolder": [
                "components",
                "pages",
                "services"
            ]
        }
    }
}

// returns: [ 'src', 'src/app', 'src/app/components', 'src/app/pages', 'src/app/services' ]
json.toPath(myJsonString);
```

### readToObj()

**readToObj(path, callback)**

Read a json file and returns an obj.

Sync: `readToObjSync()`

Example:

```js
var json = require('json-extra')

// read a json file and return an object
json.readToObj('/path/to/json', function(err, data) {
    if (err) return console.error(err)

    console.log('My nice data: ', data)
})
```

### create()

**create(path, filename[, content], callback)**


Create a new json file. The content could be a object or a json string.

Alias: `write()`<br>
Sync: `createSync()`<br>
Sync-Alias: `writeSync()`

Example:

```js
var json = require('json-extra')

// created a new json file
json.create('/any/path/you/want', 'filename.json', '{json: "string or object"}', function(err) {
    if (err) return console.error(err)

    console.log('Created!');
})
```

### find()

**find(jsonObject[, options], findString)**

Finds a specific key in the json

Options:

- type (array | string): Get specific types. Available options: `array`, `object`, `string`, `boolean` or `number`
- max (boolean): The maximum of keys to find. Default: `-1` alias unlimited

Example:

```js
var json = require('json-extra')
var myJsonObejct = json.readToObj('./package.json')

// created a new json file
var foundKeys = json.find(myJsonObject, 'dependencies')
// returns: [ { key: 'dependencies', type: 'object', data: {} } ]
```
