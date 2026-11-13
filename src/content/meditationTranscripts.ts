import source from './meditations/transcripts.json'
import peace from './meditations/aligned/peace.json'
import awareness from './meditations/aligned/awareness.json'
import sorrow from './meditations/aligned/sorrow.json'
import anger from './meditations/aligned/anger.json'
import hope from './meditations/aligned/hope.json'
export interface NarrativeCue { id: string; text: string; start: number | null; end: number | null }
export interface EpisodeTranscript {
 id:string; intro:string; audioCandidatePath:string; audioContentsVerified:boolean
 audioKind?:string; timingStatus:string
 alignment?:{audioSrc:string;duration:number;reviewedAt:string;method:string;audioSha256?:string}
 cues:NarrativeCue[]
}
const aligned:EpisodeTranscript[]=[peace,awareness,sorrow,anger,hope]
export const episodeTranscripts:readonly EpisodeTranscript[]=source.episodes.map(ep=>aligned.find(a=>a.id===ep.id)??ep)
