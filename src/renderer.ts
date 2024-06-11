import { Matrix4 } from "./math/matrix4";
export class Renderer {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext("webgl") as WebGLRenderingContext;

        if (!this.gl) {
            console.error("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    clear() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    loadShader(projection : Matrix4): void {
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        if (!vertexShader) {
            console.error("Failed to create vertex shader");
            return;
        }
        this.gl.shaderSource(vertexShader, `
            attribute vec3 a_position;
            uniform mat4 u_projection;
            void main() {
                gl_Position = u_projection * vec4(a_position, 1.0);
            }
        `);
        this.gl.compileShader(vertexShader);
    
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        if (!fragmentShader) {
            console.error("Failed to create fragment shader");
            return;
        }
        this.gl.shaderSource(fragmentShader, `
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Red color
            }
        `);
        this.gl.compileShader(fragmentShader);
    
        const shaderProgram = this.gl.createProgram();
        if (!shaderProgram) {
            console.error("Failed to create shader program");
            return;
        }
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);
    
        // Use the shader program to draw a triangle
        this.gl.useProgram(shaderProgram);
    }

}
