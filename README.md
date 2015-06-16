# ticktack [![Build Status](https://travis-ci.org/hanamura/ticktack.svg?branch=master)](https://travis-ci.org/hanamura/ticktack)

Simple EventEmitter wrapper of requestAnimationFrame/setTimeout.

## Installation

```sh
npm install ticktack
```

## Example

```javascript
var Tick = require('ticktack');
var tick = new Tick();

tick.on('tick', function(tick, date) {
  console.log('tick: ' + date);
});
```

## License

MIT
