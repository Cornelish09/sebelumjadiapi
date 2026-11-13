import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
export function TreeLighting() {
    const get = useThree(state => state.get);
    useEffect(() => {
        const { gl, invalidate } = get();
        // Bayangan struktur statis dihitung sekali; sway sangat kecil tidak perlu shadow pass setiap frame.
        gl.shadowMap.autoUpdate = false;
        gl.shadowMap.needsUpdate = true;
        invalidate();
        return () => { gl.shadowMap.autoUpdate = true; };
    }, [get]);
    return <>
    <hemisphereLight args={['#91b6b1', '#172318', 1.1]}/>
    <directionalLight position={[-7, 13, 6]} intensity={4.2} color="#eadcc1" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-13} shadow-camera-right={13} shadow-camera-top={15} shadow-camera-bottom={-8} shadow-camera-near={0.1} shadow-camera-far={45} shadow-bias={-0.0003} shadow-normalBias={0.08}/>
    <directionalLight position={[5, 8, -8]} intensity={3.8} color="#7aafa4"/>
    <directionalLight position={[2, 3, 9]} intensity={2.8} color="#aab5a5"/>
  </>;
}
