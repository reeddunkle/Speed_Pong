
export const draw = () => {
  var canvas = document.getElementById('gameWindow')
  var context = canvas.getContext('2d')

  context.fillStyle = 'green'
  context.fillRect(150, 150, 100, 100)
  console.log(canvas)
  console.log(context)
  console.log('hello')
}
