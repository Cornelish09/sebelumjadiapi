import { sceneBudget } from '../config/treeSceneConfig';
import { useMemo, useLayoutEffect, useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { Color, DoubleSide, InstancedMesh, Object3D, TextureLoader, RepeatWrapping, SRGBColorSpace } from 'three';
import { createBarkGeometry, createLeafGeometry } from './treeGeometry';
import { seededRandom, type Limb } from './treeSkeleton';
import { createBarkNormal } from './treeMaterials';
export function TreeModel({ limbs }: {
    limbs: Limb[];
}) {
    const bark = useMemo(() => createBarkGeometry(limbs), [limbs]);
    const leaf = useMemo(() => createLeafGeometry(), []);
    const source = useLoader(TextureLoader, '/assets/textures/bark/ancient-bark.webp');
    const maps = useMemo(() => {
        const color = source.clone();
        color.wrapS = color.wrapT = RepeatWrapping;
        color.colorSpace = SRGBColorSpace;
        color.anisotropy = 8;
        color.needsUpdate = true;
        return { color, normal: createBarkNormal(source.image) };
    }, [source]);
    useEffect(() => () => { maps.color.dispose(); maps.normal.dispose(); }, [maps]);
    useEffect(() => () => { bark.dispose(); leaf.dispose(); }, [bark, leaf]);
    const leaves = useRef<InstancedMesh>(null);
    const perTwig = sceneBudget.leavesPerTwig, count = limbs.filter(l => l.foliage).length * perTwig;
    useLayoutEffect(() => {
        const mesh = leaves.current;
        if (!mesh)
            return;
        const random = seededRandom(124), dummy = new Object3D(), color = new Color();
        let index = 0;
        for (const limb of limbs.filter(l => l.foliage))
            for (let i = 0; i < perTwig; i++) {
                const t = 0.18 + random() * 0.82, angle = i * 2.399, spread = 0.12 + random() * 0.35;
                dummy.position.copy(limb.curve.getPoint(t));
                dummy.position.x += Math.cos(angle) * spread;
                dummy.position.y += (random() - 0.5) * 0.3;
                dummy.position.z += Math.sin(angle) * spread;
                dummy.rotation.set(0.5 + random() * 1.8, angle, random() * 1.6 - 0.8);
                dummy.scale.setScalar(0.65 + random() * 0.6);
                dummy.updateMatrix();
                mesh.setMatrixAt(index, dummy.matrix);
                color.setHSL(0.23 + random() * 0.07, 0.3 + random() * 0.24, 0.14 + random() * 0.18);
                mesh.setColorAt(index++, color);
            }
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor)
            mesh.instanceColor.needsUpdate = true;
        mesh.computeBoundingSphere();
    }, [limbs, leaf, count, perTwig]);
    return <>
    <mesh geometry={bark} castShadow receiveShadow>
      <meshStandardMaterial map={maps.color} normalMap={maps.normal} normalScale={[1.3, 1.3]} vertexColors roughness={0.93}/>
    </mesh>
    <instancedMesh ref={leaves} args={[leaf, undefined, count]} receiveShadow>
      <meshStandardMaterial side={DoubleSide} roughness={0.82} metalness={0} onBeforeCompile={shader => {
            shader.vertexShader = 'varying vec2 leafUv;\n' + shader.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\nleafUv=uv;');
            shader.fragmentShader = 'varying vec2 leafUv;\n' + shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
          float midrib=1.0-smoothstep(0.005,0.025,abs(leafUv.x-0.5));
          float veins=pow(max(0.0,cos((leafUv.y-abs(leafUv.x-0.5)*0.6)*95.0)),18.0)*0.12;
          float edge=smoothstep(0.0,0.25,leafUv.x)*smoothstep(1.0,0.75,leafUv.x);
          diffuseColor.rgb*=0.7+edge*0.4+veins+midrib*0.25;
        `);
        }}/>
    </instancedMesh>
  </>;
}

