
const PADDLE_ACCELERATION = 1

const Paddle = () => {
  return {
    x: 0,
    y: 0,
    width: 5,
    height: 130,
    speedX: 0,
    speedY: 0,
    accelerationX: 0,
    accelerationY: 0,
    draw (ctx) {
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }
}

const Ball = () => {
  return {
    x: 0,
    y: 0,
    radius: 8,
    startAngle: 0,
    endAngle: Math.PI * 2,
    speedX: 0,
    speedY: 0,
    accelerationX: 0,
    accelerationY: 0,
    draw (ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
      ctx.stroke()
    }
  }
}

const paddleMovement = (key, paddleTwo) => {
  switch (key) {
    case 'ArrowUp':
      paddleTwo.accelerationY -= PADDLE_ACCELERATION
      // paddleTwo.acceleration
      break

    case 'ArrowDown':
      paddleTwo.accelerationY += PADDLE_ACCELERATION
      break

    case 'ArrowLeft':
      paddleTwo.accelerationX -= PADDLE_ACCELERATION
      break

    case 'ArrowRight':
      paddleTwo.accelerationX += PADDLE_ACCELERATION
      break

    default:
      return
  }
}

export const Game = (canvas) => {
  const ctx = canvas.getContext('2d')
  canvas.width = Math.floor(window.innerWidth * 0.95)
  canvas.height = Math.floor(window.innerHeight * 0.75)

  const paddleOne = Paddle()
  const paddleTwo = Paddle()
  const ball = Ball()

  // Set the start values
  paddleOne.x = 5
  paddleOne.y = 200

  paddleTwo.x = canvas.width - paddleTwo.width - 5
  paddleTwo.y = 200

  ball.x = canvas.width / 2
  ball.y = canvas.height / 2

  document.addEventListener('keydown', (event) => {
    paddleMovement(event.key, paddleTwo)
  })

  return {
    paddleOne,
    paddleTwo,
    drawObjects () {
      paddleOne.draw(ctx)
      paddleTwo.draw(ctx)
      ball.draw(ctx)
    },
    drawStartScreen () {
      this.drawObjects()
      // this.drawStartButtons()
    }
  }
}
