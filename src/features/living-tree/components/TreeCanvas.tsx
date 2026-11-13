import { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { treeSceneConfig } from '../config/treeSceneConfig';
import { TreeFallback } from './TreeFallback';
import { TreeScene } from './TreeScene';
function ContextLossGuard({ onLost }: {
    onLost: () => void;
}) {
    const canvas = useThree((state) => state.gl.domElement);
    useEffect(() => {
        canvas.addEventListener('webglcontextlost', onLost);
        return () => canvas.removeEventListener('webglcontextlost', onLost);
    }, [canvas, onLost]);
    return null;
}
export default function TreeCanvas({ moving }: {
    moving: boolean;
}) {
    const [contextLost, setContextLost] = useState(false);
    if (contextLost)
        return <TreeFallback />;
    return (<Canvas aria-hidden="true" shadows="percentage" camera={treeSceneConfig.camera} dpr={treeSceneConfig.dpr} frameloop={moving ? 'always' : 'demand'} gl={treeSceneConfig.renderer} fallback={<TreeFallback />}>
      <TreeScene moving={moving}/>
      <ContextLossGuard onLost={() => setContextLost(true)}/>
    </Canvas>);
}
