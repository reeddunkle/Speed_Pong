/*
NOTES:
- HTML/CSS for score boxes needs to be made good

TODO:
- Add buttons, instructions, max score, and new game options
*/

import {Keyboarder} from './utilities.js'

export const PADDLE_ACCELERATION = 1.3
export const DECELERATION = 0.2
export const PERCENT_DECEL = 0.99
export const MAX_ACCEL = 7
export const SOPORIFIC = 1
export const SPEED_ABSORB = 0.75

const Paddle = () => {
  return {
    scored: false,
    x: 0,
    y: 0,
    width: 10,
    height: 200,

    // x tracks the left, and y tracks the top already,
    // but the right and bottom are frequently needed
    // calculations:
    right () { return this.x + this.width },
    bottom () { return this.y + this.height },

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
    top () { return this.y - this.radius },
    bottom () { return this.y + this.radius },
    left () { return this.x - this.radius },
    right () { return this.x + this.radius },
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

export const checkKeys = (keyboarder, paddleOne, paddleTwo) => {
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

// Correct math in collision detection to account for movement
// of both ball AND paddle
// Check where ball x even is compared to radius
const handleCollision = (canvas, ball, paddleOne, paddleTwo) => {
  /* Handle collision of game objects. */

  // Object Collision with Borders

  // -------- paddleOne --------
  if (paddleOne.x <= 0) {
    paddleOne.x = 1
    paddleOne.speedX = (-paddleOne.speedX) * SPEED_ABSORB
  } else if (paddleOne.right() >= canvas.width * 0.5) {
    paddleOne.x = (canvas.width * 0.5) - paddleOne.width
    paddleOne.speedX = (-paddleOne.speedX) * SPEED_ABSORB
  }

  if (paddleOne.y <= 0) {
    paddleOne.y = 1
    paddleOne.speedY = (-paddleOne.speedY) * SPEED_ABSORB
  } else if (paddleOne.bottom() >= canvas.height) {
    paddleOne.y = canvas.height - paddleOne.height
    paddleOne.speedY = (-paddleOne.speedY) * SPEED_ABSORB
  }

  // -------- paddleTwo --------
  if (paddleTwo.right() >= canvas.width) {
    paddleTwo.x = canvas.width - 1 - paddleTwo.width
    paddleTwo.speedX = (-paddleTwo.speedX) * SPEED_ABSORB
  } else if (paddleTwo.x <= canvas.width - (canvas.width * 0.5)) {
    paddleTwo.x = canvas.width - (canvas.width * 0.5)
    paddleTwo.speedX = (-paddleTwo.speedX) * SPEED_ABSORB
  }

  if (paddleTwo.y <= 0) {
    paddleTwo.y = 1
    paddleTwo.speedY = (-paddleTwo.speedY) * SPEED_ABSORB
  } else if (paddleTwo.bottom() >= canvas.height) {
    paddleTwo.y = canvas.height - paddleTwo.height
    paddleTwo.speedY = (-paddleTwo.speedY) * SPEED_ABSORB
  }

  // -------- ball --------

  // ball top and bottom
  if (ball.top() <= 0) {
    ball.y = ball.radius
    ball.speedY = (-ball.speedY) * SPEED_ABSORB
  } else if (ball.bottom() >= canvas.height) {
    ball.y = canvas.height - ball.radius
    ball.speedY = (-ball.speedY) * SPEED_ABSORB
  }

  // ball scores
  if (ball.right() < 0) {
    paddleTwo.scored = true
  } else if (ball.left() > canvas.width) {
    paddleOne.scored = true
  }

  // Paddle and Ball Collision

  // -------- paddleOne --------

  if ((ball.bottom() >= paddleOne.y && ball.top() <= paddleOne.bottom()) &&
      ((ball.left() <= paddleOne.right() && ball.right() >= paddleOne.x) ||
      // To account for object location in the next frame (+/- speed)
      (ball.left() - Math.abs(ball.speedX) <= paddleOne.right() + Math.abs(paddleOne.speedX) &&
       ball.right() - Math.abs(ball.speedX) >= paddleOne.x + Math.abs(paddleOne.speedX)))) {
    ball.speedX = (paddleOne.speedX * 0.85) + (Math.abs(ball.speedX) * 0.25)

    if (ball.speedY > 0 && paddleOne.speedY > 0) {
      ball.speedY = Math.max(ball.speedY, paddleOne.speedY)
    } else if (ball.speedY < 0 && paddleOne.speedY < 0) {
      ball.speedY = Math.min(ball.speedY, paddleOne.speedY)
    } else if (ball.speedY > 0 && paddleOne.speedY < 0) {
      ball.speedY = -(Math.abs(ball.speedY + paddleOne.speedY))
    } else if (ball.speedY < 0 && paddleOne.speedY > 0) {
      ball.speedY = Math.abs(paddleOne.speedY + ball.speedY)
    }
    paddleOne.speedX = -(Math.abs(ball.speedX * 0.55))
  }

  // -------- paddleTwo --------
  if ((ball.bottom() >= paddleTwo.y && ball.top() <= paddleTwo.bottom()) &&
      ((ball.right() >= paddleTwo.x && ball.left() <= paddleOne.right()) ||
      // To account for object location in the next frame (+/- speed)
      (ball.right() + Math.abs(ball.speedX) >= paddleTwo.x - Math.abs(paddleTwo.speedX) &&
       ball.left() + Math.abs(ball.speedX) <= paddleTwo.right() - Math.abs(paddleTwo.speedX)))) {
    ball.speedX = (paddleTwo.speedX * 0.85) - (Math.abs(ball.speedX) * 0.25)

    if (ball.speedY > 0 && paddleTwo.speedY > 0) {
      ball.speedY = Math.max(ball.speedY, paddleTwo.speedY)
    } else if (ball.speedY < 0 && paddleTwo.speedY < 0) {
      ball.speedY = Math.min(ball.speedY, paddleTwo.speedY)
    } else if (ball.speedY > 0 && paddleTwo.speedY < 0) {
      ball.speedY = -(Math.abs(ball.speedY + paddleTwo.speedY))
    } else if (ball.speedY < 0 && paddleTwo.speedY > 0) {
      ball.speedY = Math.abs(paddleTwo.speedY + ball.speedY)
    }
    paddleTwo.speedX = Math.abs(ball.speedX * 0.35)
  }
}

export const Game = (canvas, scoreOneDiv, scoreTwoDiv) => {
  const ctx = canvas.getContext('2d')
  canvas.width = Math.floor(window.innerWidth * 0.95)
  canvas.height = Math.floor(window.innerHeight * 0.75)

  const paddleOne = Paddle()
  const paddleTwo = Paddle()
  const ball = Ball()
  const keyboarder = Keyboarder()

  var score1 = 0
  var score2 = 0

  var drawScore = () => {
    scoreOneDiv.innerHTML = score1
    scoreTwoDiv.innerHTML = score2
  }

  var drawObjects = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    paddleOne.draw(ctx)
    paddleTwo.draw(ctx)
    ball.draw(ctx)
  }

  var drawStartScreen = () => {
    paddleOne.x = 5
    paddleOne.y = 200

    paddleTwo.x = canvas.width - paddleTwo.width - 5
    paddleTwo.y = 200

    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball.speedX = Math.random() < 0.5 ? -2 : 2
    ball.speedY = Math.random() < 0.5 ? -2 : 2
    drawScore()
    drawObjects()
  }

  var update = () => {
    handleCollision(canvas, ball, paddleOne, paddleTwo)
    checkKeys(keyboarder, paddleOne, paddleTwo)

    paddleOne.update()
    paddleTwo.update()
    ball.update()
  }

  var tick = function () {
    update()
    if (paddleOne.scored) {
      score1 += 1
      paddleOne.scored = false
      drawStartScreen()
      drawScore()
    } else if (paddleTwo.scored) {
      score2 += 1
      paddleTwo.scored = false
      drawStartScreen()
      drawScore()
    } else {
      drawObjects()
    }

    requestAnimationFrame(tick)
  }
  tick()

  return {
    paddleOne,
    paddleTwo,
    ball,
    drawObjects,
    drawStartScreen
  }
}
