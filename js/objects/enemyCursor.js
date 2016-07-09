var Sprite = require('../sprite.js');
var objects = require('../boxes/objects.js');
var Player = require('./player.js');

var enemyCursor = {
  pos: {
    x: 200,
    y: 200,
  },
  speed: {
    x: 0,
    y: 0,
  },
  run: function () {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
    if (this.speed.x > 7) {
      this.speed.x = 6;
    }
    if (this.speed.y > 7) {
      this.speed.y = 6;
    }
    if (this.pos.x >= Player.pos.x + Player.speed.x*30) {
      this.speed.x -= 1;
    } else {
      this.speed.x += 1;
    }
    if (this.pos.y >= Player.pos.y + Player.speed.y*30) {
      this.speed.y -= 1;
    } else {
      this.speed.y += 1;
    }
  },
  sprite: (new Sprite(0, 0, 0, [
  // sprite: (new Sprite(32, 32, 0, [ // <-- for enemy's cursor to be visible
    "crosshairs.gif",
  ])),
};

module.exports = enemyCursor;
