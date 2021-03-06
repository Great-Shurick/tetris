const canvasTetris = document.getElementById('tetris');
const contextTetris = canvasTetris.getContext('2d');
const canvasNext = document.getElementById('next');
const contextNext = canvasNext.getContext('2d');
var canvasScore = document.getElementById("scoreTable");
var contextScore = canvasScore.getContext("2d");

contextTetris.scale(40, 40);
contextNext.scale(50,50);
clearScoreTable();

const colors = [
  null,
  '#FF0D72',
  '#0DC2FF',
  '#0DFF72',
  '#F538FF',
  '#FF8E0D',
  '#FFE138',
  '#3877FF',
]


function draw(){
  drawShape(arena, {x:0, y:0},"main");
  drawShape(player.shape, player.pos, "main");
  drawShape(player.next, {x:1, y:1}, "next");
}


function gameOverDialog(){
  var name = prompt("Введите свой ник","");
  if (name != null) {
    return(name);
  }
}


function clearCanvas(){
  contextTetris.fillStyle = '#000';
  contextTetris.fillRect(0, 0, canvasTetris.width, canvasTetris.height);

  contextNext.fillStyle = '#000';
  contextNext.fillRect(0, 0, canvasNext.width, canvasNext.height);
}


function updateScoreTable(data){
  console.log(data);
  clearScoreTable();
  counter = 100;
  data.forEach(value =>{
    contextScore.font = "20px Arial";
    contextScore.fillText(value.name.concat(" - ", value.score.toString()), 5, counter);
    counter+=20;
  });
}

function clearScoreTable(){
  contextScore.fillStyle = '#000';
  contextScore.fillRect(0, 0, canvasScore.width, canvasScore.height);
  contextScore.fillStyle = 'white';
  contextScore.font = "50px Arial";
  contextScore.fillText("Score", 50, 50);
}


function drawShape(shape, offset, canvas){
  context = (canvas=="next")?contextNext:contextTetris;
  shape.forEach((row, y) =>{
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x,
                               y + offset.y,
                               1, 1);
      }
    })
  })
}


function createShape(type){
  switch(type){
    case 'T':
      return [[0, 0, 0],
              [1, 1, 1],
              [0, 1, 0],];
    break;
    case 'O':
      return [[2, 2],
              [2, 2],];
    break;
    case 'L':
      return [[0, 3, 0],
              [0, 3, 0],
              [0, 3, 3],];
    break;
    case 'J':
      return [[0, 4, 0],
              [0, 4, 0],
              [4, 4, 0],];
    break;
    case 'I':
      return [[0, 5, 0, 0],
              [0, 5, 0, 0],
              [0, 5, 0, 0],
              [0, 5, 0, 0],];
    break;
    case 'S':
      return [[0, 6, 6],
              [6, 6, 0],
              [0, 0, 0],];
    break;
    case 'Z':
      return [[7, 7, 0],
              [0, 7, 7],
              [0, 0, 0],];
    break;
  }
}
