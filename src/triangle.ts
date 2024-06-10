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
            attribute vec2 position;
            uniform vec2 u_position;
            void main() {
                gl_Position = vec4(position + u_position, 0.0, 1.0);
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
    
        // Create a buffer with the triangle's vertices
        const vertices = new Float32Array([
            0.0,  0.5,  // Vertex 1
           -0.5, -0.5,  // Vertex 2
            0.5, -0.5   // Vertex 3
        ]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        // Enable the position attribute
        const vertexPositionLocation = gl.getAttribLocation(shaderProgram, 'position');
        gl.enableVertexAttribArray(vertexPositionLocation);
        gl.vertexAttribPointer(vertexPositionLocation, 2, gl.FLOAT, false, 0, 0);
    
        // Set the position uniform
        const positionLocation = gl.getUniformLocation(shaderProgram, 'u_position');
        gl.uniform2fv(positionLocation, this.position);
        //console.log("render triangle");
        // Draw the triangle
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
}