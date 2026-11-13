import { useMemo, useEffect } from 'react';
import { BufferGeometry, Float32BufferAttribute, DoubleSide, Color } from 'three';
import { seededRandom } from '../model/treeSkeleton';
function createFerns() {
    const positions: number[] = [], colors: number[] = [], random = seededRandom(193), color = new Color();
    const triangle = (a: number[], b: number[], c: number[]) => { positions.push(...a, ...b, ...c); for (let i = 0; i < 3; i++)
        colors.push(color.r, color.g, color.b); };
    for (let plant = 0; plant < 100; plant++) {
        const a = random() * Math.PI * 2, r = 3 + random() * 15, x = Math.cos(a) * r, z = Math.sin(a) * r, scale = 0.5 + random() * 0.8;
        for (let frond = 0; frond < 8; frond++) {
            const angle = frond / 8 * Math.PI * 2 + random() * 0.5, dx = Math.cos(angle), dz = Math.sin(angle);
            color.setHSL(0.24 + random() * 0.06, 0.36, 0.1 + random() * 0.1);
            for (let j = 1; j < 13; j++) {
                const t = j / 13, px = x + dx * t * scale, py = -0.12 + Math.sin(t * Math.PI * 0.85) * scale * 0.65, pz = z + dz * t * scale;
                const length = Math.sin(t * Math.PI) * 0.23 * scale;
                for (const side of [-1, 1]) {
                    const tip = [px - dz * length * side + dx * 0.1 * scale, py + 0.025, pz + dx * length * side + dz * 0.1 * scale];
                    const base = [px, py, pz], edge = [px + dx * 0.065 * scale, py - 0.01, pz + dz * 0.065 * scale];
                    triangle(base, tip, edge);
                }
            }
        }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    return geometry;
}
const beamVertex = `varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const beamFragment = `varying vec2 v;void main(){float edge=pow(max(0.0,1.0-abs(v.x-0.5)*2.0),3.0);float fall=sin(v.y*3.14159);gl_FragColor=vec4(0.48,0.62,0.53,edge*fall*0.065);}`;
export function ForestDetails() {
    const plants = useMemo(() => createFerns(), []);
    const canopy = useMemo(() => {
        const random = seededRandom(819), positions = new Float32Array(15000), colors = new Float32Array(15000), color = new Color();
        for (let i = 0; i < 5000; i++) {
            const cluster = i % 9, angle = random() * Math.PI * 2, radius = Math.sqrt(random()) * 5;
            positions[i * 3] = (cluster - 4) * 6 + Math.cos(angle) * radius;
            positions[i * 3 + 1] = 8 + random() * 6;
            positions[i * 3 + 2] = -17 - Math.floor(cluster / 3) * 8 + Math.sin(angle) * radius;
            color.setHSL(0.27, 0.28, 0.07 + random() * 0.07).toArray(colors, i * 3);
        }
        return { positions, colors };
    }, []);
    useEffect(() => () => plants.dispose(), [plants]);
    return <>
    <mesh geometry={plants} receiveShadow><meshStandardMaterial vertexColors side={DoubleSide} roughness={0.86}/></mesh>
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[canopy.positions, 3]}/><bufferAttribute attach="attributes-color" args={[canopy.colors, 3]}/></bufferGeometry>
      <shaderMaterial vertexColors transparent depthWrite={false} vertexShader={`varying vec3 tint;void main(){vec4 p=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*p;gl_PointSize=100.0/-p.z;tint=mix(color,vec3(0.027,0.063,0.055),clamp(-p.z/90.0,0.0,0.8));}`} fragmentShader={`varying vec3 tint;void main(){float d=length(gl_PointCoord-0.5)*2.0;if(d>1.0)discard;gl_FragColor=vec4(tint,1.0-smoothstep(0.6,1.0,d));}`}/>
    </points>
    {[-8, -3, 4].map((x, i) => <mesh key={x} position={[x, 7, -8 - i * 5]} rotation={[0, 0, -0.38]}>
      <planeGeometry args={[2.5, 18]}/><shaderMaterial vertexShader={beamVertex} fragmentShader={beamFragment} transparent depthWrite={false} side={DoubleSide}/>
    </mesh>)}
  </>;
}
