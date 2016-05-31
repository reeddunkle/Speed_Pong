import {add} from './basic.js'
import {assert} from 'chai'

describe('Basic tset', () => {
  it('adds', () => {
    assert.equal(add(1, 2), 3)
  })
})
