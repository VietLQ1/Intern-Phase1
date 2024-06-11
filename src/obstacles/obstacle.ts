import { GameObject } from "../gameObject";
import { Collider } from "../collider";
import { Matrix4 } from "../math/matrix4";
import { Input } from "../input";
export abstract class Obstacle extends GameObject {
    speed: number;
    width: number;
    height: number;
    constructor() {
        super();
        this.position[0] = window.innerWidth;
    }
    update(deltaTime : number, input : Input) {
        this.position[0] -= 0.1 * deltaTime * this.speed;
        this.collider.x = this.position[0];
        this.collider.y = this.position[1];
    }
    render(gl : WebGLRenderingContext) {
    }
}