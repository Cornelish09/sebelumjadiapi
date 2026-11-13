export interface ShareEnvironment {copy:(text:string)=>Promise<void>;share?: (data:{text:string})=>Promise<void>}
export async function deliverMessage(text:string,mode:'copy'|'share',env:ShareEnvironment):Promise<'copied'|'shared'|'manual'|'cancelled'>{
 if(mode==='share'&&env.share){try{await env.share({text});return 'shared'}catch(error){if(error instanceof Error&&error.name==='AbortError')return 'cancelled'}}
 try{await env.copy(text);return 'copied'}catch{return 'manual'}
}
export function whatsappUrl(text:string){return `https://wa.me/?text=${encodeURIComponent(text)}`}
