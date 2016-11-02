# json-extra

[![Coverage Status](https://coveralls.io/repos/github/JPeer264/node-json-extra/badge.svg)](https://coveralls.io/github/JPeer264/node-json-extra)
[![Build Status](https://travis-ci.org/JPeer264/node-json-extra.svg)](https://travis-ci.org/JPeer264/node-json-extra)

> 'json-extra' gives you a little more power to json files and strings

## Getting started
```shell
npm install --save json-extra
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
- [toPath](#toPath)
- [readToObj](#readToObj)
- [readToObjSync](#readToObj)
- [create](#create)
- [createSync](#create)

### check()

**check([type,] json)**

Check if it is a valid string or object. Just do a `JSON.parse` but with `try - catch`. Returns a boolean. The `type` is optional it its default is `string`. If you want to check if you have a object you can type in `object` as `type`.

`type` valid values: `string` or `object`

*Alias: isJson()*

```js
var json = require('json-extra')

json.check('object', myObject) // true | false
json.isJson(myJsonString) // true | false
```

### toPath()

**toPath(json)**

If you want to change your json string into a path just hit this method.
`base` in an object is always the name of the folder.
`subfolders` create new subfolders

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

*Sync: readToObjSync()*

```js
var json = require('json-extra')

json.readToObj('/path/to/json', function(err, data) {
    if (err) return console.error(err)
    console.log('My nice data: ')
    console.log(data)
}) // read a json file and return an object
```

### create()

**create(path, filename[, content], callback)**

Create a new json file. The content could be a object or a json string.

*Sync: createSync()*

```js
var json = require('json-extra')

// created a new json file
json.create('/any/path/you/want', 'filename.json', '{json: "string or object"}', function(err) {
    if (err) return console.error(err)
    console.log('Created!');
})
```

## Future Methods

**find** Finds specific values or keys
