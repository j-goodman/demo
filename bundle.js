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

	console.log("Now it begins.");
	
	Window.newGame = function () {
	  var Player = __webpack_require__(6);
	  var Cursor = __webpack_require__(8);
	  var View = __webpack_require__(7);
	  var controller = __webpack_require__(5);
	  var mouseEvents = __webpack_require__(5);
	  // every object has a .run() function, a .sprite, and a .pos
	
	  var Util = __webpack_require__(9);
	
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
	    // controller(document, Player);
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
	
	    this.objects = __webpack_require__(3);
	
	    document.onmousemove = function (e) {
	      cursorX = e.pageX;
	      cursorY = e.pageY;
	      Cursor.pos.x = cursorX-50;
	      Cursor.pos.y = cursorY-56;
	    }.bind(this);
	
	    Player.cursor = Cursor;
	
	    this.objects.push(Player);
	    this.objects.push(Cursor);
	
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
/* 1 */,
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
	    if (this.angle) {
	      ctx.save();
	      ctx.translate(780/2, -480/2);
	      ctx.rotate(this.angle*Math.PI/180);
	      ctx.drawImage(
	        this.frames[this.frame],
	        pos.x-viewAnchor.x,
	        pos.y-viewAnchor.y,
	        this.width,
	        this.height
	      );
	      ctx.restore();
	    } else {
	      ctx.drawImage(
	        this.frames[this.frame],
	        pos.x-viewAnchor.x,
	        pos.y-viewAnchor.y,
	        this.width,
	        this.height
	      );
	    }
	    if (this.rate) {
	      this.animate();
	    }
	  }
	};
	
	module.exports = Sprite;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var objects = [];
	
	module.exports = objects;


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	var controller = function (document, player) {
	  document.onkeydown = function (e) {
	    switch(e.keyCode) {
	    case 68: // d
	    case 39: //right
	      // player.goRight();
	      break;
	    case 65: // a
	    case 37: //left
	      // player.goLeft();
	      break;
	    case 87: // w
	    case 38: //up
	      // player.goForwards();
	      break;
	    case 83: // w
	    case 40: //up
	      // player.goBack();
	      break;
	    }
	  };
	};
	
	module.exports = controller;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite = __webpack_require__(2);
	var Util = __webpack_require__(9);
	var objects = __webpack_require__(3);
	
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


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite = __webpack_require__(2);
	var objects = __webpack_require__(3);
	
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
/* 9 */
/***/ function(module, exports) {

	util = {
	  getAngle: function (posA, posB) {
	    return Math.abs(Math.atan2(posB.y - posA.y, posB.x - posA.x));
	  },
	};
	
	module.exports = util;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map