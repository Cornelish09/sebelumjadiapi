#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uForegroundAlive,uForegroundAsh,uCanopy;
uniform vec2 uViewport,uPointer,uDrift;
uniform float uDamage,uLife,uReveal,uProgress,uCompare;
vec2 cover(vec2 uv){float aspect=uViewport.x/uViewport.y;vec2 size=aspect>1.77778?vec2(1.,1.77778/aspect):vec2(aspect/1.77778,1.);return (uv-.5)*size+.5;}
vec4 composite(vec4 under,vec4 top){return vec4(top.rgb*top.a+under.rgb*under.a*(1.-top.a),top.a+under.a*(1.-top.a));}
void main(){
 vec2 near=clamp(cover((vUv-.5)/1.06+.5-uDrift*.014),.002,.998);
 vec4 fgA=texture2D(uForegroundAlive,near),fgB=texture2D(uForegroundAsh,near);
 vec4 canopy=texture2D(uCanopy,clamp(cover(vUv-uDrift*.009),.002,.998));
 vec4 current=composite(mix(fgA,fgB,uDamage),vec4(canopy.rgb,canopy.a*uLife*.65));
 vec4 healthy=composite(fgA,vec4(canopy.rgb,canopy.a*.65));
 vec2 d=(vUv-uPointer)*vec2(uViewport.x/uViewport.y,1.);
 float memory=(1.-smoothstep(.16,.43,length(d)))*uReveal*smoothstep(.12,.4,uProgress)*.95;
 // Pass foreground memakai alpha premultiplied agar daun/abu menutupi kaki secara alami.
 gl_FragColor=mix(current,healthy,mix(memory,1.,uCompare));
}
