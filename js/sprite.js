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
