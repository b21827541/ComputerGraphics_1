"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function() {
    init();
};

function init(){
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl2");
    
    if(!gl) {
        alert("not supported");
        return;
    }
    
    //creating shaders
    const vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex_shader, vShader);
    gl.compileShader(vertex_shader);
    if ( !gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS) ) {
        var info = gl.getShaderInfoLog(vertex_shader);
        alert("error: \n" + info);
        return;
    }
    
    const fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment_shader, fShader);
    gl.compileShader(fragment_shader);
    if ( !gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS) ) {
        var info = gl.getShaderInfoLog(fragment_shader);
        alert("error :  \n" + info);
        return;
    }
    //creating program
    const program = gl.createProgram();
    gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);
    gl.linkProgram(program);
    if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
        var info = gl.getProgramInfoLog(program);
        alert("error : \n" + info);
        return;
    }
    
    var numComponents = 2;  
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0; 
    const offset = 0; 
    
    const vertex_location = gl.getAttribLocation(program, "a_position");
    const color_location = gl.getAttribLocation(program, "a_color");
    
    //buffers
    //buffer for background
    const buffer_square = gl.createBuffer(); 
    squareBuff(buffer_square, mainsquare, gl, square_color);
    
    //buffers for
    // 4 big circles
    const buffer_circle1 = gl.createBuffer();
    circleBuff(buffer_circle1, circle1, gl, circle_color);
    
    const buffer_circle2 = gl.createBuffer();
    circleBuff(buffer_circle2, circle2, gl, circle_color);
    
    const buffer_circle3 = gl.createBuffer();
    circleBuff(buffer_circle3, circle3, gl, circle_color);
    
    const buffer_circle4 = gl.createBuffer();
    circleBuff(buffer_circle4, circle4, gl, circle_color);
    
    //buffer for 
    //middle square
    const buffer_square2 = gl.createBuffer(); 
    squareBuff(buffer_square2, mainsquare2, gl, square_color);
    
    
    //buffers for circles 
    //8 small circles
    const buffer_circle5 = gl.createBuffer();
    circleBuff(buffer_circle5, circle5, gl, circle_color);
    const buffer_circle6 = gl.createBuffer();
    circleBuff(buffer_circle6, circle6, gl, circle_color);
    const buffer_circle7 = gl.createBuffer();
    circleBuff(buffer_circle7, circle7, gl, circle_color);
    const buffer_circle8 = gl.createBuffer();
    circleBuff(buffer_circle8, circle8, gl, circle_color);
    const buffer_circle9 = gl.createBuffer();
    circleBuff(buffer_circle9, circle9, gl, circle_color);
    const buffer_circle10 = gl.createBuffer();
    circleBuff(buffer_circle10, circle10, gl, circle_color);
    const buffer_circle11 = gl.createBuffer();
    circleBuff(buffer_circle11, circle11, gl, circle_color);
    const buffer_circle12 = gl.createBuffer();
    circleBuff(buffer_circle12, circle12, gl, circle_color);
    

    gl.useProgram(program);
    
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //draw background square
    squareDraw(buffer_square, mainsquare, gl, vertex_location, numComponents, type, normalize, stride, offset, color_location)
    
    
    //draw circle1 to circle4 
    //which are big 4 circles
    circleDraw(buffer_circle1, circle1, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
    //draw circle2
    circleDraw(buffer_circle2, circle2, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
    //draw circle3
    circleDraw(buffer_circle3, circle3, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
    //draw circle4
    circleDraw(buffer_circle4, circle4, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);

  
    //draw square2 
    //which is middle square
    squareDraw(buffer_square2, mainsquare2, gl, vertex_location, numComponents, type, normalize, stride, offset, color_location)
    
  
    //draw circle5-12
    // which are tiny circles around the middle square
    circleDraw(buffer_circle5, circle5, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
    //draw circle6
    circleDraw(buffer_circle6, circle6, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
    //draw circle7
    circleDraw(buffer_circle7, circle7, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
    //draw circle8
    circleDraw(buffer_circle8, circle8, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
    //draw circle9
    circleDraw(buffer_circle9, circle9, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
    //draw circle10
    circleDraw(buffer_circle10, circle10, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
    //draw circle11
    circleDraw(buffer_circle11, circle11, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
    //draw circle12
    circleDraw(buffer_circle12, circle12, gl, vertex_location, numComponents, type, normalize, stride, offset,color_location);
}

function circleBuff(buf, circ, gl, circle_color) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circ.concat(circle_color)), gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(circ));
    gl.bufferSubData(gl.ARRAY_BUFFER, circ.length * 4, new Float32Array(circle_color));
}

function squareBuff(buf, sqr, gl, square_color) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buf); 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sqr.concat(square_color)), gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(sqr));
    gl.bufferSubData(gl.ARRAY_BUFFER, sqr.length * 4, new Float32Array(square_color));
}

function circleDraw(buf, circ, gl, vertex_location, numComponents, type, normalize, stride, offset, color_location) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.vertexAttribPointer(vertex_location, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(vertex_location);
    gl.enableVertexAttribArray(color_location);
    gl.vertexAttribPointer(color_location, 3, type, normalize, stride, circ.length * 4);
    gl.drawArrays(gl.TRIANGLE_FAN, offset, 360);
}

function squareDraw(buf, sqr, gl, vertex_location, numComponents, type, normalize, stride, offset, color_location) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.vertexAttribPointer(vertex_location, numComponents, type, normalize, stride, offset); 
    gl.enableVertexAttribArray(vertex_location);
    gl.enableVertexAttribArray(color_location);
    gl.vertexAttribPointer(color_location, 3, type, normalize, stride, sqr.length * 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, 4);
}