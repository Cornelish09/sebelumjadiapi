const SITE_ID = process.env.NETLIFY_SITE_ID || 'c4c36bcb-5426-48a9-854b-37e088715b9f'

function isValidPledge(item) {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    item.id.trim().length > 0 &&
    typeof item.name === 'string' &&
    item.name.trim().length > 0 &&
    typeof item.city === 'string' &&
    item.city.trim().length > 0 &&
    typeof item.promise === 'string' &&
    item.promise.trim().length > 0
  )
}

function dedupePledges(list) {
  const seen = new Set()
  const result = []
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

function getBlobsConfig() {
  if (process.env.NETLIFY_BLOBS_CONTEXT) {
    try {
      const ctx = JSON.parse(Buffer.from(process.env.NETLIFY_BLOBS_CONTEXT, 'base64').toString('utf8'))
      if (ctx.edgeURL && ctx.token) {
        return {
          url: `${ctx.edgeURL.replace(/\/$/, '')}/${ctx.siteID || SITE_ID}/site:wall/pledges`,
          token: ctx.token,
        }
      }
    } catch {
      // Fallback ke API Netlify standar
    }
  }
  return {
    url: `https://api.netlify.com/api/v1/blobs/${SITE_ID}/site:wall/pledges`,
    token: process.env.NETLIFY_BLOBS_TOKEN || '',
  }
}

async function readCloudPledges() {
  const { url, token } = getBlobsConfig()
  if (!token) return []
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? dedupePledges(data) : []
  } catch {
    return []
  }
}

async function writeCloudPledges(entries) {
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
    // Abaikan kegagalan jaringan sementara
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

  let current = await readCloudPledges()

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ pledges: current }),
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}')
      const incoming = []
      if (isValidPledge(body.pledge)) incoming.push(body.pledge)
      if (Array.isArray(body.pledges)) {
        for (const item of body.pledges) {
          if (isValidPledge(item)) incoming.push(item)
        }
      }
      current = dedupePledges([...incoming, ...current])
      await writeCloudPledges(current)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ pledges: current }),
      }
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ pledges: current }),
      }
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ pledges: current }),
  }
}
