import { sceneBudget } from '../config/treeSceneConfig';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { createTreeSkeleton } from '../model/treeSkeleton';
import { TreeModel } from '../model/TreeModel';
import { EnergyFlow } from '../particles/EnergyFlow';
import { CameraRig } from '../camera/CameraRig';
import { TreeLighting } from './TreeLighting';
import { ForestEnvironment } from './ForestEnvironment';
import { ForestDetails } from './ForestDetails';
export function TreeScene({ moving }: {
    moving: boolean;
}) {
    const limbs = useMemo(() => createTreeSkeleton(), []);
    const group = useRef<Group>(null);
    const time = useRef(0);
    const performance = useRef({ seconds: 0, frames: 0, low: false, frameTimes: new Float32Array(240) });
    useFrame(({ setDpr, gl, camera }, delta) => {
        if (!moving)
            return;
        time.current += Math.min(delta, 0.05);
        if (group.current)
            group.current.rotation.z = Math.sin(time.current * 0.35) * 0.003;
        const sample = performance.current;
        sample.seconds += delta;
        sample.frameTimes[sample.frames % 240] = delta * 1000;
        sample.frames++;
        if (sample.seconds > 3) {
            const times = sample.frameTimes.slice(0, Math.min(sample.frames, 240)).sort();
            // Pengukuran lokal saja, tanpa telemetry atau tampilan teknis di UI publik.
            if (import.meta.env.DEV)
                gl.domElement.dataset.sceneMetrics = JSON.stringify({
                    fps: Math.round(sample.frames / sample.seconds), p95Ms: Math.round(times[Math.floor(times.length * 0.95)] * 10) / 10, dpr: gl.getPixelRatio(), calls: gl.info.render.calls,
                    triangles: gl.info.render.triangles, geometries: gl.info.memory.geometries,
                    textures: gl.info.memory.textures, camera: camera.position.toArray(),
                });
            if (sample.frames / sample.seconds < sceneBudget.declineFps && !sample.low) {
                setDpr(sceneBudget.minDpr);
                sample.low = true;
            }
            sample.seconds = 0;
            sample.frames = 0;
        }
    });
    return <>
    <TreeLighting />
    <CameraRig moving={moving}/>
    <group ref={group}>
      <TreeModel limbs={limbs}/>
      <EnergyFlow limbs={limbs} moving={moving}/>
    </group>
    <ForestEnvironment limbs={limbs}/>
    <ForestDetails />
  </>;
}

