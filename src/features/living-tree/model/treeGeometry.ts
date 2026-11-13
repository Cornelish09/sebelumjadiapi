import { BufferGeometry, Float32BufferAttribute, Vector3 } from 'three';
import type { Limb } from './treeSkeleton';
export function limbRadius(limb: Limb, t: number, a: number) {
    const taper = limb.radius * Math.pow(1 - t, 0.92) + limb.tip * t;
    const buttress = limb.radius > 1 ? (1 - t) ** 8 * 0.42 * (0.5 + 0.5 * Math.cos(a * 7 + limb.seed)) : 0;
    const grain = 1 + 0.065 * Math.sin(a * 9 + t * 5 + limb.seed) + 0.033 * Math.sin(a * 23 - t * 13) + 0.018 * Math.sin(a * 41 + t * 61);
    return (taper + buttress) * grain;
}
export function createBarkGeometry(limbs: Limb[], detailed = true) {
    const positions: number[] = [], colors: number[] = [], indices: number[] = [], uvs: number[] = [];
    const point = new Vector3();
    for (const limb of limbs) {
        const radial = !detailed ? 7 : limb.radius > 0.4 ? 48 : limb.radius > 0.07 ? 20 : 7;
        const segments = !detailed ? 10 : limb.radius > 0.4 ? 80 : limb.radius > 0.07 ? 28 : 12;
        const frames = limb.curve.computeFrenetFrames(segments, false), offset = positions.length / 3;
        const length = limb.curve.getLength();
        for (let s = 0; s <= segments; s++) {
            const t = s / segments, center = limb.curve.getPoint(t);
            for (let r = 0; r <= radial; r++) {
                const a = r / radial * Math.PI * 2, radius = limbRadius(limb, t, a);
                point.copy(center).addScaledVector(frames.normals[s], Math.cos(a) * radius).addScaledVector(frames.binormals[s], Math.sin(a) * radius);
                positions.push(point.x, point.y, point.z);
                uvs.push(r / radial * Math.max(1, limb.radius * 7), t * length * 0.55);
                const moss = Math.max(0, Math.sin(a * 3 + t * 9 + limb.seed) * Math.sin(t * 13 + limb.seed));
                colors.push(0.8 - moss * 0.28, 0.8 - moss * 0.13, 0.75 - moss * 0.35);
                if (s < segments && r < radial) {
                    const k = offset + s * (radial + 1) + r;
                    indices.push(k, k + 1, k + radial + 1, k + 1, k + radial + 2, k + radial + 1);
                }
            }
        }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
}
export function createLeafGeometry() {
    const positions: number[] = [], uv: number[] = [], indices: number[] = [];
    // Permukaan daun oval melengkung, dengan tulang tengah dan ujung lancip.
    for (let j = 0; j <= 6; j++) {
        const t = j / 6, width = Math.sin(Math.PI * t) ** 0.8 * 0.072;
        for (let k = 0; k < 3; k++) {
            positions.push((k - 1) * width, t * 0.27, Math.sin(t * Math.PI) * 0.025 + (k === 1 ? 0.015 : 0));
            uv.push(k / 2, t);
            if (j < 6 && k < 2) {
                const a = j * 3 + k;
                indices.push(a, a + 1, a + 3, a + 1, a + 4, a + 3);
            }
        }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new Float32BufferAttribute(uv, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
}
