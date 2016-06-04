
function makePaddle (x = 0, y = 0, width = 3, height = 100) {
  return {
    x: x,
    y: y,
    width: width,
    height: height
  }
}

var playerOnePaddle = makePaddle()
var playerTwoPaddle = makePaddle()

export const drawStartScreen = () => {
  var canvas = document.getElementById('gameWindow')
  var ctx = canvas.getContext('2d')
  var canvasWidth = canvas.width
  // var canvasHeight = canvas.height

  playerOnePaddle.x = 5
  playerOnePaddle.y = 5
  playerOnePaddle.width = 3
  playerOnePaddle.height = 100

  playerTwoPaddle.x = canvasWidth - playerTwoPaddle.width - 5
  playerTwoPaddle.y = 5

  let {x : x1, y : y1, width : width1, height : height1} = playerOnePaddle
  ctx.fillRect(x1, y1, width1, height1)

  let {x : x2, y : y2, width : width2, height : height2} = playerTwoPaddle
  ctx.fillRect(x2, y2, width2, height2)


}
