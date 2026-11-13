/**
 * Materi alur berurutan 4 bagian hutan yang saling menjaga sebelum api muncul,
 * lengkap dengan perbandingan visual & cerita antara kondisi utuh dan kondisi rusak.
 */
export type EcosystemNodeId = 'canopy' | 'hornbill' | 'mycorrhiza' | 'peatdome'

export interface EcosystemLinkEdge {
  from: EcosystemNodeId
  to: EcosystemNodeId
  process: string
  disruptionRisk: string
}

export interface EcosystemNode {
  id: EcosystemNodeId
  number: string
  label: string
  shortRole: string
  brokenRole: string
  title: string
  brokenTitle: string
  lead: string
  brokenLead: string
  x: number
  y: number
  brokenX: number
  brokenY: number
  backImage: string
  backAlt: string
  frontImage: string
  frontAlt: string
  brokenBackImage: string
  brokenBackAlt: string
  brokenFrontImage: string
  brokenFrontAlt: string
  detailIntact: string
  detailBroken: string
  bridgeText: string
  brokenBridgeText: string
  indicators: [string, string]
  brokenIndicators: [string, string]
  sourceId: string
}

export const ecosystemWorldVisual = {
  image: '/assets/images/why-it-matters/ecosystem/eco-world.webp',
  alt: 'Penampang hutan tropis dan rawa gambut utuh dari tajuk pohon, burung rangkong, akar permukaan, sampai air di bawah tanah gambut.',
  brokenImage: '/assets/images/why-it-matters/ecosystem/eco-world-broken.webp',
  brokenAlt:
    'Penampang hutan dan rawa gambut yang rusak: tajuk pohon berlubang diterobos panas matahari, dahan kosong tanpa burung rangkong, akar kering meranggas, dan kanal yang menguras air gambut hingga muncul bara bawah tanah.',
}

export const ecosystemWebEdges: EcosystemLinkEdge[] = [
  {
    from: 'canopy',
    to: 'hornbill',
    process: 'Pohon yang rimbun menyediakan buah dan tempat bersarang bagi burung rangkong.',
    disruptionRisk: 'Ketika pohon ditebang, rangkong kehilangan sumber pakan dan tempat tinggal.',
  },
  {
    from: 'hornbill',
    to: 'mycorrhiza',
    process: 'Biji yang disebar rangkong tumbuh menjadi pohon baru yang menguatkan jaringan akar di tanah.',
    disruptionRisk: 'Saat rangkong menghilang, bibit pohon baru jarang tumbuh dan jaringan akar ikut melemah.',
  },
  {
    from: 'mycorrhiza',
    to: 'peatdome',
    process: 'Anyaman akar dan jamur menjaga tanah di atas gambut tetap rapat dan lembap.',
    disruptionRisk: 'Tanah yang terbuka dan panas membuat permukaan gambut di bawahnya cepat mengering.',
  },
  {
    from: 'peatdome',
    to: 'canopy',
    process: 'Cadangan air di tanah gambut menghidupi seluruh pohon besar di atasnya.',
    disruptionRisk: 'Begitu air gambut terkuras lewat kanal, pohon besar kekurangan air dan meranggas.',
  },
]

export const ecosystemNodes: EcosystemNode[] = [
  {
    id: 'canopy',
    number: '01',
    label: 'Tajuk Pohon',
    shortRole: 'Menahan terik matahari',
    brokenRole: 'Atap hutan terbuka',
    title: 'Payung teduh penjaga lembap hutan.',
    brokenTitle: 'Atap terbuka, lantai hutan terpanggang.',
    lead: 'Daun rapat di puncak pohon menahan panas matahari dan angin.',
    brokenLead: 'Celah tebangan membiarkan terik matahari langsung menyengat tanah.',
    x: 23,
    y: 28,
    brokenX: 35,
    brokenY: 20,
    backImage: '/assets/images/why-it-matters/ecosystem/canopy-back.webp',
    backAlt: 'Sudut pandang dari bawah memandang tajuk pohon hutan hujan yang rapat dan sejuk.',
    frontImage: '/assets/images/why-it-matters/ecosystem/canopy-front.webp',
    frontAlt: 'Dahan berlumut dengan pakis dan dedaunan hijau lembap.',
    brokenBackImage: '/assets/images/why-it-matters/ecosystem/canopy-broken-back.webp',
    brokenBackAlt: 'Celah tajuk hutan yang terbuka akibat penebangan dengan sinar matahari terik menyengat.',
    brokenFrontImage: '/assets/images/why-it-matters/ecosystem/canopy-broken-front.webp',
    brokenFrontAlt: 'Dahan kayu kering dengan daun pakis dan lumut yang layu kecokelatan.',
    detailIntact:
      'Udara bawah pohon tetap sejuk sehingga serasah daun di lantai hutan selalu basah.',
    detailBroken:
      'Suhu lantai hutan naik cepat; lumut dan daun gugur mengering jadi bahan bakar.',
    bridgeText:
      '→ Pohon yang rimbun menjadi rumah dan sumber buah bagi Burung Rangkong.',
    brokenBridgeText:
      '→ Pohon buah hilang, Burung Rangkong pun kehilangan tempat tinggal.',
    indicators: [
      'Udara bawah pohon sejuk dan serasah daun terasa basah.',
      'Lumut serta pakis tumbuh subur di dahan.',
    ],
    brokenIndicators: [
      'Sinar matahari menyengat langsung ke lantai hutan.',
      'Pakis dan lumut di batang mengering kecokelatan.',
    ],
    sourceId: 'canopy-microclimate',
  },
  {
    id: 'hornbill',
    number: '02',
    label: 'Burung Rangkong',
    shortRole: 'Menyebar biji pohon',
    brokenRole: 'Penebar biji hilang',
    title: 'Penebar benih pohon penerus.',
    brokenTitle: 'Rangkong pergi, regenerasi pohon terhenti.',
    lead: 'Rangkong memakan buah hutan lalu menyebarkan bijinya saat terbang.',
    brokenLead: 'Tanpa pohon besar, rangkong pindah dan tak lagi menyebar biji.',
    x: 61.5,
    y: 16.5,
    brokenX: 82.5,
    brokenY: 21,
    backImage: '/assets/images/why-it-matters/ecosystem/hornbill-back.webp',
    backAlt: 'Hamparan pucuk pohon tinggi berkabut saat pagi hari di Kalimantan.',
    frontImage: '/assets/images/why-it-matters/ecosystem/hornbill-front.webp',
    frontAlt: 'Burung rangkong badak bertengger di dahan berlumut dekat buah ara liar.',
    brokenBackImage: '/assets/images/why-it-matters/ecosystem/hornbill-broken-back.webp',
    brokenBackAlt: 'Lanskap tajuk hutan yang rusak dan berkabut gelap dengan siluet rangkong terbang menjauh.',
    brokenFrontImage: '/assets/images/why-it-matters/ecosystem/hornbill-broken-front.webp',
    brokenFrontAlt: 'Lubang sarang pohon yang kosong dan dahan kering dengan buah ara keriput serta bulu rangkong yang tertinggal.',
    detailIntact:
      'Biji yang jatuh tumbuh menjadi pohon baru yang menjaga atap hutan tetap rapat.',
    detailBroken:
      'Buah mengering di tangkai; celah hutan gagal tumbuh dan dipenuhi semak kering.',
    bridgeText:
      '→ Tunas pohon baru menguatkan jaringan Akar & Jamur Tanah.',
    brokenBridgeText:
      '→ Tanpa pohon muda, jaringan Akar & Jamur Tanah ikut melemah.',
    indicators: [
      'Rangkong aktif di antara pohon tinggi yang berbuah.',
      'Bibit pohon baru tumbuh tersebar jauh dari pohon induk.',
    ],
    brokenIndicators: [
      'Lubang sarang kosong dan buah hutan mengering di dahan.',
      'Lahan terbuka dipenuhi belukar kering, bukan tunas pohon.',
    ],
    sourceId: 'hornbill-dispersal',
  },
  {
    id: 'mycorrhiza',
    number: '03',
    label: 'Akar & Jamur Tanah',
    shortRole: 'Mengikat air & tanah',
    brokenRole: 'Akar kering & tanah retak',
    title: 'Pengikat air dan nutrisi tanah.',
    brokenTitle: 'Jamur mati, tanah pecah dan kering.',
    lead: 'Akar pohon bersimbiosis dengan benang jamur halus (mikoriza) di tanah.',
    brokenLead: 'Panas berlebih mematikan benang jamur penyuplai air bagi akar.',
    x: 27,
    y: 66,
    brokenX: 20,
    brokenY: 68,
    backImage: '/assets/images/why-it-matters/ecosystem/mycorrhiza-back.webp',
    backAlt: 'Foto dekat akar gelap yang terbungkus serabut jamur mikoriza berwarna keemasan.',
    frontImage: '/assets/images/why-it-matters/ecosystem/mycorrhiza-front.webp',
    frontAlt: 'Akar pohon berbalut jaring halus jamur mikoriza.',
    brokenBackImage: '/assets/images/why-it-matters/ecosystem/mycorrhiza-broken-back.webp',
    brokenBackAlt: 'Latar bawah tanah hutan yang gelap dan gersang akibat kekeringan.',
    brokenFrontImage: '/assets/images/why-it-matters/ecosystem/mycorrhiza-broken-front.webp',
    brokenFrontAlt: 'Penampang tanah retak dengan akar pohon pucat yang rapuh dan serabut jamur mikoriza yang mati mengelupas.',
    detailIntact:
      'Benang jamur membantu akar menyerap air dan menjaga tanah tetap gembur.',
    detailBroken:
      'Akar mengering rapuh; tanah permukaan mengeras, pecah-pecah, dan lepas lembap.',
    bridgeText:
      '→ Tanah yang rapat melindungi cadangan Air Gambut di bawahnya.',
    brokenBridgeText:
      '→ Retakan tanah mempercepat Air Gambut di bawahnya menguap.',
    indicators: [
      'Serabut jamur putih-emas menyelimuti ujung akar.',
      'Tanah terasa gembur, basah, dan menyatu rapat.',
    ],
    brokenIndicators: [
      'Akar pucat rapuh dan selaput jamurnya mengelupas mati.',
      'Permukaan tanah mengeras, berdebu, dan retak lebar.',
    ],
    sourceId: 'mycorrhiza-soil',
  },
  {
    id: 'peatdome',
    number: '04',
    label: 'Air Gambut',
    shortRole: 'Merendam tanah gambut',
    brokenRole: 'Air surut & membara',
    title: 'Spons raksasa pengunci karbon.',
    brokenTitle: 'Air terkuras, bara menyala di bawah tanah.',
    lead: 'Tanah gambut menyimpan air yang merendam sisa tumbuhan ribuan tahun.',
    brokenLead: 'Kanal pengeringan menguras air rawa hingga lapisan gambut mengering.',
    x: 54,
    y: 86,
    brokenX: 58,
    brokenY: 84,
    backImage: '/assets/images/why-it-matters/ecosystem/peatdome-back.webp',
    backAlt: 'Penampang rawa gambut basah dengan genangan air tanah gelap kecokelatan di bawahnya.',
    frontImage: '/assets/images/why-it-matters/ecosystem/peatdome-front.webp',
    frontAlt: 'Potongan tanah gambut basah penuh serat kayu dan lumut hijau di atasnya.',
    brokenBackImage: '/assets/images/why-it-matters/ecosystem/peatdome-broken-back.webp',
    brokenBackAlt: 'Saluran kanal pengeringan gambut dengan air yang surut jauh dan kabut asap gelap.',
    brokenFrontImage: '/assets/images/why-it-matters/ecosystem/peatdome-broken-front.webp',
    brokenFrontAlt: 'Penampang tebing gambut kering yang retak dengan bara api merah-oranye menyala di sela serat kayu bawah tanah.',
    detailIntact:
      'Selama terendam air, simpanan karbon terkunci dan api tak bisa membara.',
    detailBroken:
      'Serat gambut kering mudah tersulut dan membara di bawah tanah berminggu-minggu.',
    bridgeText:
      '→ Cadangan air ini kembali menghidupi akar hingga ke Tajuk Pohon.',
    brokenBridgeText:
      '→ Bara bawah tanah membakar akar dan meruntuhkan Tajuk Pohon.',
    indicators: [
      'Air rawa cokelat jernih setinggi permukaan gambut.',
      'Tanah gambut terasa basah dan membal saat dipijak.',
    ],
    brokenIndicators: [
      'Air kanal surut jauh dan dinding gambut kering keropos.',
      'Bara merah dan asap tipis muncul dari celah tanah.',
    ],
    sourceId: 'peatdome-hydrology',
  },
]
