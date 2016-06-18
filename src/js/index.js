// import {drawStartScreen} from './basic.js'
import {Game} from './basic.js'

const canvasElement = document.getElementById('gameWindow')
const scoreOne = document.getElementById('playerOne')
const scoreTwo = document.getElementById('playerTwo')

const myGame = Game(canvasElement, scoreOne, scoreTwo)

document.onload = function () {
  myGame.drawStartScreen()
}

myGame.drawStartScreen()
