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
