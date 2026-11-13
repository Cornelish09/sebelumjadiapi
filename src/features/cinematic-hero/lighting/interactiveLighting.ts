// Cahaya mengangkat detail permukaan; tidak menggambar disk cahaya di atas gambar.
export const interactiveLighting = /* glsl */ `
float luminance(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
float sunPresence() {
  vec2 p=(uLight-vec2(0.12,0.84))*vec2(uAspect,1.0);
  return exp(-dot(p,p)*14.0)*uPresence;
}
vec3 gateSunlight(vec3 color, vec2 uv) {
  float presence=sunPresence();
  // Cahaya dasar sudah diperhalus di aset. Shader hanya MENAMBAH pantulan.
  float canopy=exp(-dot((uv-vec2(.14,.82))*vec2(2.0,2.5),(uv-vec2(.14,.82))*vec2(2.0,2.5))*3.0);
  color+=color*vec3(.10,.075,.035)*canopy*presence;
  // Pantulan hangat merambat ke sisi kiri batang, tanpa memutihkan kulit kayu.
  float bark=exp(-pow((uv.x-0.57)*5.0,2.0))*smoothstep(0.05,0.65,uv.y);
  color*=1.0+bark*presence*vec3(0.22,0.16,0.07);
  return color;
}
vec3 lightSurface(vec3 color, vec2 uv, float surface, float detail) {
  vec2 d = (vUv - uLight) * vec2(uAspect, 1.0);
  // Dua lobe elips dan modulasi permukaan menghindari tepi flashlight melingkar.
  float pool = exp(-dot(d * vec2(2.9, 3.8), d * vec2(2.9, 3.8)));
  float skirt = exp(-dot(d * vec2(1.5, 2.3), d * vec2(1.5, 2.3))) * 0.22;
  float leaf = clamp((color.g - color.r * 0.72) * 2.4, 0.0, 0.45);
  float facing = clamp(0.65 + detail * 3.0, 0.35, 1.0);
  float lift = (pool + skirt) * (0.15 + surface * 0.20) * facing;
  vec3 warm = vec3(1.0, 0.91, 0.69);
  // Bayangan tetap berisi detail; tidak ada vignette hitam yang mengejar kursor.
  color += color * warm * lift * uPresence + color * leaf * pool * uPresence * 0.07;
  return color;
}
`
