var Bullet = require('./bullet.js');
var objects = require('../boxes/objects.js');
var Player = require('./player.js');
var Sprite = require('../sprite.js');
var Util = require('../util.js');

var enemy = {
  accel: 0.5,
  angle: 0,
  bullet: undefined, // defined in game.js
  cooldown: 30,
  cursor: undefined, // defined in game.js
  lean: "left",
  maxSpeed: 4,
  objects: objects,
  player: undefined, // defined in game.js
  pos: {
    x: 600,
    y: 120,
  },
  runningForwards: true,
  runningBack: false,
  runningRight: false,
  runningLeft: false,
  speed: {
    x: 0,
    y: 0,
  },
  sprite: (new Sprite(28, 28, 0, [
    "enemy.gif",
  ])),

  brake: function () {
    this.speed.x *= this.speed.x !== 0 ? 0.8 : 1;
    this.speed.y *= this.speed.y !== 0 ? 0.8 : 1;
  },

  fire: function () {
    if (!this.cooldown) {
      objects.push(new this.bullet (this.pos, this.cursor));
      this.cooldown = 15;
    }
  },

  fight: function ()  {
    if (Util.distanceBetween(this.pos, this.player.pos) > 200) {
      this.runningForwards = true;
      this.runningLeft = false;
      this.runningRight = false;
      this.runningBack = false;
    } else {
      this.runningForwards = false;
      if (this.lean=='left') {
        this.runningLeft = true;
      } else {
        this.runningRight = true;
      }
      if (!Math.floor(Math.random()*60)) {
        this.lean = this.lean == 'left' ? 'right' : 'left';
      }
      if (!Math.floor(Math.random()*15)) {
        this.fire();
      }
      this.runningBack = true;
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
    this.fight();
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

module.exports = enemy;
