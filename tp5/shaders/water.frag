#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterTex;
uniform sampler2D waterMap;
uniform float timeFactor;

void main() {
    vec2 animation = vec2(timeFactor * 0.01, timeFactor * 0.01);
	vec4 color = texture2D(waterTex, vTextureCoord + animation);
    vec4 filter = texture2D(waterMap, vTextureCoord + animation);
	
	gl_FragColor = vec4(color.r + filter.r * 0.1, color.g + filter.g * 0.1, color.b + filter.b *0.1, 1.0);
}