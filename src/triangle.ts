import { GameObject } from "./gameObject";
import { Input } from "./input";

export class Triangle extends GameObject {
    speed: number;

    constructor(speed: number) {
        super();
        this.speed = speed;
    }

    update(deltaTime: number, input: Input): void {
        if (input.isKeyPressed('ArrowUp')) this.position[1] += this.speed * deltaTime;
        if (input.isKeyPressed('ArrowDown')) this.position[1] -= this.speed * deltaTime;
        if (input.isKeyPressed('ArrowLeft')) this.position[0] -= this.speed * deltaTime;
        if (input.isKeyPressed('ArrowRight')) this.position[0] += this.speed * deltaTime;
        console.log(this.position[0], this.position[1])
    }

    render(gl: WebGLRenderingContext): void {
        // Create a simple shader program
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        if (!vertexShader) {
            console.error("Failed to create vertex shader");
            return;
        }
        gl.shaderSource(vertexShader, `
            attribute vec3 a_position;
            void main() {
                gl_Position = vec4(a_position, 1.0);
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
    
        // Use the shader program to draw a triangle
        gl.useProgram(shaderProgram);
    
        var buffer = gl.createBuffer();
        let vertices = new Float32Array([
            0, 0, 0,
            0, 0.5, 0,
            0.5, 0.5, 0,

            0.5, 0.5, 0,
            0.5, 0, 0,
            0, 0, 0
        ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}