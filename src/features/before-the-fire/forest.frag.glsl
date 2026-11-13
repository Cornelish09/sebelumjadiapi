#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uFrom,uTo,uHealthy,uTreeAlive,uTreeAsh,uAnimalFrom,uAnimalTo,uAnimalHealthy;
uniform vec2 uViewport,uPointer,uDrift;
uniform vec4 uTreeRect,uAnimalFromRect,uAnimalToRect,uAnimalHealthyRect;
uniform float uBlend,uProgress,uDamage,uAnimalBlend,uFire,uReveal,uCompare,uTime;
vec2 cover(vec2 uv){
 float aspect=uViewport.x/uViewport.y;
 vec2 size=aspect>1.77778?vec2(1.,1.77778/aspect):vec2(aspect/1.77778,1.);
 return (uv-.5)*size+.5;
}
vec4 objectLayer(sampler2D tex,vec2 uv,vec4 rect){
 vec2 p=(uv-rect.xy-uDrift*.014)/rect.zw;
 if(p.x<0.||p.y<0.||p.x>1.||p.y>1.)return vec4(0.);
 return texture2D(tex,p);
}
vec3 over(vec3 under,vec4 layer){return mix(under,layer.rgb,layer.a);}
void main(){
 vec2 uv=vUv;
 vec2 bg=clamp(cover((uv-.5)/1.035+.5-uDrift*.003),.002,.998);
 float wave=.035*sin(vUv.y*9.+uProgress*3.)+.018*sin(vUv.x*13.-vUv.y*5.);
 float morph=1.-smoothstep(uBlend*1.35-.16,uBlend*1.35+.16,(1.-vUv.x)+wave);
 morph=mix(morph,uBlend,.38);
 if(uBlend<.001)morph=0.;if(uBlend>.999)morph=1.;
 vec3 scene=mix(texture2D(uFrom,bg).rgb,texture2D(uTo,bg).rgb,morph);
 vec3 healthy=texture2D(uHealthy,bg).rgb;
 vec4 treeA=objectLayer(uTreeAlive,uv,uTreeRect),treeB=objectLayer(uTreeAsh,uv,uTreeRect);
 vec4 tree=mix(treeA,treeB,uDamage);
 tree.rgb+=uFire*vec3(.09,.025,.003)*(.85+.15*sin(uTime*1.7));
 scene=over(scene,tree);healthy=over(healthy,treeA);
 vec4 animalA=objectLayer(uAnimalFrom,uv,uAnimalFromRect),animalB=objectLayer(uAnimalTo,uv,uAnimalToRect);
 vec4 animalHealthy=objectLayer(uAnimalHealthy,uv,uAnimalHealthyRect);
 // Alpha premultiplied menghindari pinggir hitam saat dua pose di-dissolve.
 vec4 animal=mix(vec4(animalA.rgb*animalA.a,animalA.a),vec4(animalB.rgb*animalB.a,animalB.a),uAnimalBlend);
 vec3 tint=mix(vec3(.89,.94,.86),vec3(.86,.88,.87),uDamage)+uFire*vec3(.055,.014,.0);
 scene=scene*(1.-animal.a)+animal.rgb*tint;
 healthy=over(healthy,vec4(animalHealthy.rgb*vec3(.89,.94,.86),animalHealthy.a));
 vec2 distanceUv=(uv-uPointer)*vec2(uViewport.x/uViewport.y,1.);
 float memory=(1.-smoothstep(.16,.43,length(distanceUv)))*uReveal*smoothstep(.12,.4,uProgress)*.95;
 scene=mix(scene,healthy,mix(memory,1.,uCompare));
 float mist=(sin(uv.y*5.+uTime*.035)+1.)*.007*(1.-uDamage);
 gl_FragColor=vec4(scene+vec3(.7,.78,.73)*mist,1.);
}
