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
