document.addEventListener('keydown', event => {
  switch(event.keyCode){
    case 87:
    case 38:
      playerRotate();
      break;
    case 65:
    case 37:
      playerMove(-1);
      break;
    case 68:
    case 39:
      playerMove(1);
      break;
    case 83:
    case 40:
      playerMove(0);
      break;
    case 32:
      playerFall();
      break;
    case 27:
      init();
      break;
  }
})

function updateScore(score){
  document.getElementById("score").innerText = score;
}
