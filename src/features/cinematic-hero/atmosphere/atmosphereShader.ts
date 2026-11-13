export const atmosphereShader = /* glsl */ `
float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }
vec3 atmosphere(vec3 color, vec2 uv) {
  // Kabut tipis hanya di kedalaman, tidak mengaburkan detail kulit kayu.
  float mist = sin(uv.x * 9.0 + uTime * 0.065 + sin(uv.y * 7.0)) * 0.5 + 0.5;
  float valley = exp(-pow((uv.y - 0.37) * 4.5, 2.0));
  color += vec3(0.065, 0.085, 0.075) * mist * valley * 0.045;
  // Butiran cahaya memakai pass titik terpisah yang jauh lebih hemat GPU.
  return color;
}
`
