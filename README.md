# DummyImage

Generate Dummy Image.

## Installation

NOTES: DummyImage uses [Cairo](http://cairographics.org/) with [node-canvas](https://github.com/Automattic/node-canvas). Unless previously installed you'll need *Cairo*.

```bash
$ npm install dummyimage
```

## Usage

```javascript
var DummyImage = require('dummyimage');

var dummyimage = new DummyImage({
  dest: './images/',
  format: 'png',
  name: 'dummyimage',
  text: 'Dummy Dummy!'
});

dummyimage.create(function() {
  console.log('Done.');
});
```

## CLI

```bash
$ node ./node_modules/.bin/dummyimage images/dummyimage.png
```

## License

[MIT](http://hail2u.mit-license.org/2014)
