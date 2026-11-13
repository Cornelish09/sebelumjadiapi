import { projectionFunctions, projectionUniforms } from '../layers/heroProjection'

export const energyVertex = /* glsl */ `
precision highp float;
attribute vec4 seed; attribute vec4 detail;
uniform sampler2D uPaths;
uniform vec2 uResolution;
uniform float uDpr; uniform float uTrails;
uniform float uRouteTimes[32]; uniform float uRouteResponse[32];
${projectionUniforms}
${projectionFunctions}
varying vec2 surface; varying vec2 screenPoint;
varying float opacity; varying float tint; varying float diameter;
vec2 pointAt(float row,float t) {
 float s=clamp(t,0.0,1.0)*127.0;
 vec4 a=texture2D(uPaths,vec2((floor(s)+0.5)/128.0,(row+0.5)/32.0));
 vec4 b=texture2D(uPaths,vec2((min(127.0,floor(s)+1.0)+0.5)/128.0,(row+0.5)/32.0));
 vec2 p=vec2(dot(a.rg,vec2(65280.0,255.0)),dot(a.ba,vec2(65280.0,255.0)))/65535.0;
 vec2 q=vec2(dot(b.rg,vec2(65280.0,255.0)),dot(b.ba,vec2(65280.0,255.0)))/65535.0;
 return mix(p,q,fract(s));
}
void main() {
 if(detail.w>=uTrails) {gl_Position=vec4(3.0,3.0,0.0,1.0);gl_PointSize=1.0;return;}
 int route=int(seed.x);
 float clock=uRouteTimes[route];
 float t=fract(seed.y+clock*seed.z-detail.w*0.0016);
 vec2 p=pointAt(seed.x,t);
 vec2 tangent=normalize(pointAt(seed.x,min(1.0,t+0.008))-pointAt(seed.x,max(0.0,t-0.008))+vec2(0.000001));
 p+=vec2(-tangent.y,tangent.x)*detail.x*detail.y;
 surface=p; screenPoint=treeToScreen(p);
 gl_Position=vec4(screenPoint*2.0-1.0,0.0,1.0);
 diameter=(seed.w*1.05+1.3)*(detail.w>0.5?0.78:1.0);
 gl_PointSize=diameter*uDpr;
 float ends=smoothstep(0.0,0.025,t)*smoothstep(1.0,0.975,t);
 float pulse=0.62+0.38*pow(sin(t*13.0-clock*.65+seed.x*.15)*.5+.5,4.0);
 float echo=pow(sin(t*9.0-clock*1.15)*.5+.5,10.0)*uRouteResponse[route];
 opacity=ends*pulse*(1.0+uRouteResponse[route]*.45+echo*.55)*pow(.26,detail.w);
 tint=detail.z;
}
`

export const energyFragment = /* glsl */ `
precision highp float;
uniform sampler2D uTree; uniform sampler2D uForeground; uniform sampler2D uCanopy;
uniform vec2 uResolution; uniform vec2 uLight;
uniform float uPresence; uniform float uGlow;
${projectionUniforms}
${projectionFunctions}
varying vec2 surface; varying vec2 screenPoint;
varying float opacity; varying float tint; varying float diameter;
void main() {
 vec2 offset=vec2(gl_PointCoord.x-.5,.5-gl_PointCoord.y)*diameter/uResolution;
 vec2 screen=screenPoint+offset;
 vec4 bark=texture2D(uTree,treeUV(screen));
 float mask=smoothstep(.72,.97,bark.a);
 mask*=1.0-texture2D(uForeground,foregroundUV(screen)).a;
 mask*=1.0-texture2D(uCanopy,canopyUV(screen)).a;
 if(mask<.01) discard;
 float d=length(gl_PointCoord-.5)*2.0;
 float core=exp(-d*d*5.8);
 float halo=exp(-d*d*1.8)*.11*uGlow;
 vec3 cyan=vec3(.17,.72,.78), emerald=vec3(.15,.70,.46), warm=vec3(.80,.83,.58);
 vec3 color=tint<.52?mix(emerald,cyan,tint/.52):mix(cyan,warm,(tint-.52)/.48);
 vec2 distance=(screen-uLight)*vec2(uResolution.x/uResolution.y,1.0);
 float local=exp(-dot(distance,distance)*85.0)*uPresence;
 float alpha=(core+halo)*opacity*mask*(.35+local*.16);
 gl_FragColor=vec4(color,alpha);
}
`
