import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {createServer} from 'vite'

const server = await createServer({server: {middlewareMode: true}, appType: 'custom'})
try {
  const {ecosystemNodes, ecosystemWebEdges, ecosystemWorldVisual} = await server.ssrLoadModule(
    '/src/content/ecosystemWeb.ts',
  )
  const {forestStory} = await server.ssrLoadModule('/src/content/forestStory.ts')
  const {factSources} = await server.ssrLoadModule('/src/content/whyItMatters.ts')
  const {campaignLinks} = await server.ssrLoadModule('/src/content/campaignParticipation.ts')
  const {hotspotSeedClip, openMorphClip} = await server.ssrLoadModule(
    '/src/features/why-it-matters/morphClip.ts',
  )

  // 1. Pastikan 4 bagian berurutan punya visual & cerita terpisah untuk kondisi utuh vs kondisi rusak
  assert.equal(ecosystemNodes.length, 4)
  assert.equal(new Set(ecosystemNodes.map(n => n.id)).size, 4)
  const storyTitles = new Set(forestStory.map(s => s.title))
  for (const node of ecosystemNodes) {
    assert.ok(!storyTitles.has(node.title), `Judul tidak boleh mengulang ForestStory: ${node.title}`)
    assert.NotEqual?.(node.title, node.brokenTitle)
    assert.ok(node.title !== node.brokenTitle, `Judul utuh vs rusak harus beda: ${node.id}`)
    assert.ok(node.lead !== node.brokenLead, `Lead utuh vs rusak harus beda: ${node.id}`)
    assert.ok(node.shortRole !== node.brokenRole, `Role utuh vs rusak harus beda: ${node.id}`)
    assert.ok(node.bridgeText !== node.brokenBridgeText, `Bridge utuh vs rusak harus beda: ${node.id}`)
    assert.ok(node.backImage !== node.brokenBackImage, `Backplate utuh vs rusak harus beda: ${node.id}`)
    assert.ok(node.frontImage !== node.brokenFrontImage, `Cutout utuh vs rusak harus beda: ${node.id}`)
    for (const imgPath of [
      node.backImage,
      node.frontImage,
      node.brokenBackImage,
      node.brokenFrontImage,
    ]) {
      assert.ok(imgPath.startsWith('/assets/images/why-it-matters/ecosystem/'))
      assert.ok(fs.existsSync(path.join('public', imgPath)), `File aset hilang: ${imgPath}`)
    }
    const src = factSources.find(f => f.id === node.sourceId)
    assert.ok(src && src.verificationStatus === 'verified', `Sumber tidak terverifikasi: ${node.sourceId}`)
  }
  assert.ok(fs.existsSync(path.join('public', ecosystemWorldVisual.image)))
  assert.ok(fs.existsSync(path.join('public', ecosystemWorldVisual.brokenImage)))
  assert.ok(ecosystemWorldVisual.image !== ecosystemWorldVisual.brokenImage)
  assert.equal(ecosystemWebEdges.length, 4)

  // 2. Pastikan poligon morph selalu 16 titik agar transisi clip-path mulus
  const countVertices = str => str.replace(/^polygon\(/, '').replace(/\)$/, '').split(',').length
  for (let i = 0; i < ecosystemNodes.length; i++) {
    const n = ecosystemNodes[i]
    assert.equal(countVertices(hotspotSeedClip(n.x, n.y)), 16, `Seed polygon harus 16 titik: ${n.id}`)
    assert.equal(countVertices(openMorphClip(n.x, n.y, i)), 16, `Open polygon harus 16 titik: ${n.id}`)
    assert.equal(countVertices(hotspotSeedClip(n.brokenX, n.brokenY)), 16)
    assert.equal(countVertices(openMorphClip(n.brokenX, n.brokenY, i)), 16)
  }

  // 3. Uji SSR komponen yang diperbarui & pastikan tautan webinar serta placeholder Tantang Temanmu sesuai
  const {ForestConnections} = await server.ssrLoadModule(
    '/src/features/why-it-matters/ForestConnections.tsx',
  )
  const {SourceLink} = await server.ssrLoadModule('/src/features/why-it-matters/SourceLink.tsx')
  const {MakeItPersonal} = await server.ssrLoadModule(
    '/src/features/make-it-personal/MakeItPersonal.tsx',
  )
  const {StayInMovement} = await server.ssrLoadModule(
    '/src/features/stay-in-movement/StayInMovement.tsx',
  )
  const {InviteMission} = await server.ssrLoadModule(
    '/src/features/take-action/InviteMission.tsx',
  )
  const {PendingLink} = await server.ssrLoadModule(
    '/src/features/campaign-actions/Controls.tsx',
  )

  const connectionsHtml = renderToStaticMarkup(React.createElement(ForestConnections))
  for (const snippet of [
    'id="forest-connections"',
    'why-eco-web',
    'why-morph-layer',
    'why-morph-front',
    'eco-world-broken.webp',
    'Saat Hutan Utuh',
    'Jika Satu Bagian Rusak',
    'Mulai dari 01 Tajuk Pohon',
    'Tajuk Pohon',
    'Burung Rangkong',
    'Akar &amp; Jamur Tanah',
    'Air Gambut',
  ]) {
    assert.ok(connectionsHtml.includes(snippet), `SSR ForestConnections kekurangan: ${snippet}`)
  }
  for (const forbidden of [
    'Buka morph',
    'Morph ke',
    'Observatorium 2.5D',
    '(tab baru)',
    'Lapisan 01',
    'Lapisan 02',
    'Lapisan 03',
    'Lapisan 04',
    'Koridor terbang',
    'why-sim-dot',
    'why-stage-caption',
    'why-scene-bottom-hint',
    'why-hover-readout',
    '—',
  ]) {
    assert.ok(!connectionsHtml.includes(forbidden), `Elemen/teks terlarang masih muncul: ${forbidden}`)
  }

  const cssText = fs.readFileSync(
    path.join('src', 'features', 'why-it-matters', 'forestConnections.css'),
    'utf8',
  )
  assert.ok(!cssText.includes('pulseRing'), 'Tidak boleh ada animasi pulseRing yang berdenyut')
  assert.ok(cssText.includes('min-height: 100%'), 'Panel kanan harus terkunci tingginya mengikuti frame 16:9')
  assert.ok(cssText.includes('overflow-y: auto'), 'Kotak detail harus scroll di dalam tanpa memanjangkan frame')

  const sourceHtml = renderToStaticMarkup(React.createElement(SourceLink, {id: 'canopy-microclimate'}))
  assert.ok(!sourceHtml.includes('(tab baru)'), 'SourceLink tidak boleh menampilkan teks (tab baru)')
  assert.ok(sourceHtml.includes('FAO · Baca sumber'), 'SourceLink label harus rapi')

  assert.equal(
    campaignLinks.webinar,
    'https://www.instagram.com/wwf_id?dlrf=MWRyN21qbzJlZHRocw==',
    'Tautan webinar harus mengarah ke Instagram @wwf_id',
  )
  const webinarBtnHtml = renderToStaticMarkup(
    React.createElement(PendingLink, {
      label: 'Lihat jadwal webinar',
      url: campaignLinks.webinar,
      hideArrow: true,
    }),
  )
  assert.ok(webinarBtnHtml.includes('>Lihat jadwal webinar</a>'), 'Tombol jadwal webinar harus tanpa panah')
  assert.ok(!webinarBtnHtml.includes('↗'), 'Tombol jadwal webinar tidak boleh ada panah ↗')

  const inviteHtml = renderToStaticMarkup(React.createElement(InviteMission, {count: 3}))
  assert.ok(inviteHtml.includes('placeholder="Misal : nayezz"'), 'Placeholder Tantang Temanmu harus Misal : nayezz')

  const personalHtml = renderToStaticMarkup(React.createElement(MakeItPersonal))
  assert.ok(
    !personalHtml.includes('Konversi WebP; crop responsif dan overlay tampilan, tanpa edit generatif.'),
    'Teks perubahan foto di MakeItPersonal harus terhapus',
  )

  const stayHtml = renderToStaticMarkup(React.createElement(StayInMovement))
  assert.ok(!stayHtml.includes('Demo lokal. Email tidak dikirim.'), 'Teks Demo lokal di StayInMovement harus terhapus')

  console.log(
    'PASS: 18 ecosystem assets (9 intact + 9 broken), distinct intact/broken storytelling, webinar link without arrow, Misal : nayezz placeholder, locked card/frame height',
  )
} finally {
  await server.close()
}
