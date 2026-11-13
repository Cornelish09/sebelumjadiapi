import { fragmentShader, vertexShader } from './heroShaders'
import type { SceneFrame } from '../parallax/ParallaxController'
import { createLightParticles } from '../atmosphere/createLightParticles'
import { createEnergyRenderer } from '../energy/createEnergyRenderer'
import { HeroPerformanceController, type QualityPreset } from '../performance/HeroPerformanceController'

// Empat bidang saja: tidak memerlukan engine/model 3D di unduhan hero.
export async function createHeroRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' })
  if (!gl) throw new Error('WebGL tidak tersedia')
  const resources: { textures: WebGLTexture[]; shaders: WebGLShader[] } = { textures: [], shaders: [] }
  let program: WebGLProgram | null = null, buffer: WebGLBuffer | null = null
  let particles: ReturnType<typeof createLightParticles> | undefined
  let energy: ReturnType<typeof createEnergyRenderer> | undefined
  const liveResources=()=>Number(gl.isProgram(program))+Number(gl.isBuffer(buffer))+resources.textures.filter(t=>gl.isTexture(t)).length+resources.shaders.filter(s=>gl.isShader(s)).length+(energy?.liveResources()||0)+(particles?.liveResources()||0)
  const dispose = () => {
    gl.useProgram(null)
    resources.textures.forEach(texture => gl.deleteTexture(texture))
    resources.shaders.forEach(shader => gl.deleteShader(shader))
    gl.deleteBuffer(buffer); gl.deleteProgram(program)
    particles?.dispose()
    energy?.dispose()
    if(import.meta.env.DEV) canvas.dataset.releasedResources=String(liveResources())
  }
  try {
    const compile = (kind: number, source: string) => {
      const shader = gl.createShader(kind)
      if (!shader) throw new Error('Shader tidak tersedia')
      resources.shaders.push(shader)
      gl.shaderSource(shader, source); gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || 'Shader gagal')
      return shader
    }
    program = gl.createProgram()
    if (!program) throw new Error('Program GPU tidak tersedia')
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShader))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentShader))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Program gagal')
    gl.useProgram(program)
    // Satu segitiga menutup viewport tanpa sambungan diagonal dua quad.
    buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,0,0,0, 3,-1,0,2,0, -1,3,0,0,2]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position'), uv = gl.getAttribLocation(program, 'uv')
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 20, 0)
    gl.enableVertexAttribArray(uv); gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 20, 12)
    const locations = new Map<string, WebGLUniformLocation | null>()
    const loc = (name: string) => {
      if (!locations.has(name)) locations.set(name, gl.getUniformLocation(program!, name))
      return locations.get(name)!
    }
    const scalar = (name: string, value: number) => gl.uniform1f(loc(name), value)
    const pair = (name: string, x: number, y: number) => gl.uniform2f(loc(name), x, y)
    const paths = ['forest-background-soft', 'tree-layer', 'foreground-layer', 'canopy-layer']
    const images = await Promise.all(paths.map(path => new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error(`Layer ${path} gagal dimuat`))
      image.src = `/assets/hero/${path}.webp`
    })))
    const names = ['uBackground', 'uTree', 'uForeground', 'uCanopy']
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
    images.forEach((image, index) => {
      const texture = gl.createTexture()
      if (!texture) throw new Error('Tekstur GPU tidak tersedia')
      resources.textures.push(texture)
      gl.activeTexture(gl.TEXTURE0 + index); gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.uniform1i(loc(names[index]), index)
    })
    const imageAspect = images[0].naturalWidth / images[0].naturalHeight
    particles = createLightParticles(gl)
    energy = createEnergyRenderer(gl)
    if(import.meta.env.DEV) canvas.dataset.liveResources=String(liveResources())
    gl.useProgram(program)
    let width = 1, height = 1
    const performance = new HeroPerformanceController()
    let budget = performance.budget(1440)
    let cover: [number,number] = [1,1], origin: [number,number] = [.5,.5]
    const resize = (w: number, h: number) => {
      width = w; height = h
      budget=performance.budget(w)
      const aspect = w / h, dpr = Math.min(window.devicePixelRatio || 1, budget.dpr)
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      scalar('uAspect', aspect)
      cover=[Math.min(1, aspect / imageAspect), Math.min(1, imageAspect / aspect)]
      origin=[aspect < 0.85 ? 0.65 : 0.5,0.5]
      pair('uCover', ...cover)
      pair('uOrigin', ...origin)
      pair('uResolution', w, h)
    }
    return {
      resize,
      setQuality(preset: QualityPreset) {
        if(performance.requested!==preset) { performance.setPreset(preset);resize(width,height);return true }
        return false
      },
      render(time: number, frame: SceneFrame, moving: boolean, dt: number) {
        gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.enableVertexAttribArray(position); gl.enableVertexAttribArray(uv)
        gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 20, 0)
        gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 20, 12)
        scalar('uTime', time); pair('uParallax', frame.x, frame.y)
        pair('uLight', frame.lightX, frame.lightY)
        scalar('uPresence', frame.presence); scalar('uMotion', moving ? 1 : 0)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        gl.disableVertexAttribArray(position); gl.disableVertexAttribArray(uv)
        energy?.render(time,frame,moving,dt,width,height,canvas.width/width,cover,origin,budget)
        particles?.render(time, frame.x, frame.y, canvas.width / width,budget.ambient)
        gl.useProgram(program)
        const metrics=moving?performance.record(dt):null
        if (metrics) {
          if (import.meta.env.DEV) {
            canvas.dataset.fps = String(metrics.fps)
            canvas.dataset.p95Ms = metrics.p95Ms.toFixed(1)
            canvas.dataset.drawCalls = energy?'3':'2'
            canvas.dataset.energyParticles = String(energy?budget.particles:0)
            canvas.dataset.quality = performance.effective
            canvas.dataset.energyPaths = String(energy?.pathCount||0)
            canvas.dataset.sceneTime = time.toFixed(2)
            canvas.dataset.parallax = JSON.stringify([+frame.x.toFixed(3), +frame.y.toFixed(3)])
          }
          if(metrics.changed) resize(width,height)
        }
      },
      dispose,
    }
  } catch (error) {
    dispose()
    throw error
  }
}
