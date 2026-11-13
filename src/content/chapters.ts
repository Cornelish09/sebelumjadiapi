// Enam bagian tetap menjadi kontrak konten; implementasinya menunggu Phase 5.
export const campaignChapters = [
  { id: 'why-it-matters', title: 'Why It Matters' },
  { id: 'before-the-fire', title: 'Before the Fire' },
  { id: 'make-it-personal', title: 'Make It Personal' },
  { id: 'take-action', title: 'Take Action' },
  { id: 'show-your-action', title: 'Show Your Action' },
  { id: 'stay-in-movement', title: 'Stay in the Movement' },
] as const

export type CampaignChapterId = (typeof campaignChapters)[number]['id']
