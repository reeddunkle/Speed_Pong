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
})
