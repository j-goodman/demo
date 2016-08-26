var controller = function (document, player) {
  document.onmousedown = function (e) {
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
