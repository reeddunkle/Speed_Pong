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

  // paddleOne movement
  // User input
  it('moves up with the "w" key', () => {
    const paddleOne = newGame.paddleOne
    const upEvent = new KeyboardEvent('keydown', { key: 'w' })
    const targetAcceleration = paddleOne.accelerationY - PADDLE_ACCELERATION

    document.dispatchEvent(upEvent)

    assert.equal(paddleOne.accelerationY, targetAcceleration)
  })

  it('moves down with the "s" key', () => {
    const paddleOne = newGame.paddleOne
    const downEvent = new KeyboardEvent('keydown', { key: 's' })
    const targetAcceleration = paddleOne.accelerationY + PADDLE_ACCELERATION

    document.dispatchEvent(downEvent)

    assert.equal(paddleOne.accelerationY, targetAcceleration)
  })

  it('moves left with the "a" key', () => {
    const paddleOne = newGame.paddleOne
    const leftEvent = new KeyboardEvent('keydown', { key: 'a' })
    const targetAcceleration = paddleOne.accelerationX - PADDLE_ACCELERATION

    document.dispatchEvent(leftEvent)

    assert.equal(paddleOne.accelerationX, targetAcceleration)
  })

  it('moves right with the "d" key', () => {
    const paddleOne = newGame.paddleOne
    const rightEvent = new KeyboardEvent('keydown', { key: 'd' })
    const targetAcceleration = paddleOne.accelerationX + PADDLE_ACCELERATION

    document.dispatchEvent(rightEvent)

    assert.equal(paddleOne.accelerationX, targetAcceleration)
  })

  // paddleTwo movement
  it('moves up with the "ArrowUp" key', () => {
    const paddleTwo = newGame.paddleTwo
    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' })
    const targetAcceleration = paddleTwo.accelerationY - PADDLE_ACCELERATION

    document.dispatchEvent(upEvent)

    assert.equal(paddleTwo.accelerationY, targetAcceleration)
  })

  it('moves down with the "ArrowDown" key', () => {
    const paddleTwo = newGame.paddleTwo
    const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    const targetAcceleration = paddleTwo.accelerationY + PADDLE_ACCELERATION

    document.dispatchEvent(downEvent)

    assert.equal(paddleTwo.accelerationY, targetAcceleration)
  })

  it('moves left with the "ArrowLeft" key', () => {
    const paddleTwo = newGame.paddleTwo
    const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
    const targetAcceleration = paddleTwo.accelerationX - PADDLE_ACCELERATION

    document.dispatchEvent(leftEvent)

    assert.equal(paddleTwo.accelerationX, targetAcceleration)
  })

  it('moves right with the "ArrowRight" key', () => {
    const paddleTwo = newGame.paddleTwo
    const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' })
    const targetAcceleration = paddleTwo.accelerationX + PADDLE_ACCELERATION

    document.dispatchEvent(rightEvent)

    assert.equal(paddleTwo.accelerationX, targetAcceleration)
  })

  // Acceleration affects Speed

  // paddle Object speedX
  it('changes speedX based on acceleration', () => {
    const paddleTwo = newGame.paddleTwo

    const targetSpeedX = 8 - DECELERATION * 2

    paddleTwo.accelerationX = 4
    paddleTwo.update()
    paddleTwo.update()

    assert.equal(paddleTwo.speedX, targetSpeedX)
  })

  // paddle Object speedY
  it('changes speedY based on acceleration', () => {
    const paddleTwo = newGame.paddleTwo
    const targetSpeedY = 8 - DECELERATION * 2

    paddleTwo.accelerationY = 4
    paddleTwo.update()
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
    const targetSpeedX = 6
    const targetSpeedY = 6

    paddleTwo.speedX = 8
    paddleTwo.speedY = 8

    paddleTwo.update()
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

    const targetSpeedX = 3
    const targetSpeedY = 3

    ball.speedX = 5
    ball.speedY = 5

    ball.update()
    ball.update()

    assert.equal(ball.speedX, targetSpeedX)
    assert.equal(ball.speedY, targetSpeedY)
  })
})
