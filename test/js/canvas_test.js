import {assert} from 'chai'
import {Game} from '../../src/js/basic.js'

describe('Canvas Rendering', () => {
  let newGame, canvas

  beforeEach(() => {
    canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'gameWindow')
    document.body.appendChild(canvas)

    newGame = Game(canvas)
  })

  it('has a canvas', () => {
    canvas = document.getElementById('gameWindow')

    assert.equal(canvas.tagName, 'CANVAS')
  })

  it('has correct width', () => {
    const canvas = document.getElementById('gameWindow')
    const windowWidth = window.innerWidth
    newGame.drawStartScreen()

    assert.equal(canvas.width, Math.floor(windowWidth * 0.95))
  })

  it('has correct height', () => {
    const canvas = document.getElementById('gameWindow')
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
    const canvas = document.getElementById('gameWindow')
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

  // paddleOne movement
  it('moves up with the "w" key', () => {
    const paddleOne = newGame.paddleOne
    const upEvent = new KeyboardEvent('keydown', { key: 'w' })
    const targetAcceleration = paddleOne.accelerationY - 1

    document.dispatchEvent(upEvent)

    assert.equal(paddleOne.accelerationY, targetAcceleration)
  })

  it('moves down with the "s" key', () => {
    const paddleOne = newGame.paddleOne
    const downEvent = new KeyboardEvent('keydown', { key: 's' })
    const targetAcceleration = paddleOne.accelerationY + 1

    document.dispatchEvent(downEvent)

    assert.equal(paddleOne.accelerationY, targetAcceleration)
  })

  it('moves left with the "a" key', () => {
    const paddleOne = newGame.paddleOne
    const leftEvent = new KeyboardEvent('keydown', { key: 'a' })
    const targetAcceleration = paddleOne.accelerationX - 1

    document.dispatchEvent(leftEvent)

    assert.equal(paddleOne.accelerationX, targetAcceleration)
  })

  it('moves right with the "d" key', () => {
    const paddleOne = newGame.paddleOne
    const rightEvent = new KeyboardEvent('keydown', { key: 'd' })
    const targetAcceleration = paddleOne.accelerationX + 1

    document.dispatchEvent(rightEvent)

    assert.equal(paddleOne.accelerationX, targetAcceleration)
  })

  // paddleTwo movement
  it('moves up with the "ArrowUp" key', () => {
    const paddleTwo = newGame.paddleTwo
    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' })
    const targetAcceleration = paddleTwo.accelerationY - 1

    document.dispatchEvent(upEvent)

    assert.equal(paddleTwo.accelerationY, targetAcceleration)
  })

  it('moves down with the "ArrowDown" key', () => {
    const paddleTwo = newGame.paddleTwo
    const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    const targetAcceleration = paddleTwo.accelerationY + 1

    document.dispatchEvent(downEvent)

    assert.equal(paddleTwo.accelerationY, targetAcceleration)
  })

  it('moves left with the "ArrowLeft" key', () => {
    const paddleTwo = newGame.paddleTwo
    const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
    const targetAcceleration = paddleTwo.accelerationX - 1

    document.dispatchEvent(leftEvent)

    assert.equal(paddleTwo.accelerationX, targetAcceleration)
  })

  it('moves right with the "ArrowRight" key', () => {
    const paddleTwo = newGame.paddleTwo
    const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' })
    const targetAcceleration = paddleTwo.accelerationX + 1

    document.dispatchEvent(rightEvent)

    assert.equal(paddleTwo.accelerationX, targetAcceleration)
  })
})
