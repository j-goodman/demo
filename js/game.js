console.log("Use the mouse with the arrow keys / WASD to move, and the spacebar to fire.");
var Bullet = require('./objects/bullet.js');

Window.newGame = function () {
  var Player = require('./objects/player.js');
  var Enemy = require('./objects/enemy.js');
  var Cursor = require('./objects/cursor.js');
  var EnemyCursor = require('./objects/enemyCursor.js');
  var View = require('./objects/view.js');
  var controller = require('./controller.js');
  var mouseEvents = require('./controller.js');
  // every object has a .run() function, a .sprite, and a .pos

  var Util = require('./util.js');

  var Game = {};

  Game.startCanvas = function () {
    window.onload = function () {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.ctx = ctx;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }.bind(this);
  };

  Game.connectController = function () {
    controller(document, Player);
  };

  Game.setView = function () {
    var view = new View (0, 0, 780, 480, 780, 480);
    this.view = view;
  };

  Game.play = function () {
    Game.startCanvas();
    Game.connectController();
    Game.setView();

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.objects = require('./boxes/objects.js');

    document.onmousemove = function (e) {
      cursorX = e.pageX;
      cursorY = e.pageY;
      Cursor.pos.x = cursorX-50;
      Cursor.pos.y = cursorY-56;
    }.bind(this);

    Player.cursor = Cursor;
    Enemy.cursor = EnemyCursor;
    Enemy.player = Player;
    Player.bullet = Bullet;
    Enemy.bullet = Bullet;

    this.objects.push(Player);
    this.objects.push(Enemy);
    this.objects.push(Cursor);
    this.objects.push(EnemyCursor);

    this.interval = setInterval(function () {
      var ctx = this.ctx;
      if (ctx) {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      this.objects.forEach( function (object) {
        object.run();
        object.sprite.draw(ctx, object.pos, {x: 0, y: 0,});
      } );

      this.view.recenter(Player.pos);

    }.bind(this), 30);
  };

  return Game;
};

var game = Window.newGame();
game.play();
