var Sprite = require('../sprite.js');
var objects = require('../boxes/objects.js');

var cursor = {
  pos: {
    x: 90,
    y: 90,
  },
  run: function () {
    // do nothing
  },
  sprite: (new Sprite(32, 32, 0, [
    "crosshairs.gif",
  ])),
};

module.exports = cursor;
