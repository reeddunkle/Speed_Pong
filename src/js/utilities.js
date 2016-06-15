
export const Keyboarder = () => {
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
