import { GameObject } from "./gameObject";
import { Input } from "./input";
import { Matrix4 } from "./math/matrix4";
import { Collider } from "./collider";

export class Triangle extends GameObject {
    speed: number;
    width: number;
    height: number;

    constructor(speed: number , width: number, height: number) {
        super();
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.collider = new Collider(this.position[0], this.position[1], this.width * window.innerWidth, this.height* window.innerHeight);
    }

    update(deltaTime: number, input: Input): void {
        if (input.isKeyPressed('ArrowUp')) this.position[1] += this.speed * deltaTime;
        if (input.isKeyPressed('ArrowDown')) this.position[1] -= this.speed * deltaTime;
        if (input.isKeyPressed('ArrowLeft')) this.position[0] -= this.speed * deltaTime;
        if (input.isKeyPressed('ArrowRight')) this.position[0] += this.speed * deltaTime;
        // console.log(this.position[0], this.position[1])
        this.collider.x = this.position[0];
        this.collider.y = this.position[1];
    }

    render(gl: WebGLRenderingContext): void {
        // Create a simple shader program
        //console.log(this.position[0], this.position[1])
        gl.uniformMatrix4fv(gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'u_position'), false, new Float32Array(Matrix4.translation(this.position).data));
        var buffer = gl.createBuffer();
        let vertices = new Float32Array([
            0, 0, 0,
            0, window.innerHeight * this.height, 0,
            window.innerWidth * this.width, window.innerHeight * this.height, 0,

            window.innerWidth * this.width, window.innerHeight * this.height, 0,
            window.innerWidth * this.width, 0, 0,
            0, 0, 0
        ]);
        let textureUV = new Float32Array([
            0, 0,
            0, 1,
            1, 1,
            1, 1,
            1, 0,
            0, 0
            ]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disableVertexAttribArray(0);

        // //gl.enableVertexAttribArray(1);
        // var boxTexture = gl.createTexture();
        // gl.bindTexture(gl.TEXTURE_2D, boxTexture);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        // const image = new Image();
        // image.onload = () => {
        //     gl.bindTexture(gl.TEXTURE_2D, boxTexture);
        //     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        // }
        // image.src = 'assets/images/rexSprite.png';
        // gl.activeTexture(gl.TEXTURE0);
        // gl.bindTexture(gl.TEXTURE_2D, null);
        //gl.enableVertexAttribArray(1);
        
        

    }
}