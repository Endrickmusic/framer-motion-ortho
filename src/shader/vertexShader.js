const vertexShader = `
attribute vec4 vertexPosition;
attribute float aRandom;

uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vPosition;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;

float PI = 3.141592;


void main() {
    
    vec4 mvPosition = modelMatrix * instanceMatrix * vec4( position, 1.0 );

    float offset = aRandom + sin( uTime / 3.5 + 15. * aRandom);
    // offset *= 0.;

    mvPosition.y += offset;

    mvPosition = viewMatrix * mvPosition;

    vViewPosition = - mvPosition.xyz;
    
    // Normal calculation

    vNormal = normalMatrix * mat3(instanceMatrix) * normal ;

    // World position

    vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);

    worldPosition += offset;

    vWorldPosition = worldPosition.xyz;

    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
}

`

export default vertexShader