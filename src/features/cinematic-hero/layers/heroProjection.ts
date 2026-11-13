// Satu definisi untuk sampling gambar DAN proyeksi energi balik ke layar.
export const HERO_OVERSCAN = 1.045
export const projectionUniforms = /* glsl */ `
uniform vec2 uCover; uniform vec2 uOrigin; uniform vec2 uParallax;
uniform float uTime; uniform float uMotion;
`
export const projectionFunctions = /* glsl */ `
vec2 imageUV(vec2 view) { return (view-0.5)*uCover/${HERO_OVERSCAN}+uOrigin; }
float crownSway(float y) { return sin(uTime*0.32+y*10.0)*0.0003*smoothstep(0.60,0.95,y)*uMotion; }
vec2 treeUV(vec2 view) {
 vec2 uv=imageUV(view);
 return uv+uParallax*uCover*vec2(0.0070,-0.0040)+vec2(crownSway(uv.y),0.0);
}
vec2 treeToScreen(vec2 point) {
 vec2 uv=point-uParallax*uCover*vec2(0.0070,-0.0040);
 uv.x-=crownSway(uv.y);
 return (uv-uOrigin)*${HERO_OVERSCAN}/uCover+0.5;
}
vec2 foregroundUV(vec2 view) {
 vec2 uv=imageUV(view);
 return uv+uParallax*uCover*vec2(0.016,-0.009)+vec2(sin(uTime*0.24+uv.x*4.0)*0.00055*uMotion,0.0);
}
vec2 canopyUV(vec2 view) {
 vec2 uv=imageUV(view);
 return uv+uParallax*uCover*vec2(0.022,-0.012)+vec2(sin(uTime*0.30+uv.y*5.0)*0.0012*uMotion,0.0);
}
`
