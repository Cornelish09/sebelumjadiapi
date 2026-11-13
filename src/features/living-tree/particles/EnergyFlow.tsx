import { sceneBudget } from '../config/treeSceneConfig';
import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Color, DataTexture, FloatType, NearestFilter, RGBAFormat, ShaderMaterial, Vector3 } from 'three';
import { seededRandom, type Limb } from '../model/treeSkeleton';
import { limbRadius } from '../model/treeGeometry';
const vertexShader = `
uniform sampler2D paths; uniform float rows; uniform float time;
attribute float pathIndex; attribute float phase; attribute float speed; attribute float size;
varying vec3 tint; varying float fade;
void main(){
 float t=fract(phase+time*speed); float s=t*127.0;
 vec3 a=texture2D(paths,vec2((floor(s)+0.5)/128.0,(pathIndex+0.5)/rows)).xyz;
 vec3 b=texture2D(paths,vec2((min(floor(s)+1.0,127.0)+0.5)/128.0,(pathIndex+0.5)/rows)).xyz;
 vec4 p=modelViewMatrix*vec4(mix(a,b,fract(s)),1.0);
 gl_Position=projectionMatrix*p;gl_PointSize=clamp(size*150.0/-p.z,0.7,4.5);
 tint=color;fade=smoothstep(0.0,0.08,t)*smoothstep(1.0,0.92,t);
}`;
const fragmentShader = `varying vec3 tint;varying float fade;
void main(){float d=length(gl_PointCoord-0.5)*2.0;if(d>1.0)discard;gl_FragColor=vec4(tint*2.6,pow(1.0-d,2.0)*fade*0.9);}`;
export function EnergyFlow({ limbs, moving }: {
    limbs: Limb[];
    moving: boolean;
}) {
    const material = useRef<ShaderMaterial>(null);
    const data = useMemo(() => {
        const random = seededRandom(788), count = sceneBudget.energyParticles, lanes = 3, rows = limbs.length * lanes;
        const packed = new Float32Array(rows * 128 * 4), point = new Vector3();
        limbs.forEach((limb, index) => {
            const frames = limb.curve.computeFrenetFrames(127, false);
            for (let lane = 0; lane < lanes; lane++)
                for (let j = 0; j < 128; j++) {
                    const t = j / 127, angle = lane * Math.PI * 2 / lanes + t * 2 + limb.seed;
                    const radius = limbRadius(limb, t, angle) + 0.025;
                    point.copy(limb.curve.getPoint(t)).addScaledVector(frames.normals[j], Math.cos(angle) * radius).addScaledVector(frames.binormals[j], Math.sin(angle) * radius);
                    const offset = ((index * lanes + lane) * 128 + j) * 4;
                    point.toArray(packed, offset);
                    packed[offset + 3] = 1;
                }
        });
        const texture = new DataTexture(packed, 128, rows, RGBAFormat, FloatType);
        texture.minFilter = texture.magFilter = NearestFilter;
        texture.needsUpdate = true;
        const indices = new Float32Array(count), phases = new Float32Array(count), speeds = new Float32Array(count), sizes = new Float32Array(count), colors = new Float32Array(count * 3);
        const color = new Color();
        for (let i = 0; i < count; i++) {
            indices[i] = i % 3 === 0 ? i % 120 : i % rows;
            phases[i] = random();
            speeds[i] = 0.015 + random() * 0.023;
            sizes[i] = 0.24 + random() * 0.22;
            color.set(i % 12 === 0 ? '#d1b681' : i % 4 === 0 ? '#dce1c2' : '#8fc3ac').toArray(colors, i * 3);
        }
        return { texture, rows, indices, phases, speeds, sizes, colors, positions: new Float32Array(count * 3), uniforms: { paths: { value: texture }, rows: { value: rows }, time: { value: 0 } } };
    }, [limbs]);
    useEffect(() => () => data.texture.dispose(), [data]);
    useFrame((_, delta) => { if (moving && material.current)
        material.current.uniforms.time.value += Math.min(delta, 0.05); });
    return <points frustumCulled={false}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[data.positions, 3]}/>
      <bufferAttribute attach="attributes-color" args={[data.colors, 3]}/>
      <bufferAttribute attach="attributes-pathIndex" args={[data.indices, 1]}/>
      <bufferAttribute attach="attributes-phase" args={[data.phases, 1]}/>
      <bufferAttribute attach="attributes-speed" args={[data.speeds, 1]}/>
      <bufferAttribute attach="attributes-size" args={[data.sizes, 1]}/>
    </bufferGeometry>
    <shaderMaterial ref={material} uniforms={data.uniforms} vertexColors transparent depthWrite={false} blending={AdditiveBlending} vertexShader={vertexShader} fragmentShader={fragmentShader}/>
  </points>;
}

