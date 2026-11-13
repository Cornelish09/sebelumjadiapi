import type { EpisodeTranscript, NarrativeCue } from '../../content/meditationTranscripts'

export interface TimedCue extends NarrativeCue { start: number; end: number }

// Data belum ditinjau, waktu null, tumpang tindih, atau audio berbeda tidak boleh diputar otomatis.
export function verifiedCues(transcript: EpisodeTranscript, audioSrc: string, duration: number): TimedCue[] {
  const alignment = transcript.alignment
  if (!transcript.audioContentsVerified || transcript.audioKind !== 'narration' ||
      !['VERIFIED', 'AUTO_ALIGNED'].includes(transcript.timingStatus) || !alignment?.method ||
      (transcript.timingStatus === 'VERIFIED' && !alignment.reviewedAt) ||
      alignment.audioSrc !== audioSrc || transcript.audioCandidatePath !== audioSrc ||
      !Number.isFinite(duration) || duration <= 0 || !Number.isFinite(alignment.duration) ||
      Math.abs(alignment.duration - duration) > .3 || !transcript.cues.length) return []
  let previousEnd = 0
  const ids = new Set<string>()
  for (const cue of transcript.cues) {
    if (typeof cue.start !== 'number' || typeof cue.end !== 'number' ||
        !Number.isFinite(cue.start) || !Number.isFinite(cue.end) ||
        cue.start < previousEnd || cue.end <= cue.start || cue.end > duration + .05 ||
        !cue.text.trim() || ids.has(cue.id)) return []
    previousEnd = cue.end
    ids.add(cue.id)
  }
  return transcript.cues as TimedCue[]
}

// Pencarian berdasarkan waktu media, termasuk seek mundur dan jeda antar kalimat.
export function cueAtTime(cues: readonly TimedCue[], time: number): TimedCue | null {
  if (!Number.isFinite(time) || time < 0) return null
  let low = 0, high = cues.length - 1
  while (low <= high) {
    const mid = (low + high) >>> 1, cue = cues[mid]
    if (time < cue.start) high = mid - 1
    else if (time >= cue.end) low = mid + 1
    else return cue
  }
  return null
}
