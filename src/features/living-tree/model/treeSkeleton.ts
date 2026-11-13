import { CatmullRomCurve3, Vector3 } from 'three';
export interface Limb {
    curve: CatmullRomCurve3;
    radius: number;
    tip: number;
    foliage: boolean;
    seed: number;
}
export function seededRandom(seed: number) {
    return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
}
// Struktur bercabang bertingkat, dengan proporsi pohon tua dan akar banir.
export function createTreeSkeleton() {
    const random = seededRandom(83019), limbs: Limb[] = [];
    const v = (x: number, y: number, z: number) => new Vector3(x, y, z);
    const add = (points: Vector3[], radius: number, tip: number, foliage = false) => {
        const limb = { curve: new CatmullRomCurve3(points), radius, tip, foliage, seed: random() * 100 };
        limbs.push(limb);
        return limb;
    };
    const trunk = add([v(0, 0, 0), v(-0.16, 1.4, 0.12), v(0.22, 3, 0), v(-0.15, 4.8, -0.2), v(0.5, 6.2, -0.4), v(0.2, 7.4, -0.6)], 1.8, 0.08);
    for (let i = 0; i < 9; i++) {
        const a = i * 2.399, reach = 4 + random() * 3;
        const root = add([v(0, 1.15 + random() * 0.6, 0), v(Math.cos(a) * 0.95, 0.5, Math.sin(a) * 0.95), v(Math.cos(a + 0.12) * 2.3, 0.12, Math.sin(a + 0.12) * 2.3), v(Math.cos(a - 0.08) * reach, -0.12, Math.sin(a - 0.08) * reach)], 0.48 + random() * 0.15, 0.012);
        for (let j = 0; j < 2; j++) {
            const p = root.curve.getPoint(0.5 + j * 0.18), angle = a + (j ? 0.5 : -0.4);
            add([p, p.clone().add(v(Math.cos(angle), -0.07, Math.sin(angle))), p.clone().add(v(Math.cos(angle) * 2.5, -0.16, Math.sin(angle) * 2.5))], 0.13, 0.008);
        }
    }
    for (let i = 0; i < 11; i++) {
        const a = i * 2.399 + 0.2, origin = trunk.curve.getPoint(0.23 + i * 0.043);
        const reach = 5.5 + random() * 2.4, rise = 2.3 + random() * 2.7;
        const primary = add([origin, origin.clone().add(v(Math.cos(a) * 1.6, 0.1, Math.sin(a) * 1.6)), origin.clone().add(v(Math.cos(a + 0.16) * reach * 0.65, rise * 0.35, Math.sin(a + 0.16) * reach * 0.65)), origin.clone().add(v(Math.cos(a) * reach, rise, Math.sin(a) * reach))], 0.98 - i * 0.045, 0.025);
        for (let j = 0; j < 6; j++) {
            const start = primary.curve.getPoint(0.3 + j * 0.11), angle = a + (j % 2 ? 1 : -1) * (0.5 + random() * 0.6);
            const length = 1.5 + random() * 1.6, end = start.clone().add(v(Math.cos(angle) * length, 0.8 + random() * 1.4, Math.sin(angle) * length));
            const secondary = add([start, start.clone().lerp(end, 0.45).add(v(0, -0.15, 0)), end], 0.12 + random() * 0.04, 0.009);
            for (let k = 0; k < 5; k++) {
                const p = secondary.curve.getPoint(0.3 + k * 0.14), theta = angle + (k % 2 ? 1 : -1) * (0.7 + random() * 0.5);
                const endpoint = p.clone().add(v(Math.cos(theta) * (0.7 + random()), 0.25 + random() * 0.7, Math.sin(theta) * (0.7 + random())));
                add([p, p.clone().lerp(endpoint, 0.5), endpoint], 0.028, 0.002, true);
            }
        }
    }
    // Tajuk pusat menutup ujung batang dan menyambung siluet kanopi.
    for (let i = 0; i < 5; i++) {
        const angle = i * 2.399, start = trunk.curve.getPoint(0.72 + i * 0.035);
        const end = start.clone().add(v(Math.cos(angle) * 2.5, 2.4, Math.sin(angle) * 2.5));
        const crown = add([start, start.clone().lerp(end, 0.45).add(v(0, 0.3, 0)), end], 0.22, 0.008);
        for (let j = 0; j < 5; j++) {
            const origin = crown.curve.getPoint(0.35 + j * 0.12), a = angle + (j % 2 ? 0.9 : -0.9);
            add([origin, origin.clone().add(v(Math.cos(a) * 0.5, 0.4, Math.sin(a) * 0.5)), origin.clone().add(v(Math.cos(a), 0.7, Math.sin(a)))], 0.027, 0.002, true);
        }
    }
    return limbs;
}
