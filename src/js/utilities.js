
export const Keyboarder = () => {
  var keyState = {}

  document.addEventListener('keydown', (e) => {
    keyState[e.key] = true
  })

  document.addEventListener('keyup', (e) => {
    keyState[e.key] = false
  })

  return {
    keyState,
    isDown (key) {
      return this.keyState[key] === true
    },
    KEY: { W: 'w', A: 'a', S: 's', D: 'd',
                UP: 'ArrowUp', LEFT: 'ArrowLeft', RIGHT: 'ArrowRight', DOWN: 'ArrowDown' }
  }
}
