util = {
  getAngle: function (posA, posB) {
    return Math.abs(Math.atan2(posB.y - posA.y, posB.x - posA.x));
  },
};

module.exports = util;
