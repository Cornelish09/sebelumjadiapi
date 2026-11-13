import fs from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

interface WallPledge {
  id: string
  name: string
  city: string
  promise: string
}

interface NewsletterEntry {
  email: string
  subscribedAt: string
}

function isValidEmail(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) &&
    value.trim().length <= 254
  )
}

function dedupeSubscribers(list: unknown[]): NewsletterEntry[] {
  const seen = new Set<string>()
  const result: NewsletterEntry[] = []
  for (const raw of list) {
    const emailCandidate =
      typeof raw === 'string'
        ? raw
        : raw && typeof raw === 'object'
          ? (raw as Record<string, unknown>).email
          : undefined
    if (!isValidEmail(emailCandidate)) continue
    const clean = emailCandidate.trim().toLowerCase()
    if (seen.has(clean)) continue
    seen.add(clean)
    const subscribedAt =
      raw && typeof raw === 'object' && typeof (raw as Record<string, unknown>).subscribedAt === 'string'
        ? ((raw as Record<string, unknown>).subscribedAt as string)
        : new Date().toISOString()
    result.push({ email: clean, subscribedAt })
  }
  return result.slice(0, 500)
}

function isValidPledge(item: unknown): item is WallPledge {
  if (!item || typeof item !== 'object') return false
  const candidate = item as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    candidate.id.trim().length > 0 &&
    typeof candidate.name === 'string' &&
    candidate.name.trim().length > 0 &&
    typeof candidate.city === 'string' &&
    candidate.city.trim().length > 0 &&
    typeof candidate.promise === 'string' &&
    candidate.promise.trim().length > 0
  )
}

function dedupePledges(list: WallPledge[]): WallPledge[] {
  const seen = new Set<string>()
  const result: WallPledge[] = []
  for (const item of list) {
    if (!isValidPledge(item)) continue
    const key = `${item.name.trim().toLocaleLowerCase('id')}|${item.city.trim().toLocaleLowerCase('id')}|${item.promise.trim()}`
    if (seen.has(key)) continue
    seen.add(key)
    result.push({
      id: item.id.trim(),
      name: item.name.trim().slice(0, 24),
      city: item.city.trim().slice(0, 30),
      promise: item.promise.trim(),
    })
  }
  return result.slice(0, 200)
}

function wallOfActionPlugin(): Plugin {
  const localFile = path.resolve(process.cwd(), 'tmp/wall-of-action.json')
  const localNewsletterFile = path.resolve(process.cwd(), 'tmp/newsletter-subscribers.json')
  let siteId = ''
  let blobsToken = ''

  const readLocalSubscribers = (): NewsletterEntry[] => {
    try {
      if (!fs.existsSync(localNewsletterFile)) return []
      const parsed: unknown = JSON.parse(fs.readFileSync(localNewsletterFile, 'utf8'))
      return Array.isArray(parsed) ? dedupeSubscribers(parsed) : []
    } catch {
      return []
    }
  }

  const writeLocalSubscribers = (entries: NewsletterEntry[]) => {
    try {
      fs.mkdirSync(path.dirname(localNewsletterFile), { recursive: true })
      fs.writeFileSync(localNewsletterFile, JSON.stringify(entries, null, 2), 'utf8')
    } catch {
      // Abaikan jika filesystem hanya-baca.
    }
  }

  const fetchCloudSubscribers = async (): Promise<NewsletterEntry[]> => {
    if (!siteId || !blobsToken) return []
    try {
      const response = await fetch(
        `https://api.netlify.com/api/v1/blobs/${siteId}/site:wall/newsletter`,
        { headers: { Authorization: `Bearer ${blobsToken}` } },
      )
      if (!response.ok) return []
      const parsed: unknown = await response.json()
      return Array.isArray(parsed) ? dedupeSubscribers(parsed) : []
    } catch {
      return []
    }
  }

  const pushCloudSubscribers = async (entries: NewsletterEntry[]) => {
    if (!siteId || !blobsToken) return
    try {
      await fetch(
        `https://api.netlify.com/api/v1/blobs/${siteId}/site:wall/newsletter`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${blobsToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entries),
        },
      )
    } catch {
      // Gunakan penyimpanan lokal bila jaringan sedang luring.
    }
  }

  const readLocalFile = (): WallPledge[] => {
    try {
      if (!fs.existsSync(localFile)) return []
      const parsed: unknown = JSON.parse(fs.readFileSync(localFile, 'utf8'))
      return Array.isArray(parsed) ? dedupePledges(parsed.filter(isValidPledge)) : []
    } catch {
      return []
    }
  }

  const writeLocalFile = (entries: WallPledge[]) => {
    try {
      fs.mkdirSync(path.dirname(localFile), { recursive: true })
      fs.writeFileSync(localFile, JSON.stringify(entries, null, 2), 'utf8')
    } catch {
      // Abaikan jika filesystem hanya-baca.
    }
  }

  const fetchCloudPledges = async (): Promise<WallPledge[]> => {
    if (!siteId || !blobsToken) return []
    try {
      const response = await fetch(
        `https://api.netlify.com/api/v1/blobs/${siteId}/site:wall/pledges`,
        { headers: { Authorization: `Bearer ${blobsToken}` } },
      )
      if (!response.ok) return []
      const parsed: unknown = await response.json()
      return Array.isArray(parsed) ? dedupePledges(parsed.filter(isValidPledge)) : []
    } catch {
      return []
    }
  }

  const pushCloudPledges = async (entries: WallPledge[]) => {
    if (!siteId || !blobsToken) return
    try {
      await fetch(
        `https://api.netlify.com/api/v1/blobs/${siteId}/site:wall/pledges`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${blobsToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entries),
        },
      )
    } catch {
      // Gunakan penyimpanan lokal bila jaringan sedang luring.
    }
  }

  const readRequestBody = (req: IncomingMessage): Promise<string> =>
    new Promise((resolve, reject) => {
      let data = ''
      req.on('data', (chunk: Buffer) => {
        data += chunk.toString('utf8')
      })
      req.on('end', () => resolve(data))
      req.on('error', reject)
    })

  const handler = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (req.url?.startsWith('/api/newsletter')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Cache-Control', 'no-store')

      const cloudSubs = await fetchCloudSubscribers()
      const localSubs = readLocalSubscribers()
      const mergedSubs = dedupeSubscribers([...cloudSubs, ...localSubs])

      if (req.method === 'GET') {
        if (mergedSubs.length !== localSubs.length) writeLocalSubscribers(mergedSubs)
        res.statusCode = 200
        res.end(JSON.stringify({ ok: true, count: mergedSubs.length }))
        return
      }

      if (req.method === 'POST') {
        try {
          const raw = await readRequestBody(req)
          const body = JSON.parse(raw || '{}') as { email?: unknown }
          if (!isValidEmail(body.email)) {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false, status: 'invalid', count: mergedSubs.length }))
            return
          }
          const cleanEmail = body.email.trim().toLowerCase()
          const alreadyExists = mergedSubs.some(item => item.email === cleanEmail)
          const updated = alreadyExists
            ? mergedSubs
            : dedupeSubscribers([
                { email: cleanEmail, subscribedAt: new Date().toISOString() },
                ...mergedSubs,
              ])
          writeLocalSubscribers(updated)
          await pushCloudSubscribers(updated)
          res.statusCode = 200
          res.end(
            JSON.stringify({
              ok: true,
              status: alreadyExists ? 'already_subscribed' : 'subscribed',
              count: updated.length,
            }),
          )
        } catch {
          res.statusCode = 400
          res.end(JSON.stringify({ ok: false, status: 'error', count: mergedSubs.length }))
        }
        return
      }

      res.statusCode = 405
      res.end(JSON.stringify({ ok: false, count: mergedSubs.length }))
      return
    }

    if (!req.url?.startsWith('/api/pledges')) {
      next()
      return
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')

    const cloudEntries = await fetchCloudPledges()
    const localEntries = readLocalFile()
    let merged = dedupePledges([...cloudEntries, ...localEntries])

    if (req.method === 'GET') {
      if (merged.length !== localEntries.length) writeLocalFile(merged)
      res.statusCode = 200
      res.end(JSON.stringify({ pledges: merged }))
      return
    }

    if (req.method === 'POST') {
      try {
        const raw = await readRequestBody(req)
        const body = JSON.parse(raw || '{}') as { pledge?: unknown; pledges?: unknown[] }
        const incoming: WallPledge[] = []
        if (isValidPledge(body.pledge)) incoming.push(body.pledge)
        if (Array.isArray(body.pledges)) {
          for (const item of body.pledges) {
            if (isValidPledge(item)) incoming.push(item)
          }
        }
        merged = dedupePledges([...incoming, ...merged])
        writeLocalFile(merged)
        await pushCloudPledges(merged)
        res.statusCode = 200
        res.end(JSON.stringify({ pledges: merged }))
      } catch {
        res.statusCode = 400
        res.end(JSON.stringify({ pledges: merged }))
      }
      return
    }

    res.statusCode = 405
    res.end(JSON.stringify({ pledges: merged }))
  }

  return {
    name: 'wall-of-action-api',
    configResolved(config) {
      const env = loadEnv(config.mode, process.cwd(), '')
      siteId = env.NETLIFY_SITE_ID ?? ''
      blobsToken = env.NETLIFY_BLOBS_TOKEN ?? ''
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        void handler(req, res, next)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        void handler(req, res, next)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wallOfActionPlugin()],
})
