/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	console.log("Use the mouse with the arrow keys / WASD to move, and the spacebar to fire.");
	var Bullet = __webpack_require__(1);
	
	Window.newGame = function () {
	  var Player = __webpack_require__(4);
	  var Enemy = __webpack_require__(6);
	  var Cursor = __webpack_require__(7);
	  var EnemyCursor = __webpack_require__(8);
	  var View = __webpack_require__(9);
	  var controller = __webpack_require__(10);
	  var mouseEvents = __webpack_require__(10);
	  // every object has a .run() function, a .sprite, and a .pos
	
	  var Util = __webpack_require__(3);
	
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
	
	    this.objects = __webpack_require__(5);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite = __webpack_require__(2);
	var Util = __webpack_require__(3);
	var Player = __webpack_require__(4);
	var Enemy = __webpack_require__(6);
	var objects = __webpack_require__(5);
	
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
	  }
	  if (Util.distanceBetween(this.pos, Enemy.pos) < Enemy.sprite.width/2) {
	    console.log("Opponent hit.");
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Sprite = function (width, height, rate, sourcePathArray) {
	  this.frames = [];
	  this.width = width;
	  this.height = height;
	  this.rate = 0;
	  this.rateMax = rate;
	  this.angle = 0;
	  sourcePathArray.forEach(function (path, index) {
	    this.frames[index] = new Image (width, height);
	    this.frames[index].src = "./sprites/"+path;
	  }.bind(this));
	  this.endCallback = null;
	};
	
	Sprite.prototype.frame = 0;
	
	Sprite.prototype.addAnimationEndCallback = function (callback) {
	  this.endCallback = function () {
	    callback();
	    this.endCallback = null;
	  }.bind(this);
	};
	
	Sprite.prototype.animate = function () {
	  if (this.frames.length > 1) {
	    if (this.rate === 0) {
	        this.frame++;
	        if (this.frame === this.frames.length) {
	          this.frame = 0;
	          if (this.endCallback) {
	            this.endCallback();
	          }
	        }
	    }
	    this.rate -= 1;
	    if (this.rate < 0) {
	      this.rate = this.rateMax;
	    }
	  }
	};
	
	Sprite.prototype.draw = function (ctx, pos, viewAnchor) {
	  if (ctx) {
	      ctx.save();
	      ctx.translate(pos.x, pos.y);
	      ctx.rotate((this.angle+90)*Math.PI/180);
	      ctx.translate(-this.width/2, -this.height/2);
	      ctx.drawImage(
	        this.frames[this.frame],
	        0-viewAnchor.x,
	        0-viewAnchor.y,
	        this.width,
	        this.height
	      );
	      ctx.restore();
	    if (this.rate) {
	      this.animate();
	    }
	  }
	};
	
	module.exports = Sprite;


/***/ },
/* 3 */
/***/ function(module, exports) {

	util = {
	  getAngle: function (posA, posB) {
	    return Math.atan2(posB.y - posA.y, posB.x - posA.x);
	  },
	
	  distanceBetween: function (firstPos, secondPos) {
	    xGap = Math.abs(firstPos.x - secondPos.x);
	    yGap = Math.abs(firstPos.y - secondPos.y);
	    return(Math.sqrt(xGap*xGap+yGap*yGap));
	  },
	};
	
	module.exports = util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Bullet = __webpack_require__(1);
	var objects = __webpack_require__(5);
	var Sprite = __webpack_require__(2);
	var Util = __webpack_require__(3);
	
	var player = {
	  accel: 0.5,
	  angle: 0,
	  bullet: undefined, // defined in game.js
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
	      objects.push(new this.bullet (this.pos, this.cursor));
	      this.cooldown = 15;
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	var objects = [];
	
	module.exports = objects;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Bullet = __webpack_require__(1);
	var objects = __webpack_require__(5);
	var Player = __webpack_require__(4);
	var Sprite = __webpack_require__(2);
	var Util = __webpack_require__(3);
	
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite = __webpack_require__(2);
	var objects = __webpack_require__(5);
	
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite = __webpack_require__(2);
	var objects = __webpack_require__(5);
	var Player = __webpack_require__(4);
	
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


/***/ },
/* 9 */
/***/ function(module, exports) {

	var View = function (topLeftX, topLeftY, bottomRightX, bottomRightY, maxX, maxY) {
	  this.topLeftPos = {x: topLeftX, y: topLeftY};
	  this.centerPos = {
	    x: ((topLeftX + bottomRightX)/2),
	    y: ((topLeftY + bottomRightY)/2),
	  };
	  this.width = bottomRightX-topLeftX;
	  this.height = bottomRightY-topLeftY;
	  this.maxX = maxX;
	  this.maxY = maxY;
	};
	
	View.prototype.recenter = function (centerPos) {
	  this.topLeftPos.x = centerPos.x-this.width/2;
	  if (this.topLeftPos.x+this.width > this.maxX) {
	    this.topLeftPos.x = this.maxX-this.width;
	  }
	  if (this.topLeftPos.y+this.height > this.maxY) {
	    this.topLeftPos.y = this.maxY-this.height;
	  }
	  if (this.topLeftPos.x < 0) {
	    this.topLeftPos.x = 0;
	  }
	  if (this.topLeftPos.y < 0) {
	    this.topLeftPos.y = 0;
	  }
	};
	
	module.exports = View;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var controller = function (document, player) {
	  document.onclick = function (e) {
	    console.log("!");
	    player.fire();
	  };
	  document.onkeydown = function (e) {
	    switch(e.keyCode) {
	    case 68: // d
	    case 39: //right
	      player.runningRight = true;
	      break;
	    case 65: // a
	    case 37: //left
	      player.runningLeft = true;
	      break;
	    case 87: // w
	    case 38: //up
	      player.runningForwards = true;
	      break;
	    case 83: // s
	    case 40: //down
	      player.runningBack = true;
	      break;
	    case 32: //space
	      player.fire();
	      break;
	    }
	  };
	  document.onkeyup = function (e) {
	    switch(e.keyCode) {
	      case 87: // w
	      case 38: //up
	        player.runningForwards = false;
	        break;
	      case 68: // d
	      case 39: //right
	        player.runningRight = false;
	        break;
	      case 65: // a
	      case 37: //left
	        player.runningLeft = false;
	        break;
	      case 83: // s
	      case 40: //down
	        player.runningBack = false;
	        break;
	    }
	  };
	};
	
	module.exports = controller;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map