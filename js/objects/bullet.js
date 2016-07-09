var Sprite = require('../sprite.js');
var Util = require('../util.js');
var objects = require('../boxes/objects.js');

var Bullet = function (pos, cursor) {
  this.pos = {
    x: pos.x,
    y: pos.y,
  };
  this.angle = (Util.getAngle(this.pos, cursor.pos) * 180/Math.PI);
  this.sprite = (new Sprite(6, 6, 0, [
    "bullet.gif",
  ]));
  this.power = 9;
  this.speed = {
    x: this.power * Math.cos(this.angle * Math.PI/180),
    y: this.power * Math.sin(this.angle * Math.PI/180),
  };
};

Bullet.prototype.run = function () {
  this.sprite.angle = this.angle;
  this.pos.x += this.speed.x;
  this.pos.y += this.speed.y;
};

module.exports = Bullet;
