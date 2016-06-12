import {assert} from 'chai'
import {Game, PADDLE_ACCELERATION, DECELERATION} from '../../src/js/basic.js'

describe('Canvas Rendering', () => {
  let newGame, canvas

  beforeEach(() => {
    canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'gameWindow')
    document.body.appendChild(canvas)

    newGame = Game(canvas)
  })

  afterEach(() => {
    document.body.removeChild(canvas)
  })

  it('has a canvas', () => {
    canvas = document.getElementById('gameWindow')

    assert.equal(canvas.tagName, 'CANVAS')
  })

  it('has correct width', () => {
    const windowWidth = window.innerWidth
    newGame.drawStartScreen()

    assert.equal(canvas.width, Math.floor(windowWidth * 0.95))
  })

  it('has correct height', () => {
    const windowHeight = window.innerHeight
    newGame.drawStartScreen()

    assert.equal(canvas.height, Math.floor(windowHeight * 0.75))
  })

  it('has paddleOne in the correct location', () => {
    const paddleOne = newGame.paddleOne

    newGame.drawStartScreen()

    assert.equal(paddleOne.x, 5)
    assert.equal(paddleOne.y, 200)
  })

  it('has paddleTwo in the correct location', () => {
    const paddleTwo = newGame.paddleTwo

    newGame.drawStartScreen()

    assert.equal(paddleTwo.x, canvas.width - paddleTwo.width - 5)
    assert.equal(paddleTwo.y, 200)
  })
})

describe('Paddle Movement', () => {
  let newGame, canvas

  beforeEach(() => {
    canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'gameWindow')
    document.body.appendChild(canvas)

    newGame = Game(canvas)
  })

  afterEach(() => {
    document.body.removeChild(canvas)
  })

/*
  NOTES:
  1) Here we claim to check MOVEMENT, be we are actually checking
     that the key press affects SPEED. Instead we could check that
     x and y changes according to speed.

  2) We no longer need to have acceleration properties for our objects.
     We can leave acceleration as a constant for the paddles, and tweak
     it accordingly. And simply let the speed increase and decrease.

  3) This changes our testing below quite a bit. In places we are simulating
     key presses by assigning a high number to the acceleration property. This
     will have to be changed.

     I have already changed the movement in the game.
     (A key press affects speed based on our constant ACCELERATION)
*/

  // paddleOne movement
  // User input
  it('moves up with the "w" key', () => {
    const paddleOne = newGame.paddleOne
    const upEvent = new KeyboardEvent('keydown', { key: 'w' })
    const targetSpeed = paddleOne.speedY - PADDLE_ACCELERATION

    document.dispatchEvent(upEvent)

    assert.equal(paddleOne.speedY, targetSpeed)
  })

  it('moves down with the "s" key', () => {
    const paddleOne = newGame.paddleOne
    const downEvent = new KeyboardEvent('keydown', { key: 's' })
    const targetSpeed = paddleOne.speedY + PADDLE_ACCELERATION

    document.dispatchEvent(downEvent)

    assert.equal(paddleOne.speedY, targetSpeed)
  })

  it('moves left with the "a" key', () => {
    const paddleOne = newGame.paddleOne
    const leftEvent = new KeyboardEvent('keydown', { key: 'a' })
    const targetSpeed = paddleOne.speedX - PADDLE_ACCELERATION

    document.dispatchEvent(leftEvent)

    assert.equal(paddleOne.speedX, targetSpeed)
  })

  it('moves right with the "d" key', () => {
    const paddleOne = newGame.paddleOne
    const rightEvent = new KeyboardEvent('keydown', { key: 'd' })
    const targetSpeed = paddleOne.speedX + PADDLE_ACCELERATION

    document.dispatchEvent(rightEvent)

    assert.equal(paddleOne.speedX, targetSpeed)
  })

  // paddleTwo movement
  it('moves up with the "ArrowUp" key', () => {
    const paddleTwo = newGame.paddleTwo
    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' })
    const targetSpeed = paddleTwo.speedY - PADDLE_ACCELERATION

    document.dispatchEvent(upEvent)

    assert.equal(paddleTwo.speedY, targetSpeed)
  })

  it('moves down with the "ArrowDown" key', () => {
    const paddleTwo = newGame.paddleTwo
    const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    const targetSpeed = paddleTwo.speedY + PADDLE_ACCELERATION

    document.dispatchEvent(downEvent)

    assert.equal(paddleTwo.speedY, targetSpeed)
  })

  it('moves left with the "ArrowLeft" key', () => {
    const paddleTwo = newGame.paddleTwo
    const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
    const targetSpeed = paddleTwo.speedX - PADDLE_ACCELERATION

    document.dispatchEvent(leftEvent)

    assert.equal(paddleTwo.speedX, targetSpeed)
  })

  it('moves right with the "ArrowRight" key', () => {
    const paddleTwo = newGame.paddleTwo
    const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' })
    const targetSpeed = paddleTwo.speedX + PADDLE_ACCELERATION

    document.dispatchEvent(rightEvent)

    assert.equal(paddleTwo.speedX, targetSpeed)
  })

  // Acceleration affects Speed

  // paddle Object speedX
  it('changes speedX based on acceleration', () => {
    const paddleTwo = newGame.paddleTwo
    const targetSpeedX = (PADDLE_ACCELERATION * 20) - DECELERATION

    paddleTwo.accelerationX = PADDLE_ACCELERATION * 20

    paddleTwo.update()

    assert.equal(paddleTwo.speedX, targetSpeedX)
  })

  // paddle Object speedY
  it('changes speedY based on acceleration', () => {
    const paddleTwo = newGame.paddleTwo
    const targetSpeedY = (PADDLE_ACCELERATION * 20) - DECELERATION

    paddleTwo.accelerationY = PADDLE_ACCELERATION * 20
    paddleTwo.update()

    assert.equal(paddleTwo.speedY, targetSpeedY)
  })

  // Speed moves paddle Object
  it('moves according to speed', () => {
    const paddleTwo = newGame.paddleTwo
    const targetX = paddleTwo.x + PADDLE_ACCELERATION
    const targetY = paddleTwo.y + PADDLE_ACCELERATION

    paddleTwo.speedX = PADDLE_ACCELERATION + DECELERATION
    paddleTwo.speedY = PADDLE_ACCELERATION + DECELERATION

    paddleTwo.update()

    assert.equal(paddleTwo.x, targetX)
    assert.equal(paddleTwo.y, targetY)
  })

  // Paddle Object velocity retards over time
  it('retards over time', () => {
    const paddleTwo = newGame.paddleTwo
    const targetSpeedX = (PADDLE_ACCELERATION * 20) - DECELERATION
    const targetSpeedY = (PADDLE_ACCELERATION * 20) - DECELERATION

    paddleTwo.speedX = PADDLE_ACCELERATION * 20
    paddleTwo.speedY = PADDLE_ACCELERATION * 20

    paddleTwo.update()

    assert.equal(paddleTwo.speedX, targetSpeedX)
    assert.equal(paddleTwo.speedY, targetSpeedY)
  })
})

describe('Ball Movement', () => {
  let newGame, canvas

  beforeEach(() => {
    canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'gameWindow')
    document.body.appendChild(canvas)

    newGame = Game(canvas)
  })

  afterEach(() => {
    document.body.removeChild(canvas)
  })

  it('moves according to its speed', () => {
    const ball = newGame.ball
    const targetX = canvas.width / 2 + 3
    const targetY = canvas.height / 2 + 3

    ball.speedX = 3 + DECELERATION
    ball.speedY = 3 + DECELERATION

    ball.update()

    assert.equal(ball.x, targetX)
    assert.equal(ball.y, targetY)
  })

  it('decelerates over time', () => {
    const ball = newGame.ball

    const targetSpeedX = (PADDLE_ACCELERATION * 20) - DECELERATION
    const targetSpeedY = (PADDLE_ACCELERATION * 20) - DECELERATION
    ball.speedX = PADDLE_ACCELERATION * 20
    ball.speedY = PADDLE_ACCELERATION * 20

    ball.update()

    assert.equal(ball.speedX, targetSpeedX)
    assert.equal(ball.speedY, targetSpeedY)
  })
})
