
export const PADDLE_ACCELERATION = 1.3
export const DECELERATION = 0.2
export const MAX_ACCEL = 10
export const SOPORIFIC = 1

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
    decelerate () {
      if (this.speedX > SOPORIFIC) {
        this.speedX -= DECELERATION
      } else if (this.speedX < -SOPORIFIC) {
        this.speedX += DECELERATION
      }
      else {
        this.speedX = 0
      }
      // (this.speedX < SOPORIFIC || this.speedX > -SOPORIFIC)

      if (this.speedY > SOPORIFIC) {
        this.speedY -= DECELERATION
      } else if (this.speedY < -SOPORIFIC) {
        this.speedY += DECELERATION
      } else {
        this.speedY = 0
      }
    },
    update () {
      this.decelerate()
      this.x += this.speedX
      this.y += this.speedY
    },
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
    decelerate () {
      if (this.speedX > 0) {
        this.speedX -= DECELERATION
      }
      if (this.speedX < 0) {
        this.speedX += DECELERATION
      }
      if (this.speedY < 0) {
        this.speedY += DECELERATION
      }
      if (this.speedY > 0) {
        this.speedY -= DECELERATION
      }
    },
    update () {
      this.decelerate()
      this.x += this.speedX
      this.y += this.speedY
    },
    draw (ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
      ctx.fill()
    }
  }
}

const paddleMovement = (key, paddleOne, paddleTwo) => {
  switch (key) {
    case 'w':
      if (paddleOne.speedY > -MAX_ACCEL) {
        paddleOne.speedY -= PADDLE_ACCELERATION
      }
      break

    case 's':
      if (paddleOne.speedY < MAX_ACCEL) {
        paddleOne.speedY += PADDLE_ACCELERATION
      }
      break

    case 'a':
      if (paddleOne.speedX > -MAX_ACCEL) {
        paddleOne.speedX -= PADDLE_ACCELERATION
      }
      break

    case 'd':
      if (paddleOne.speedY < MAX_ACCEL) {
        paddleOne.speedX += PADDLE_ACCELERATION
      }
      break

    case 'ArrowUp':
      if (paddleTwo.speedY > -MAX_ACCEL) {
        paddleTwo.speedY -= PADDLE_ACCELERATION
      }
      break

    case 'ArrowDown':
      if (paddleTwo.speedY < MAX_ACCEL) {
        paddleTwo.speedY += PADDLE_ACCELERATION
      }
      break

    case 'ArrowLeft':
      if (paddleTwo.speedX > -MAX_ACCEL) {
        paddleTwo.speedX -= PADDLE_ACCELERATION
      }
      break

    case 'ArrowRight':
      if (paddleTwo.speedX < MAX_ACCEL) {
        paddleTwo.speedX += PADDLE_ACCELERATION
      }
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
    paddleMovement(event.key, paddleOne, paddleTwo)
  })

  var drawObjects = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    paddleOne.draw(ctx)
    paddleTwo.draw(ctx)
    ball.draw(ctx)
  }

  var update = () => {
    paddleOne.update()
    paddleTwo.update()
    ball.update()
  }

  var tick = function () {
    update()
    drawObjects()
    requestAnimationFrame(tick)
  }

  tick()

  return {
    paddleOne,
    paddleTwo,
    ball,
    drawObjects,
    drawStartScreen () {
      this.drawObjects()
      // this.drawStartButtons()
    }
  }
}
