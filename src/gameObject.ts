export abstract class GameObject {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];

    constructor() {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }

    abstract update(deltaTime: number): void;
    abstract render(gl: WebGLRenderingContext): void;
}
