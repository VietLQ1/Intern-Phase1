import { Renderer } from "./renderer"
import { GameObject } from "./gameObject"
import { Input } from "./input"
// import { Square } from "./square"
import { Circle } from "./circle"
import { doc } from "prettier"

let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
class Game {
    renderer: Renderer;
    input: Input;
    gameObjects: GameObject[];
    lastFrameTime: number;
    constructor() {
        this.renderer = new Renderer(canvas);
        this.input = new Input();
        this.gameObjects = [];
        this.lastFrameTime = 0;
        console.log('Game created')
    }
    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    start() {
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(currentTime: number) {
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    update(deltaTime: number) {
        this.gameObjects.forEach(obj => obj.update(deltaTime, this.input));
    }

    render() {
        this.renderer.clear();
        this.gameObjects.forEach(obj => obj.render(this.renderer.gl));
    }
}

let game = new Game();
game.start();
let circle = new Circle(0.1, 0.5);
game.addGameObject(circle);
