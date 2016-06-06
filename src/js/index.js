import {drawStartScreen} from './basic.js'
import {Game} from './basic.js'

const canvasElement = document.getElementById('gameWindow')

window.onload = function () { Game(canvasElement).drawStartScreen() }
