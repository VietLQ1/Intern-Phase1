import { Renderer } from "./renderer"
import { GameObject } from "./gameObject"
import { doc } from "prettier"

class Game {
    constructor() {
        console.log('Game created')
    }
}

new Game()
let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
new Renderer(canvas)
