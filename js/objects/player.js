var Bullet = require('./bullet');
var objects = require('../boxes/objects.js');
var Sprite = require('../sprite.js');
var Util = require('../util.js');

var player = {
  accel: 0.5,
  angle: 0,
  cooldown: 30,
  cursor: undefined, // defined in game.js
  maxSpeed: 4,
  pos: {
    x: 400,
    y: 240,
  },
  objects: objects,
  speed: {
    x: 0,
    y: 0,
  },
  sprite: (new Sprite(32, 32, 0, [
    "player.gif",
  ])),

  brake: function () {
    this.speed.x *= this.speed.x !== 0 ? 0.8 : 1;
    this.speed.y *= this.speed.y !== 0 ? 0.8 : 1;
  },

  fire: function () {
    if (!this.cooldown) {
      objects.push(new Bullet (this.pos, this.cursor));
      this.cooldown = 30;
    }
  },

  goBack: function () {
    this.speed.x += this.accel * Math.cos((this.angle+180) * Math.PI/180);
    this.speed.y += this.accel * Math.sin((this.angle+180) * Math.PI/180);
    if (Math.sqrt(this.speed.x*this.speed.x + this.speed.y*this.speed.y) > this.maxSpeed) {
      this.speed.x *= 0.9;
      this.speed.y *= 0.9;
    }
  },

  goForwards: function () {
    this.speed.x += this.accel * Math.cos(this.angle * Math.PI/180);
    this.speed.y += this.accel * Math.sin(this.angle * Math.PI/180);
    if (Math.sqrt(this.speed.x*this.speed.x + this.speed.y*this.speed.y) > this.maxSpeed) {
      this.speed.x *= 0.9;
      this.speed.y *= 0.9;
    }
  },

  goLeft: function () {
    this.speed.x += this.accel * Math.cos((this.angle-90) * Math.PI/180);
    this.speed.y += this.accel * Math.sin((this.angle-90) * Math.PI/180);
    if (Math.sqrt(this.speed.x*this.speed.x + this.speed.y*this.speed.y) > this.maxSpeed) {
      this.speed.x *= 0.9;
      this.speed.y *= 0.9;
    }
  },

  goRight: function () {
    this.speed.x += this.accel * Math.cos((this.angle+90) * Math.PI/180);
    this.speed.y += this.accel * Math.sin((this.angle+90) * Math.PI/180);
    if (Math.sqrt(this.speed.x*this.speed.x + this.speed.y*this.speed.y) > this.maxSpeed) {
      this.speed.x *= 0.9;
      this.speed.y *= 0.9;
    }
  },

  run: function () {
    this.angle = (Util.getAngle(this.pos, this.cursor.pos) * 180/Math.PI);
    this.sprite.angle = this.angle;
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
    if (this.runningForwards) {
      this.goForwards();
    } else if (this.runningRight) {
      this.goRight();
    } else if (this.runningLeft) {
      this.goLeft();
    } else if (this.runningBack) {
      this.goBack();
    } else {
      this.brake();
    }
    if (this.cooldown > 0) {
      this.cooldown -= 1;
    }
  },

};

module.exports = player;
