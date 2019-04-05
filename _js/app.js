player = {
  pos: {x:0, y:0},
  shape: null,
  score: 0,
}
const WIDTH = 12;
const HIGHT = 20;
var arena = [];

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;


function init(w = WIDTH, h = HIGHT){
  arena = [];
  while(h--)
    arena.push(new Array(w).fill(0));
  playerReset();
  updateScore(player.score);
  update();
}


function update(time = 0){
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if(dropCounter > dropInterval){
    playerDrop();
    dropCounter = 0;
  }
  clearCanvas();
  draw();
  requestAnimationFrame(update);
}


function merge(arena, player){
  player.shape.forEach((row, y) =>{
    row.forEach((value,x) => {
      if (value !== 0)
        arena[y + player.pos.y][x + player.pos.x] = value;
    })
  })
}


function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = arena.length -1; y > 0; --y) {
      for (let x = 0; x < arena[y].length; ++x) {
          if (arena[y][x] === 0) {
              continue outer;
          }
      }

      const row = arena.splice(y, 1)[0].fill(0);
      arena.unshift(row);
      ++y;

      player.score += rowCount * 10;
      rowCount *= 2;
  }
}


function collide(arena, player){
  const [m, o] = [player.shape, player.pos];
  for (let y = 0; y < m.length; ++y){
    for (let x = 0; x < m[y].length; ++x){
      if (m[y][x] !== 0 &&
          (arena[y + o.y] &&
          arena[y + o.y][x + o.x]) !== 0){
        return true;
      }
    }
  }
  return false;
}


function playerReset(){
  const pieces = 'ILJOTZS';
  player.shape = createShape(pieces[pieces.length*Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length/2|0) - (player.shape[0].length/2|0);
  if(collide(arena, player)){
    arena.forEach(row => row.fill(0));
    player.score = 0;
  }
}

function playerDrop(){
  player.pos.y++;
  if(collide(arena, player)){
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    updateScore(player.score);
    return 0;
  }
  return 1;
}


function playerMove(side){
  if (side !== 0){
    player.pos.x += side;
    if(collide(arena, player))
      player.pos.x -= side;
  }
  else
    playerDrop();
}


function playerRotate(dir = 1){
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.shape,dir);
  while(collide(arena, player)){
    player.pos.x += offset;
    offset = - (offset + (offset>0?1:-1));
    if(offset>player.shape[0].length){
      rotate(player.shape, -dir);
      player.pos.x = pos;
      return;

    }
  }
}


function playerFall(){
  while(true){
    if(playerDrop()==0){
      return;
    }
  }
}


function rotate(shape, dir){
  for (let y = 0; y < shape.length; ++y){
    for (let x = 0; x < y; ++x){
      [
        shape[x][y],
        shape[y][x],
      ] = [
        shape[y][x],
        shape[x][y],
      ];
    }
  }
  if (dir>0){
    shape.forEach((row) => row.reverse());
  }else{
    shape.reverse();
  }
}




init()
