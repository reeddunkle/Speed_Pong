/*
NOTES:
-

*/

export const PADDLE_ACCELERATION = 1.3
export const DECELERATION = 0.2
export const PERCENT_DECEL = 0.99
export const MAX_ACCEL = 10
export const SOPORIFIC = 1
export const SPEED_ABSORB = 0.75

const Paddle = () => {
  return {
    x: 0,
    y: 0,
    width: 7,
    height: 130,
    speedX: 0,
    speedY: 0,
    decelerate () {
      if (this.speedX > SOPORIFIC) {
        this.speedX -= DECELERATION
      } else if (this.speedX < -SOPORIFIC) {
        this.speedX += DECELERATION
      } else {
        this.speedX = 0
      }

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
    update () {
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

const Keyboarder = () => {
  var keyState = {}
  window.onkeydown = (e) => {
    keyState[e.keyCode] = true
  }
  window.onkeyup = (e) => {
    keyState[e.keyCode] = false
  }

  return {
    keyState,
    isDown (keyCode) {
      return this.keyState[keyCode] === true
    },
    KEY: { W: 87, A: 65, S: 83, D: 68,
                UP: 38, LEFT: 37, RIGHT: 39, DOWN: 40 }
  }
}

const checkKeys = (keyboarder, paddleOne, paddleTwo) => {
  if (keyboarder.isDown(keyboarder.KEY.W)) {
    if (paddleOne.speedY > -MAX_ACCEL) {
      paddleOne.speedY -= PADDLE_ACCELERATION
    }
  } else if (keyboarder.isDown(keyboarder.KEY.S)) {
    if (paddleOne.speedY < MAX_ACCEL) {
      paddleOne.speedY += PADDLE_ACCELERATION
    }
  }

  if (keyboarder.isDown(keyboarder.KEY.A)) {
    if (paddleOne.speedX > -MAX_ACCEL) {
      paddleOne.speedX -= PADDLE_ACCELERATION
    }
  } else if (keyboarder.isDown(keyboarder.KEY.D)) {
    if (paddleOne.speedX < MAX_ACCEL) {
      paddleOne.speedX += PADDLE_ACCELERATION
    }
  }

  if (keyboarder.isDown(keyboarder.KEY.UP)) {
    if (paddleTwo.speedY > -MAX_ACCEL) {
      paddleTwo.speedY -= PADDLE_ACCELERATION
    }
  } else if (keyboarder.isDown(keyboarder.KEY.DOWN)) {
    if (paddleTwo.speedY < MAX_ACCEL) {
      paddleTwo.speedY += PADDLE_ACCELERATION
    }
  }

  if (keyboarder.isDown(keyboarder.KEY.LEFT)) {
    if (paddleTwo.speedX > -MAX_ACCEL) {
      paddleTwo.speedX -= PADDLE_ACCELERATION
    }
  } else if (keyboarder.isDown(keyboarder.KEY.RIGHT)) {
    if (paddleTwo.speedX < MAX_ACCEL) {
      paddleTwo.speedX += PADDLE_ACCELERATION
    }
  }
}

const checkCollision = (canvas, ball, paddleOne, paddleTwo) => {
  // Canvas borders
  if (paddleOne.x <= 0) {
    paddleOne.x = 1
    paddleOne.speedX = (-paddleOne.speedX) * SPEED_ABSORB
  } else if (paddleOne.x + paddleOne.width >= canvas.width * 0.45) {
    paddleOne.x = (canvas.width * 0.45) - paddleOne.width
    paddleOne.speedX = (-paddleOne.speedX) * SPEED_ABSORB
  }

  if (paddleOne.y <= 0) {
    paddleOne.y = 1
    paddleOne.speedY = (-paddleOne.speedY) * SPEED_ABSORB
  } else if (paddleOne.y + paddleOne.height >= canvas.height) {
    paddleOne.y = canvas.height - paddleOne.height
    paddleOne.speedY = (-paddleOne.speedY) * SPEED_ABSORB
  }

  if (paddleTwo.x + paddleTwo.width >= canvas.width) {
    paddleTwo.x = canvas.width - 1 - paddleTwo.width
    paddleTwo.speedX = (-paddleTwo.speedX) * SPEED_ABSORB
  } else if (paddleTwo.x <= canvas.width - (canvas.width * 0.75)) {
    paddleTwo.x = canvas.width - (canvas.width * 0.75)
    paddleTwo.speedX = (-paddleTwo.speedX) * SPEED_ABSORB
  }

  if (paddleTwo.y <= 0) {
    paddleTwo.y = 1
    paddleTwo.speedY = (-paddleTwo.speedY) * SPEED_ABSORB
  } else if (paddleTwo.y + paddleTwo.height >= canvas.height) {
    paddleTwo.y = canvas.height - paddleTwo.height
    paddleTwo.speedY = (-paddleTwo.speedY) * SPEED_ABSORB
  }

  if (ball.y <= 0) {
    ball.y = 1
    ball.speedY = (-ball.speedY) * SPEED_ABSORB
  } else if (ball.y + ball.radius*2 >= canvas.height) {
    ball.y = canvas.height - ball.radius*2
    ball.speedY = (-ball.speedY) * SPEED_ABSORB
  }

  // Ball collision
  if (ball.x <= paddleOne.x + paddleOne.width + 1 &&
      ball.x >= paddleOne.x - 1 &&
      ball.y + ball.radius*2 >= paddleOne.y - 1 &&
      ball.y <= paddleOne.y + paddleOne.height + 1){

    ball.x = paddleOne.x + paddleOne.width
    paddleOne.x = ball.x - paddleOne.width

    ball.speedX = paddleOne.speedX * 1.01
    paddleOne.speedX = paddleOne.speedX * SPEED_ABSORB
  }

  if (ball.x + ball.radius*2 >= paddleTwo.x - 1 &&
      ball.x + ball.radius*2 <= paddleTwo.x + paddleTwo.width + 1 &&
      ball.y + ball.radius*2 >= paddleTwo.y - 1 &&
      ball.y <= paddleTwo.y + paddleTwo.height + 1){

    ball.x = paddleTwo.x - ball.radius*2
    paddleTwo.x = ball.x + ball.radius*2

    ball.speedX = paddleTwo.speedX * 1.01
    paddleTwo.speedX = paddleTwo.speedX * SPEED_ABSORB
  }
}

export const Game = (canvas) => {
  const ctx = canvas.getContext('2d')
  canvas.width = Math.floor(window.innerWidth * 0.95)
  canvas.height = Math.floor(window.innerHeight * 0.75)

  const paddleOne = Paddle()
  const paddleTwo = Paddle()
  const ball = Ball()
  const keyboarder = Keyboarder()
  console.log(keyboarder)

  // Set the start values
  paddleOne.x = 5
  paddleOne.y = 200

  paddleTwo.x = canvas.width - paddleTwo.width - 5
  paddleTwo.y = 200

  ball.x = canvas.width / 2
  ball.y = canvas.height / 2

  var drawObjects = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    paddleOne.draw(ctx)
    paddleTwo.draw(ctx)
    ball.draw(ctx)
  }

  var update = () => {
    checkCollision(canvas, ball, paddleOne, paddleTwo)
    checkKeys(keyboarder, paddleOne, paddleTwo)

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
