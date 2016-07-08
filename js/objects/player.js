var Sprite = require('../sprite.js');
var Util = require('../util.js');
var objects = require('../boxes/objects.js');

var player = {
  cursor: undefined, // defined in game.js

  pos: {
    x: 400,
    y: 240,
  },

  run: function () {
    this.sprite.angle = (this.util.getAngle(objects[0].pos, objects[1].pos) * 180/Math.PI);
    // this.sprite.angle = 30;
  },

  sprite: (new Sprite(32, 32, 0, [
    "player.gif",
  ])),

  util: Util,

  getImageAngle: function () {

  },
};

module.exports = player;
