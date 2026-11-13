import { sceneBudget } from '../config/treeSceneConfig';
import { useLayoutEffect, useMemo, useRef, useEffect } from 'react';
import { BufferGeometry, Float32BufferAttribute, Color, Object3D, InstancedMesh } from 'three';
import { createBarkGeometry, createLeafGeometry } from '../model/treeGeometry';
import { seededRandom, type Limb } from '../model/treeSkeleton';
function groundGeometry() {
    const n = 90, p: number[] = [], c: number[] = [], indices: number[] = [];
    for (let z = 0; z <= n; z++)
        for (let x = 0; x <= n; x++) {
            const px = (x / n - 0.5) * 90, pz = (z / n - 0.5) * 90;
            const noise = Math.sin(px * 1.8 + pz * 0.9) * Math.cos(pz * 2.2 - px) * 0.08 + Math.sin(px * 0.2 + pz * 0.3) * 0.12;
            p.push(px, -0.22 + noise, pz);
            const shade = 0.035 + (noise + 0.2) * 0.09;
            c.push(shade * 0.65, shade, shade * 0.65);
            if (x < n && z < n) {
                const i = z * (n + 1) + x;
                indices.push(i, i + n + 1, i + 1, i + 1, i + n + 1, i + n + 2);
            }
        }
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(p, 3));
    g.setAttribute('color', new Float32BufferAttribute(c, 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    return g;
}
export function ForestEnvironment({ limbs }: {
    limbs: Limb[];
}) {
    const ground = useMemo(() => groundGeometry(), []);
    const distantBark = useMemo(() => createBarkGeometry(limbs.filter(l => !l.foliage && l.radius > 0.12), false), [limbs]);
    const leaf = useMemo(() => createLeafGeometry(), []);
    useEffect(() => () => { ground.dispose(); distantBark.dispose(); leaf.dispose(); }, [ground, distantBark, leaf]);
    const trees = useRef<InstancedMesh>(null), floorLeaves = useRef<InstancedMesh>(null);
    useLayoutEffect(() => {
        const dummy = new Object3D(), random = seededRandom(789), color = new Color();
        for (let i = 0; i < sceneBudget.backgroundTrees; i++) {
            const a = i / sceneBudget.backgroundTrees * Math.PI * 2;
            dummy.position.set((i - 5.5) * 5.5, -0.5, -18 - random() * 20);
            dummy.rotation.set(0, a, 0);
            dummy.scale.setScalar(0.65 + random() * 1.3);
            dummy.updateMatrix();
            trees.current?.setMatrixAt(i, dummy.matrix);
        }
        if (trees.current) {
            trees.current.instanceMatrix.needsUpdate = true;
            trees.current.computeBoundingSphere();
        }
        for (let i = 0; i < sceneBudget.groundLeaves; i++) {
            const a = random() * Math.PI * 2, r = Math.sqrt(random()) * 16;
            dummy.position.set(Math.cos(a) * r, -0.1 + random() * 0.08, Math.sin(a) * r);
            dummy.rotation.set(Math.PI / 2 + random() * 0.12, 0, random() * 6.28);
            dummy.scale.setScalar(0.7 + random() * 1.3);
            dummy.updateMatrix();
            floorLeaves.current?.setMatrixAt(i, dummy.matrix);
            color.setHSL(0.12 + random() * 0.16, 0.3, 0.06 + random() * 0.11);
            floorLeaves.current?.setColorAt(i, color);
        }
        if (floorLeaves.current) {
            floorLeaves.current.instanceMatrix.needsUpdate = true;
            if (floorLeaves.current.instanceColor)
                floorLeaves.current.instanceColor.needsUpdate = true;
            floorLeaves.current.computeBoundingSphere();
        }
    }, [distantBark, leaf]);
    return <>
    <fogExp2 attach="fog" args={['#07100e', 0.032]}/>
    <mesh geometry={ground} receiveShadow><meshStandardMaterial vertexColors roughness={1}/></mesh>
    <instancedMesh ref={trees} args={[distantBark, undefined, sceneBudget.backgroundTrees]}><meshStandardMaterial color="#101c18" roughness={1}/></instancedMesh>
    <instancedMesh ref={floorLeaves} args={[leaf, undefined, sceneBudget.groundLeaves]} receiveShadow><meshStandardMaterial roughness={0.95} side={2}/></instancedMesh>
  </>;
}
