const canvas = document.getElementById('tetris');
const context= canvas.getContext('2d');

context.scale(40, 40);


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
  drawShape(arena, {x:0, y:0});
  drawShape(player.shape, player.pos)
}


function clearCanvas(){
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
}


function drawShape(shape, offset){
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
