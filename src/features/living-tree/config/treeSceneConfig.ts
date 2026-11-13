// Batas geometry dan partikel dapat dituning tanpa mengubah komponen scene.
export const sceneBudget = {
    leavesPerTwig: 44,
    energyParticles: 9500,
    backgroundTrees: 12,
    groundLeaves: 1800,
    maxDpr: 1.5,
    minDpr: 1,
    declineFps: 42,
} as const;

import type { CanvasProps } from '@react-three/fiber';
// Batas awal konservatif; nilai final ditentukan lewat profiling scene berikutnya.
export const treeSceneConfig = {
    camera: { position: [0, 3.6, 13], fov: 42, near: 0.1, far: 80 },
    dpr: [sceneBudget.minDpr, sceneBudget.maxDpr],
    renderer: { alpha: true, antialias: true, powerPreference: 'high-performance' },
} satisfies Pick<CanvasProps, 'camera' | 'dpr'> & {
    renderer: NonNullable<CanvasProps['gl']>;
};

