import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
export function CameraRig({ moving }: {
    moving: boolean;
}) {
    const { camera, size } = useThree(), time = useRef(0);
    const mobile = size.width < 700;
    const distance = mobile ? 19.5 : 12.5;
    const targetX = mobile ? 0 : -2.1;
    useLayoutEffect(() => { camera.position.set(0, 2.8, distance); camera.lookAt(targetX, 3.8, 0); }, [camera, distance, targetX]);
    useFrame(({ pointer, camera }, delta) => {
        if (!moving)
            return;
        time.current += Math.min(delta, 0.05);
        const x = (mobile ? 0 : pointer.x * 0.75) + Math.sin(time.current * 0.13) * 0.1;
        const y = 2.8 + (mobile ? 0 : pointer.y * 0.28), damping = 1 - Math.exp(-delta * 1.7);
        camera.position.x += (x - camera.position.x) * damping;
        camera.position.y += (y - camera.position.y) * damping;
        camera.lookAt(targetX, 3.8, 0);
    });
    return null;
}
