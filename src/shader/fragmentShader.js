const fragmentShader = `

uniform float uTime;
uniform float progress;
uniform sampler2D uMatcap;
uniform vec4 uResolution;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vColor;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;

float PI = 3.1415926;


void main() {
    
    vec3 normal = normalize( vNormal );
    vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

    // Time varying pixel color
    // vec3 col = 0.5 + 0.5*cos(uTime+vUv.xyx + vec3(0,2,4));

    vec4 matcapColor = texture2D( uMatcap, uv );

    // Output to screen
    // gl_FragColor = vec4(col, 1.0);
    gl_FragColor = vec4(vUv, 0.0, 1.0);
    gl_FragColor = vec4(vNormal, 1.0);
    gl_FragColor = vec4(matcapColor);
    // gl_FragColor = vec4(vWorldPosition, 1.0);
	
}

`

export default fragmentShader