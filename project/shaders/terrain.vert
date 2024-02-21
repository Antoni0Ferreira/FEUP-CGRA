attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform sampler2D terrainMap;
varying vec2 vTextureCoord;
uniform float offset;
uniform float multiplier;

void main() {

    vTextureCoord = aTextureCoord;

    vec4 color = texture2D(terrainMap, aTextureCoord);
    vec3 position = vec3(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z + (color.z - offset) * multiplier);

    gl_Position = uPMatrix * uMVMatrix * (vec4(position, 1.0));

   
}

