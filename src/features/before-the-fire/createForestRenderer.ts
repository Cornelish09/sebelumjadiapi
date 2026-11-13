import fragment from './forest.frag.glsl?raw'
import foregroundFragment from './foreground.frag.glsl?raw'
import {beforeFireAssets as assets} from '../../content/beforeTheFire'
import {fireFrame} from './fireTimeline'
import {wildlifePlacement} from './wildlifePlacement'

export interface ForestDraw {progress:number; x:number; y:number; reveal:number; time:number;compare?:number}
export interface ForestRenderer {draw:(state:ForestDraw)=>void;resize:()=>void;dispose:()=>void}
export async function createForestRenderer(canvas:HTMLCanvasElement):Promise<ForestRenderer>{
  const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power',preserveDrawingBuffer:false})
  if(!gl||gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)<8)throw new Error('Fallback compositor')
  const textures:WebGLTexture[]=[],shaders:WebGLShader[]=[],programs:WebGLProgram[]=[]
  let buffer:WebGLBuffer|null=null,disposed=false
  const aspects=new Map<string,number>()
  const dispose=()=>{disposed=true;textures.forEach(t=>gl.deleteTexture(t));shaders.forEach(s=>gl.deleteShader(s));programs.forEach(p=>gl.deleteProgram(p));if(buffer)gl.deleteBuffer(buffer)}
  try{
    const shader=(type:number,source:string)=>{const s=gl.createShader(type);if(!s)throw new Error('Shader');shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s)||'Shader');return s}
    const vertex=shader(gl.VERTEX_SHADER,'attribute vec2 aPosition; varying vec2 vUv; void main(){vUv=aPosition*.5+.5;gl_Position=vec4(aPosition,0.,1.);}')
    const common=['uViewport','uPointer','uDrift','uTreeRect','uAnimalFromRect','uAnimalToRect','uAnimalHealthyRect','uAnimalBlend','uBlend','uProgress','uDamage','uLife','uFire','uReveal','uCompare','uTime']
    const makePass=(source:string,samplers:string[])=>{
      const program=gl.createProgram();if(!program)throw new Error('Program')
      programs.push(program);gl.attachShader(program,vertex);gl.attachShader(program,shader(gl.FRAGMENT_SHADER,source));gl.bindAttribLocation(program,0,'aPosition');gl.linkProgram(program)
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program)||'Program link')
      const uniforms=Object.fromEntries([...samplers,...common].map(name=>[name,gl.getUniformLocation(program,name)]))
      gl.useProgram(program);samplers.forEach((name,i)=>gl.uniform1i(uniforms[name],i))
      return {program,uniforms}
    }
    const world=makePass(fragment,['uFrom','uTo','uHealthy','uTreeAlive','uTreeAsh','uAnimalFrom','uAnimalTo','uAnimalHealthy'])
    const foreground=makePass(foregroundFragment,['uForegroundAlive','uForegroundAsh','uCanopy'])
    buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0)
    const load=async(src:string)=>{
      const image=new Image();image.decoding='async';image.src=src;await image.decode()
      if(disposed)throw new Error('Disposed')
      aspects.set(src,image.naturalWidth/image.naturalHeight)
      const texture=gl.createTexture();if(!texture)throw new Error('Texture')
      textures.push(texture);gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true)
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image)
      await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));return texture
    }
    const backgrounds:WebGLTexture[]=[];for(const src of assets.scenes)backgrounds.push(await load(src))
    const treeAlive=await load(assets.treeAlive),treeAsh=await load(assets.treeAsh)
    const animals:WebGLTexture[]=[];for(const src of assets.wildlife)animals.push(await load(src))
    const foregroundAlive=await load(assets.foregroundAlive),foregroundAsh=await load(assets.foregroundAsh),canopy=await load(assets.canopy)
    let w=1,h=1,placements:number[][]=[]
    const low=(navigator.hardwareConcurrency||8)<=4
    const resize=()=>{
      w=Math.max(1,canvas.clientWidth);h=Math.max(1,canvas.clientHeight)
      const dpr=Math.min(devicePixelRatio||1,low?1:1.25,Math.sqrt((low?950000:2073600)/(w*h)))
      canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);gl.viewport(0,0,canvas.width,canvas.height)
      for(const pass of [world,foreground]){gl.useProgram(pass.program);gl.uniform2f(pass.uniforms.uViewport,w,h)}
      gl.useProgram(world.program)
      const treeHeight=1.13,treeWidth=treeHeight*h*.8/w
      gl.uniform4f(world.uniforms.uTreeRect,(w<700?1.65:1.08)-treeWidth,-.055,treeWidth,treeHeight)
      placements=wildlifePlacement(w,h,assets.wildlife.map(src=>aspects.get(src)??4/3))
      gl.uniform4fv(world.uniforms.uAnimalHealthyRect,placements[0])
    }
    const bind=(bound:WebGLTexture[])=>bound.forEach((texture,i)=>{gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,texture)})
    const draw=({progress,x,y,reveal,time,compare=0}:ForestDraw)=>{
      if(disposed||gl.isContextLost())return
      const frame=fireFrame(progress)
      gl.disable(gl.BLEND);gl.useProgram(world.program)
      bind([backgrounds[frame.from],backgrounds[frame.to],backgrounds[0],treeAlive,treeAsh,animals[frame.animal.from],animals[frame.animal.to],animals[0]])
      gl.uniform4fv(world.uniforms.uAnimalFromRect,placements[frame.animal.from]);gl.uniform4fv(world.uniforms.uAnimalToRect,placements[frame.animal.to])
      gl.uniform1f(world.uniforms.uAnimalBlend,frame.animal.blend)
      for(const pass of [world,foreground]){
        const u=pass.uniforms
        if(pass===foreground){gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.useProgram(pass.program);bind([foregroundAlive,foregroundAsh,canopy])}
        gl.uniform1f(u.uBlend,frame.blend);gl.uniform1f(u.uProgress,frame.p);gl.uniform1f(u.uDamage,frame.damage);gl.uniform1f(u.uLife,frame.life)
        gl.uniform1f(u.uFire,frame.fire)
        gl.uniform1f(u.uReveal,reveal);gl.uniform1f(u.uCompare,compare);gl.uniform1f(u.uTime,time);gl.uniform2f(u.uPointer,x,y);gl.uniform2f(u.uDrift,(x-.5)*.8,(y-.5)*.6)
        gl.drawArrays(gl.TRIANGLES,0,6)
      }
      gl.disable(gl.BLEND)
    }
    resize();return {draw,resize,dispose}
  }catch(error){dispose();throw error}
}
