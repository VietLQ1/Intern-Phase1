import { Renderer } from "./renderer"
import { GameObject } from "./gameObject"
import { Input } from "./input"
// import { Square } from "./square"
import { Circle } from "./circle"
import { Triangle } from "./triangle"
import { Matrix4 } from "./math/matrix4"
import { doc } from "prettier"

let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
class Game {
    renderer: Renderer;
    input: Input;
    gameObjects: GameObject[];
    lastFrameTime: number;
    projection : Matrix4;
    constructor() {
        this.renderer = new Renderer(canvas);
        this.input = new Input();
        this.gameObjects = [];
        this.lastFrameTime = 0;
        this.projection = Matrix4.orthographic(0, canvas.width, 0, canvas.height, -1, 1);
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
        this.renderer.loadShader(this.projection);
        this.renderer.gl.uniformMatrix4fv(this.renderer.gl.getUniformLocation(this.renderer.gl.getParameter(this.renderer.gl.CURRENT_PROGRAM), 'u_projection'), false, new Float32Array(this.projection.data));
        this.gameObjects.forEach(obj => obj.render(this.renderer.gl));
    }
}

let game = new Game();
game.start();
let triangle = new Triangle(500);
game.addGameObject(triangle);
