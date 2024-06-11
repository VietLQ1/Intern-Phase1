import { GameObject } from "./gameObject";
import { Input } from "./input";
import { Matrix4 } from "./math/matrix4";

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
        // console.log(this.position[0], this.position[1])
    }

    render(gl: WebGLRenderingContext): void {
        // Create a simple shader program
        console.log(this.position[0], this.position[1])
        gl.uniformMatrix4fv(gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'u_position'), false, new Float32Array(Matrix4.translation(this.position).data));
        var buffer = gl.createBuffer();
        let vertices = new Float32Array([
            0, 0, 0,
            0, window.innerHeight * 0.5, 0,
            window.innerWidth * 0.5, window.innerHeight * 0.5, 0,

            window.innerWidth * 0.5, window.innerHeight * 0.5, 0,
            window.innerWidth * 0.5, 0, 0,
            0, 0, 0
        ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disableVertexAttribArray(0);
    }
}