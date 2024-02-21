attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform sampler2D waterMap;

varying vec2 vTextureCoord;

void main() {

    vTextureCoord = aTextureCoord;

	vec2 animation = vec2(timeFactor * 0.01, timeFactor * 0.01);
    vec3 offsetNormal = aVertexNormal * texture2D(waterMap, vTextureCoord + animation).b;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offsetNormal * 0.03, 1.0);
}

