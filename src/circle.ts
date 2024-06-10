import { GameObject } from "./gameObject";
import { Input } from "./input";

export class Circle extends GameObject {
    radius: number;
    speed: number;

    constructor(radius: number, speed: number) {
        super();
        this.radius = radius;
        this.speed = speed;
    }

    update(deltaTime: number, input: Input): void {
        if (input.isKeyPressed('ArrowUp')) this.position[1] += this.speed * deltaTime;
        if (input.isKeyPressed('ArrowDown')) this.position[1] -= this.speed * deltaTime;
        if (input.isKeyPressed('ArrowLeft')) this.position[0] -= this.speed * deltaTime;
        if (input.isKeyPressed('ArrowRight')) this.position[0] += this.speed * deltaTime;
    }

    render(gl: WebGLRenderingContext): void {
        // Create a simple shader program
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        if (!vertexShader) {
            console.error("Failed to create vertex shader");
            return;
        }
        gl.shaderSource(vertexShader, `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        if (!fragmentShader) {
            console.error("Failed to create fragment shader");
            return;
        }
        gl.shaderSource(fragmentShader, `
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Red color
            }
        `);
        gl.compileShader(fragmentShader);

        const shaderProgram = gl.createProgram();
        if (!shaderProgram) {
            console.error("Failed to create shader program");
            return;
        }
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        // Use the shader program to draw a circle
        gl.useProgram(shaderProgram);

        // TODO: Create a buffer with the circle's vertices and draw the circle
        // This will typically involve creating a buffer, binding it, filling it with data,
        // enabling the position attribute, and issuing a draw call.
    }
}