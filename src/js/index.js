// import {drawStartScreen} from './basic.js'
import {Game} from './basic.js'

const canvasElement = document.getElementById('gameWindow')

document.onload = function () { Game(canvasElement).drawStartScreen() }
Game(canvasElement).drawStartScreen()
