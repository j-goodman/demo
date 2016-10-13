var Sprite = require('../sprite.js');
var Util = require('../util.js');
var Player = require('./player.js');
var Enemy = require('./enemy.js');
var objects = require('../boxes/objects.js');

var Bullet = function (pos, cursor) {
  this.age = 0;
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

Bullet.prototype.checkCollision = function () {
  if (Util.distanceBetween(this.pos, Player.pos) < Player.sprite.width/2) {
    console.log("Player hit.");
    Player.pos.x -= 10000;
    Player.pos.y += 10000;
  }
  if (Util.distanceBetween(this.pos, Enemy.pos) < Enemy.sprite.width/2) {
    console.log("Opponent hit.");
    Enemy.pos.x -= 10000;
    Enemy.pos.y += 10000;
  }
};

Bullet.prototype.run = function () {
  this.age += 1;
  this.sprite.angle = this.angle;
  this.pos.x += this.speed.x;
  this.pos.y += this.speed.y;
  if (this.age > 12) {
    this.checkCollision();
  }
};

module.exports = Bullet;
