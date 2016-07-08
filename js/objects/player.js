var Sprite = require('../sprite.js');
var Util = require('./util.js');
var objects = require('../boxes/objects.js');

var player = {
  ctx: undefined, // defined in game.js

  pos: {
    x: 400,
    y: 240,
  },

  run: function () {
    // do nothing
  },

  sprite: (new Sprite(32, 32, 0, [
    "player.gif",
  ])),

  getImageAngle: function () {

  },
};

module.exports = player;
