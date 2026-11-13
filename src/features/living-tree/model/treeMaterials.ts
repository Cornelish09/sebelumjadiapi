import { DataTexture, RepeatWrapping, RGBAFormat, LinearFilter, LinearMipmapLinearFilter } from 'three';
// Normal map diturunkan lokal dari tekstur kulit kayu orisinal yang dihasilkan untuk proyek.
export function createBarkNormal(image: CanvasImageSource) {
    const size = 1024, canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const context = canvas.getContext('2d')!;
    context.drawImage(image, 0, 0, size, size);
    const pixels = context.getImageData(0, 0, size, size).data, data = new Uint8Array(size * size * 4);
    const sample = (x: number, y: number) => pixels[(((y + size) % size) * size + (x + size) % size) * 4] / 255;
    for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
            const dx = (sample(x + 1, y) - sample(x - 1, y)) * 3.5, dy = (sample(x, y + 1) - sample(x, y - 1)) * 3.5;
            const length = Math.sqrt(dx * dx + dy * dy + 1), i = (y * size + x) * 4;
            data[i] = (-dx / length * 0.5 + 0.5) * 255;
            data[i + 1] = (dy / length * 0.5 + 0.5) * 255;
            data[i + 2] = (1 / length * 0.5 + 0.5) * 255;
            data[i + 3] = 255;
        }
    const texture = new DataTexture(data, size, size, RGBAFormat);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.magFilter = LinearFilter;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
}
