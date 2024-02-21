#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTex;
uniform sampler2D terrainMap;
uniform sampler2D terrainAltimetry;

void main() {
    vec4 color = texture2D(terrainTex, vTextureCoord);
    float filter = texture2D(terrainMap, vTextureCoord).r;
    vec4 altimetry = texture2D(terrainAltimetry, vec2(0, -filter));

    gl_FragColor = mix(color, altimetry, 0.3);
    // gl_FragColor = color;
}
