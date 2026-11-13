import { buildEnergyPathTexture, PATH_ROWS, PATH_SAMPLES } from './sampleEnergyPaths'
import { energyVertex, energyFragment } from './energyShaders'
import { EnergyResponse } from '../response/EnergyResponse'
import type { SceneFrame } from '../parallax/ParallaxController'

type Budget = {particles:number; trails:number; glow:number}
export function createEnergyRenderer(gl: WebGLRenderingContext) {
  if (gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<1) return null
  const program=gl.createProgram()!, buffer=gl.createBuffer()!, texture=gl.createTexture()!
  const shaders: WebGLShader[]=[]
  const dispose=()=>{shaders.forEach(s=>gl.deleteShader(s));gl.deleteBuffer(buffer);gl.deleteTexture(texture);gl.deleteProgram(program)}
  try {
    for (const [kind,source] of [[gl.VERTEX_SHADER,energyVertex],[gl.FRAGMENT_SHADER,energyFragment]] as const) {
      const shader=gl.createShader(kind)!
      shaders.push(shader);gl.shaderSource(shader,source);gl.compileShader(shader)
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader)||'Shader energi gagal')
      gl.attachShader(program,shader)
    }
    gl.linkProgram(program)
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program)||'Program energi gagal')
    gl.useProgram(program)
    const {data,paths}=buildEnergyPathTexture()
    gl.activeTexture(gl.TEXTURE4);gl.bindTexture(gl.TEXTURE_2D,texture)
    // Texture koordinat bukan gambar; jangan membalik urutan baris jalurnya.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,PATH_SAMPLES,PATH_ROWS,0,gl.RGBA,gl.UNSIGNED_BYTE,data)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
    const locations=new Map<string,WebGLUniformLocation|null>()
    const loc=(s:string)=>{if(!locations.has(s))locations.set(s,gl.getUniformLocation(program,s));return locations.get(s)!}
    const one=(s:string,v:number)=>gl.uniform1f(loc(s),v)
    const two=(s:string,x:number,y:number)=>gl.uniform2f(loc(s),x,y)
    gl.uniform1i(loc('uPaths'),4);gl.uniform1i(loc('uTree'),1);gl.uniform1i(loc('uForeground'),2);gl.uniform1i(loc('uCanopy'),3)
    const maxParticles=4200, dataSeeds=new Float32Array(maxParticles*3*8)
    const random=(n:number)=>{const v=Math.sin(n*127.1+87.2)*43758.5453;return v-Math.floor(v)}
    for(let i=0;i<maxParticles;i++) {
      const row=i%paths.length,path=paths[row], speed=(path.kind==='root'?.014:.022)/path.length
      for(let tail=0;tail<3;tail++) dataSeeds.set([row,random(i+2),speed*(.8+random(i+8)*.4),1.6+random(i+19)*1.6,
        path.width,random(i+29)*2-1,random(i+77),tail],(i*3+tail)*8)
    }
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,dataSeeds,gl.STATIC_DRAW)
    const seed=gl.getAttribLocation(program,'seed'), detail=gl.getAttribLocation(program,'detail')
    const response=new EnergyResponse()
    return {
      render(time:number,frame:SceneFrame,moving:boolean,dt:number,width:number,height:number,dpr:number,cover:readonly[number,number],origin:readonly[number,number],budget:Budget) {
        response.step(dt,frame,moving,paths,cover,origin,width/height,time)
        gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
        gl.enableVertexAttribArray(seed);gl.vertexAttribPointer(seed,4,gl.FLOAT,false,32,0)
        gl.enableVertexAttribArray(detail);gl.vertexAttribPointer(detail,4,gl.FLOAT,false,32,16)
        two('uResolution',width,height);two('uCover',...cover);two('uOrigin',...origin);two('uParallax',frame.x,frame.y);two('uLight',frame.lightX,frame.lightY)
        one('uDpr',dpr);one('uTime',time);one('uMotion',moving?1:0);one('uPresence',frame.presence)
        one('uTrails',moving?budget.trails:1);one('uGlow',budget.glow)
        gl.uniform1fv(loc('uRouteTimes[0]'),response.times);gl.uniform1fv(loc('uRouteResponse[0]'),response.strengths)
        gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE)
        gl.drawArrays(gl.POINTS,0,Math.min(maxParticles,budget.particles)*3)
        gl.disable(gl.BLEND);gl.disableVertexAttribArray(seed);gl.disableVertexAttribArray(detail)
      },
      dispose,
      liveResources:()=>Number(gl.isProgram(program))+Number(gl.isBuffer(buffer))+Number(gl.isTexture(texture))+shaders.filter(s=>gl.isShader(s)).length,
      pathCount:paths.length,
    }
  } catch(error) {dispose();throw error}
}
