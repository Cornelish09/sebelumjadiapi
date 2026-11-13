import { useSyncExternalStore } from 'react'
import { audioEngine } from './AudioEngine'
export function useSiteAudio(){return useSyncExternalStore(audioEngine.subscribe,audioEngine.snapshot,audioEngine.snapshot)}
export function formatTime(seconds:number){if(!Number.isFinite(seconds))return '—:—';return `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`}
