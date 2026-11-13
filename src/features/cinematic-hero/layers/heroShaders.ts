import { atmosphereShader } from '../atmosphere/atmosphereShader'
import { interactiveLighting } from '../lighting/interactiveLighting'
import { projectionFunctions, projectionUniforms } from './heroProjection'

export const vertexShader = /* glsl */ `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`

export const fragmentShader = /* glsl */ `
precision highp float;
uniform sampler2D uBackground;
uniform sampler2D uTree;
uniform sampler2D uForeground;
uniform sampler2D uCanopy;
${projectionUniforms}
uniform vec2 uLight;
uniform vec2 uResolution;
uniform float uAspect;
uniform float uPresence;
varying vec2 vUv;
${projectionFunctions}
${interactiveLighting}
${atmosphereShader}
void main() {
  vec2 uv = imageUV(vUv);
  vec2 farUv = uv + uParallax * uCover * vec2(0.0025, -0.0018);
  vec2 treeUv = treeUV(vUv);
  vec2 nearUv = foregroundUV(vUv);
  vec2 canopyUv = canopyUV(vUv);
  // Sehelai gerak di ujung tajuk; batang dan akar tidak dibuat bergelombang.
  vec3 back = texture2D(uBackground, farUv).rgb;
  vec4 tree = texture2D(uTree, treeUv);
  vec4 front = texture2D(uForeground, nearUv);
  vec3 color = mix(back, tree.rgb, tree.a);
  float dx = luminance(texture2D(uTree, treeUv + vec2(0.001, 0.0)).rgb)
           - luminance(texture2D(uTree, treeUv - vec2(0.001, 0.0)).rgb);
  color = lightSurface(color, uv, tree.a, dx);
  color = atmosphere(color, uv);
  color = mix(color, lightSurface(front.rgb, uv, 0.65, 0.0), front.a);
  vec4 canopy = texture2D(uCanopy, canopyUv);
  color = mix(color, lightSurface(canopy.rgb * 0.88, uv, 0.8, 0.0), canopy.a);
  // Respiran cahaya sangat pelan, selaras dengan sumber hangat di kiri atas.
  float sun = exp(-length((uv - vec2(0.14, 0.85)) * vec2(2.0, 2.8)) * 3.0);
  color += color * vec3(1.0, 0.79, 0.45) * sun * (sunPresence() * 0.025);
  color=gateSunlight(color,uv);
  gl_FragColor = vec4(color, 1.0);
}
`
