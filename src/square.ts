// import { GameObject } from './gameObject';
// import { Input } from './input';
// class Square extends GameObject {
//     vertices: Float32Array;
//     vertexBuffer: WebGLBuffer;

//     constructor(gl: WebGLRenderingContext) {
//         super();
//         this.vertices = new Float32Array([
//             0.5,  0.5,
//            -0.5,  0.5,
//             0.5, -0.5,
//            -0.5, -0.5,
//         ]);
//         this.vertexBuffer = gl.createBuffer() as WebGLBuffer;
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
//         gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

//         this.position = [0.0, 0.0, 0.0];
//     }

//     update(deltaTime: number, input: Input) {
//         const speed = 0.5;
//         if (input.isKeyPressed('ArrowUp')) this.position[1] += speed * deltaTime;
//         if (input.isKeyPressed('ArrowDown')) this.position[1] -= speed * deltaTime;
//         if (input.isKeyPressed('ArrowLeft')) this.position[0] -= speed * deltaTime;
//         if (input.isKeyPressed('ArrowRight')) this.position[0] += speed * deltaTime;
//     }

//     render(gl: WebGLRenderingContext) {
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
//         const positionLocation = gl.getAttribLocation(programInfo.program, 'aVertexPosition');
//         gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
//         gl.enableVertexAttribArray(positionLocation);

//         gl.useProgram(programInfo.program);

//         const translationLocation = gl.getUniformLocation(programInfo.program, 'uTranslation');
//         gl.uniform2fv(translationLocation, this.position);

//         gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
//     }
// }

// export { Square };