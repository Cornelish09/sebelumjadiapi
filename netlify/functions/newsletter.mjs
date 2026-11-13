const SITE_ID = process.env.NETLIFY_SITE_ID || 'c4c36bcb-5426-48a9-854b-37e088715b9f'

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) && value.trim().length <= 254
}

function normalizeSubscribers(list) {
  const seen = new Set()
  const out = []
  if (!Array.isArray(list)) return out
  for (const item of list) {
    const email = typeof item === 'string' ? item : item?.email
    if (!isValidEmail(email)) continue
    const clean = email.trim().toLowerCase()
    if (seen.has(clean)) continue
    seen.add(clean)
    out.push({
      email: clean,
      subscribedAt: typeof item?.subscribedAt === 'string' ? item.subscribedAt : new Date().toISOString(),
    })
  }
  return out.slice(0, 500)
}

function getBlobsConfig() {
  if (process.env.NETLIFY_BLOBS_CONTEXT) {
    try {
      const ctx = JSON.parse(Buffer.from(process.env.NETLIFY_BLOBS_CONTEXT, 'base64').toString('utf8'))
      if (ctx.edgeURL && ctx.token) {
        return {
          url: `${ctx.edgeURL.replace(/\/$/, '')}/${ctx.siteID || SITE_ID}/site:wall/newsletter`,
          token: ctx.token,
        }
      }
    } catch {
      // Fallback ke API Netlify standar
    }
  }
  return {
    url: `https://api.netlify.com/api/v1/blobs/${SITE_ID}/site:wall/newsletter`,
    token: process.env.NETLIFY_BLOBS_TOKEN || '',
  }
}

async function readCloudSubscribers() {
  const { url, token } = getBlobsConfig()
  if (!token) return []
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return []
    const data = await res.json()
    return normalizeSubscribers(data)
  } catch {
    return []
  }
}

async function writeCloudSubscribers(entries) {
  const { url, token } = getBlobsConfig()
  if (!token) return
  try {
    await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entries),
    })
  } catch {
    // Fallback gracefully
  }
}

export async function handler(event) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  const current = await readCloudSubscribers()

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, count: current.length }),
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}')
      const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
      if (!isValidEmail(rawEmail)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ ok: false, status: 'invalid', count: current.length }),
        }
      }
      const exists = current.some(item => item.email === rawEmail)
      const updated = exists
        ? current
        : normalizeSubscribers([{ email: rawEmail, subscribedAt: new Date().toISOString() }, ...current])
      if (!exists) {
        await writeCloudSubscribers(updated)
      }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ok: true,
          status: exists ? 'already_subscribed' : 'subscribed',
          count: updated.length,
        }),
      }
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, status: 'error', count: current.length }),
      }
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ ok: false, count: current.length }),
  }
}
