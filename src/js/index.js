// import {drawStartScreen} from './basic.js'
import {Game} from './basic.js'

const canvasElement = document.getElementById('gameWindow')

const myGame = Game(canvasElement)

document.onload = function () {
  myGame.drawStartScreen()
}

myGame.drawStartScreen()
