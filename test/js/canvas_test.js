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
    const canvas = document.getElementById('gameWindow')
    const paddleOne = newGame.paddleOne

    newGame.drawStartScreen()

    assert.equal(paddleOne.x, 5)
    assert.equal(paddleOne.y, 5)
  })

  it('has paddleTwo in the correct location', () => {
    const canvas = document.getElementById('gameWindow')
    const paddleTwo = newGame.paddleTwo

    newGame.drawStartScreen()

    assert.equal(paddleTwo.x, canvas.width - paddleTwo.width - 5)
    assert.equal(paddleTwo.y, 5)
  })
})
