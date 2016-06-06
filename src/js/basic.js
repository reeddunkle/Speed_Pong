
const MakePaddle = () => {
  var x = 0
  var y = 0
  var width = 3
  var height = 100

  return {
    x,
    y,
    width,
    height,
    draw(ctx) {
      ctx.fillRect(x, y, height, width)
    }
  }
}

const MakeBall = () => {
  var x = 0
  var y = 0
  var radius = 3
  var startAngle = 0
  var endAngle = Math.PI * 2

  return {
    x,
    y,
    radius,
    draw(ctx) {
      ctx.beginPath()
      ctx.arc(x, y, radius, startAngle, endAngle)
      ctx.stroke()
      }
  }
}


export const Game = (canvas) => {
  const ctx = canvas.getContext('2d')
  canvas.width = Math.floor(window.innerWidth * 0.95)
  canvas.height = Math.floor(window.innerHeight * 0.75)

  const paddleOne = MakePaddle()
  const paddleTwo = MakePaddle()
  const ball = MakeBall()

  // Set the start values
  paddleOne.x = 5
  paddleOne.y = 5
  paddleOne.width = 3
  paddleOne.height = 100

  paddleTwo.x = canvas.width - paddleTwo.width - 5
  paddleTwo.y = 5

  ball.x = canvas.width / 2
  ball.y = canvas.height / 2


  return {
    paddleOne,
    paddleTwo,
    drawObjects() {
      paddleOne.draw(ctx)
      paddleTwo.draw(ctx)
      ball.draw(ctx)
    },
    drawStartScreen () {
      this.drawObjects(),
      // this.drawStartButtons()
    }
  }
}
