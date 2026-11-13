import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { verificationChecklist, type MissionId } from '../../content/takeAction.ts'

const prefix = 'sebelumjadiapi-actions-v1:'
const change = 'sebelumjadiapi-actions-change'
const memory = new Map<string, string>()
const missions: readonly MissionId[] = ['learn', 'check', 'share', 'join', 'invite']

function subscribe(listener: () => void) {
  window.addEventListener(change, listener)
  window.addEventListener('storage', listener)
  return () => {
    window.removeEventListener(change, listener)
    window.removeEventListener('storage', listener)
  }
}

function read(key: string) {
  if (typeof window === 'undefined') return ''
  if (memory.has(key)) return memory.get(key)!
  try { return localStorage.getItem(prefix + key) ?? '' } catch { return '' }
}

export function saveLocal(key: string, value: unknown) {
  const serialized = JSON.stringify(value)
  let persisted = true
  try {
    localStorage.setItem(prefix + key, serialized)
    memory.delete(key)
  } catch {
    memory.set(key, serialized)
    persisted = false
  }
  window.dispatchEvent(new Event(change))
  return persisted
}

function useLocalValue<T>(key: string, decode: (raw: string) => T, fallbackKey?: string) {
  const snapshot = useSyncExternalStore(subscribe, () => read(key) || (fallbackKey ? read(fallbackKey) : ''), () => '')
  return useMemo(() => decode(snapshot), [decode, snapshot])
}

function parse(raw: string): unknown {
  try { return JSON.parse(raw) } catch { return null }
}

function decodeMissions(raw: string): MissionId[] {
  const value = parse(raw)
  return Array.isArray(value) ? missions.filter(mission => value.includes(mission)) : []
}

export function useMissionProgress() {
  const completed = useLocalValue('missions', decodeMissions)
  const checks = useVerificationChecks()
  return missions.filter(mission => mission === 'check' ? checks.every(Boolean) : completed.includes(mission))
}

export function completeMission(mission: Exclude<MissionId, 'check'>) {
  const completed = decodeMissions(read('missions'))
  if (!completed.includes(mission)) saveLocal('missions', [...completed, mission])
}

function decodeVerification(raw: string) {
  const value = parse(raw)
  // Progres lama hanya menyimpan status selesai. Pulihkan ketiga centangnya.
  const saved = Array.isArray(value) ? value : []
  return verificationChecklist.map((_, index) => saved[index] === true || saved.includes('check'))
}

export function useVerificationChecks() {
  return useLocalValue('verification', decodeVerification, 'missions')
}

export function setVerificationCheck(index: number, checked: boolean) {
  const next = decodeVerification(read('verification') || read('missions'))
  if (next[index] === undefined || next[index] === checked) return
  next[index] = checked
  saveLocal('verification', next)
}

export interface Pledge {
  id: string
  name: string
  city: string
  promise: string
}

function decodePledges(raw: string): Pledge[] {
  const value = parse(raw)
  if (!Array.isArray(value)) return []
  return value.filter((entry): entry is Pledge => entry &&
    typeof entry.id === 'string' && typeof entry.name === 'string' &&
    typeof entry.city === 'string' && typeof entry.promise === 'string')
}

function mergePledges(primary: Pledge[], secondary: Pledge[]): Pledge[] {
  const merged: Pledge[] = []
  const seenKeys = new Set<string>()
  const seenIds = new Set<string>()
  for (const item of [...primary, ...secondary]) {
    const key = `${item.name.trim().toLocaleLowerCase('id')}|${item.city.trim().toLocaleLowerCase('id')}|${item.promise.trim()}`
    if (seenKeys.has(key) || seenIds.has(item.id)) continue
    seenKeys.add(key)
    seenIds.add(item.id)
    merged.push(item)
  }
  return merged
}

let hasPushedLocalPledges = false
let syncInFlight: Promise<void> | null = null

function canSyncWithServer() {
  return typeof window !== 'undefined' && 'location' in window && typeof fetch === 'function'
}

function notifyBroadcastChannel() {
  if (typeof BroadcastChannel === 'undefined') return
  try {
    const channel = new BroadcastChannel('sebelumjadiapi-wall-sync')
    channel.postMessage('sync')
    channel.close()
  } catch {
    // Ignore BroadcastChannel errors on restricted browsers
  }
}

export async function syncSharedPledges() {
  if (!canSyncWithServer()) return
  if (syncInFlight) return syncInFlight
  syncInFlight = (async () => {
    try {
      const localEntries = decodePledges(read('pledges'))
      let res: Response
      if (!hasPushedLocalPledges && localEntries.length > 0) {
        hasPushedLocalPledges = true
        res = await fetch('/api/pledges', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pledges: localEntries }),
          cache: 'no-store',
        })
      } else {
        hasPushedLocalPledges = true
        res = await fetch('/api/pledges', { cache: 'no-store' })
      }
      if (!res.ok) return
      const data = await res.json() as { pledges?: unknown }
      const remoteEntries = decodePledges(JSON.stringify(data?.pledges ?? []))
      const latestLocal = decodePledges(read('pledges'))
      const combined = mergePledges(remoteEntries, latestLocal)
      if (JSON.stringify(combined) !== JSON.stringify(latestLocal)) {
        saveLocal('pledges', combined)
      }
    } catch {
      // Fallback silently to local entries when offline
    } finally {
      syncInFlight = null
    }
  })()
  return syncInFlight
}

async function pushPledgeToServer(pledge: Pledge) {
  if (!canSyncWithServer()) return
  try {
    const res = await fetch('/api/pledges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pledge }),
      cache: 'no-store',
    })
    if (!res.ok) return
    const data = await res.json() as { pledges?: unknown }
    const remoteEntries = decodePledges(JSON.stringify(data?.pledges ?? []))
    const latestLocal = decodePledges(read('pledges'))
    const combined = mergePledges(remoteEntries, latestLocal)
    if (JSON.stringify(combined) !== JSON.stringify(latestLocal)) {
      saveLocal('pledges', combined)
    }
    notifyBroadcastChannel()
  } catch {
    // Keep local pledge if network request fails
  }
}

export function usePledges() {
  const entries = useLocalValue('pledges', decodePledges)

  useEffect(() => {
    if (!canSyncWithServer()) return
    void syncSharedPledges()

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === 'hidden') return
      void syncSharedPledges()
    }, 4000)

    const onFocusOrVisible = () => {
      if (document.visibilityState !== 'hidden') {
        void syncSharedPledges()
      }
    }
    window.addEventListener('focus', onFocusOrVisible)
    document.addEventListener('visibilitychange', onFocusOrVisible)

    let channel: BroadcastChannel | null = null
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        channel = new BroadcastChannel('sebelumjadiapi-wall-sync')
        channel.onmessage = () => {
          void syncSharedPledges()
        }
      } catch {
        channel = null
      }
    }

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', onFocusOrVisible)
      document.removeEventListener('visibilitychange', onFocusOrVisible)
      channel?.close()
    }
  }, [])

  return entries
}

export function addPledge(draft: Omit<Pledge, 'id'>) {
  const entries = decodePledges(read('pledges'))
  const duplicate = entries.some(item =>
    item.name.toLocaleLowerCase('id') === draft.name.toLocaleLowerCase('id') &&
    item.city.toLocaleLowerCase('id') === draft.city.toLocaleLowerCase('id') &&
    item.promise === draft.promise)
  if (duplicate) return 'duplicate'
  const pledge = { ...draft, id: crypto.randomUUID() }
  const saved = saveLocal('pledges', [pledge, ...entries]) ? 'saved' : 'session'
  void pushPledgeToServer(pledge)
  return saved
}

