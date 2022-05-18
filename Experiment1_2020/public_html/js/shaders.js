/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const vShader = `#version 300 es
    in vec4 a_position;
    in vec4 a_color;
    out vec4 color;
    void main() {
        gl_Position = a_position;
        color = a_color;
    }
`;

const fShader = `#version 300 es
    precision mediump float;
    in vec4 color;
    out vec4 o_color;
    void main() {
        o_color = color;
    }
`;


