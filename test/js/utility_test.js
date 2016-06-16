import {assert} from 'chai'
import {Keyboarder} from '../../src/js/utilities.js'

describe.only('Keyboarder', () => {
  let keyboarder

  beforeEach(() => {
    keyboarder = Keyboarder()
  })

  it('keyborder object responds to "w" key', () => {
    const upEvent = new KeyboardEvent('keydown', { key: 'w' })
    document.dispatchEvent(upEvent)
    assert.isTrue(keyboarder.isDown(keyboarder.KEY.W))
  })

  it('keyborder object responds to "s" key', () => {
    const upEvent = new KeyboardEvent('keydown', { key: 's' })
    document.dispatchEvent(upEvent)
    assert.isTrue(keyboarder.isDown(keyboarder.KEY.S))
  })

  it('keyborder object responds to "a" key', () => {
    const upEvent = new KeyboardEvent('keydown', { key: 'a' })
    document.dispatchEvent(upEvent)
    assert.isTrue(keyboarder.isDown(keyboarder.KEY.A))
  })

  it('keyborder object responds to "d" key', () => {
    const upEvent = new KeyboardEvent('keydown', { key: 'd' })
    document.dispatchEvent(upEvent)
    assert.isTrue(keyboarder.isDown(keyboarder.KEY.D))
  })

  it('keyborder object responds to "ArrowUp" key', () => {
    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' })
    document.dispatchEvent(upEvent)
    assert.isTrue(keyboarder.isDown(keyboarder.KEY.UP))
  })

  it('keyborder object responds to "ArrowDown" key', () => {
    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    document.dispatchEvent(upEvent)
    assert.isTrue(keyboarder.isDown(keyboarder.KEY.DOWN))
  })

  it('keyborder object responds to "ArrowLeft" key', () => {
    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
    document.dispatchEvent(upEvent)
    assert.isTrue(keyboarder.isDown(keyboarder.KEY.LEFT))
  })

  it('keyborder object responds to "ArrowRight" key', () => {
    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' })
    document.dispatchEvent(upEvent)
    assert.isTrue(keyboarder.isDown(keyboarder.KEY.RIGHT))
  })
})
