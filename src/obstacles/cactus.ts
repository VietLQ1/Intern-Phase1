import { GameObject} from "../gameObject";
import { Collider } from "../collider";
import { Matrix4 } from "../math/matrix4";
import { Input } from "../input";
import { Obstacle } from "./obstacle";

export class Cactus extends Obstacle
{
    constructor() {
        super();
        this.speed = 1000;
        this.collider = new Collider(this.position[0], this.position[1], 0.02 * window.innerWidth, 0.1 * window.innerHeight);
    }
    render(gl : WebGLRenderingContext) {
        gl.uniformMatrix4fv(gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'u_position'), false, new Float32Array(Matrix4.translation(this.position).data));
        var buffer = gl.createBuffer();
        let vertices = new Float32Array([
            0, 0, 0,
            0, window.innerHeight * 0.1, 0,
            window.innerWidth * 0.02, window.innerHeight * 0.1, 0,

            window.innerWidth * 0.02, window.innerHeight * 0.1, 0,
            window.innerWidth * 0.02, 0, 0,
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