// Partikel digambar sebagai titik kecil; tidak menghitung 32 cahaya di setiap piksel hutan.
export function createLightParticles(gl: WebGLRenderingContext) {
  const vertex = `
    precision highp float;
    attribute vec4 seed;
    uniform float time; uniform float dpr; uniform vec2 parallax;
    varying float brightness; varying float softness; varying vec3 tint;
    void main() {
      float depth=seed.z;
      vec2 p=seed.xy;
      p.x=fract(p.x+sin(time*0.055+seed.w)*0.022-parallax.x*(0.002+depth*0.016));
      p.y=fract(p.y+time*(0.001+depth*0.0015));
      gl_Position=vec4(p*2.0-1.0,0.0,1.0);
      gl_PointSize=(1.6+depth*2.3)*dpr;
      brightness=(0.2+0.8*pow(sin(time*0.4+seed.w)*0.5+0.5,2.0))*smoothstep(0.0,.04,p.y)*smoothstep(1.0,.96,p.y);
      softness=2.0+depth*3.0;
      tint=mix(vec3(.25,.66,.57),vec3(.67,.71,.40),depth);
    }`
  const fragment = `
    precision mediump float;
    varying float brightness; varying float softness; varying vec3 tint;
    void main() {
      float d=length(gl_PointCoord-0.5)*2.0;
      float a=exp(-d*d*softness)*(1.0-smoothstep(0.7,1.0,d))*brightness;
      gl_FragColor=vec4(tint,a*0.48);
    }`
  const shaders: WebGLShader[] = []
  const program = gl.createProgram()!
  const buffer = gl.createBuffer()!
  try {
    for (const [kind, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]] as const) {
      const shader = gl.createShader(kind)!
      shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Shader atmosfer gagal')
      gl.attachShader(program, shader)
    }
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Program atmosfer gagal')
    const data = new Float32Array(64 * 4)
    const hash = (n: number) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x) }
    for (let i = 0; i < 64; i++) data.set([hash(i+1),hash(i+32),.2+(i%3)*.37,i*2.3], i*4)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    const seed = gl.getAttribLocation(program, 'seed')
    const time = gl.getUniformLocation(program, 'time'), parallax = gl.getUniformLocation(program, 'parallax'), dpr = gl.getUniformLocation(program, 'dpr')
    return {
      render(t: number, x: number, y: number, pixelRatio: number, count: number) {
        gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.enableVertexAttribArray(seed); gl.vertexAttribPointer(seed, 4, gl.FLOAT, false, 0, 0)
        gl.uniform1f(time,t); gl.uniform2f(parallax,x,y); gl.uniform1f(dpr,pixelRatio)
        gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA,gl.ONE)
        gl.drawArrays(gl.POINTS,0,count); gl.disable(gl.BLEND); gl.disableVertexAttribArray(seed)
      },
      dispose() { shaders.forEach(s=>gl.deleteShader(s)); gl.deleteProgram(program); gl.deleteBuffer(buffer) },
      liveResources:()=>Number(gl.isProgram(program))+Number(gl.isBuffer(buffer))+shaders.filter(s=>gl.isShader(s)).length,
    }
  } catch (error) {
    shaders.forEach(s=>gl.deleteShader(s)); gl.deleteProgram(program); gl.deleteBuffer(buffer)
    throw error
  }
}
