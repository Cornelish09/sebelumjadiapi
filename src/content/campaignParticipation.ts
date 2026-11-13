export const campaignHashtag = '#SebelumJadiApi'

const pledgeImages = '/assets/images/campaign-actions/pledges'

export const pledges = [
  {
    id: 'verify',
    label: 'Cek fakta karhutla',
    text: 'Aku janji selalu cek fakta karhutla.',
    image: `${pledgeImages}/verify-back.webp`,
    foreground: `${pledgeImages}/verify-front.webp`,
    accent: '#b2e6da',
  },
  {
    id: 'water',
    label: 'Jaga gambut tetap basah',
    text: 'Aku dukung gambut tetap basah.',
    image: `${pledgeImages}/water-back.webp`,
    foreground: `${pledgeImages}/water-front.webp`,
    accent: '#d5e1a6',
  },
  {
    id: 'share',
    label: 'Bagikan informasi tepercaya',
    text: 'Aku akan berbagi informasi dari sumber tepercaya.',
    image: `${pledgeImages}/share-back.webp`,
    foreground: `${pledgeImages}/share-front.webp`,
    accent: '#eed0b1',
  },
] as const

export const pledgeOptions = pledges.map(({ text }) => text)
export const fieldActionImage = `${pledgeImages}/field.webp`

export const fieldActionPosts = [
  {
    id: 'garda-karhutla',
    shortcode: 'Dfl2ALSlBIr',
    url: 'https://www.instagram.com/p/Dfl2ALSlBIr/?utm_source=ig_web_copy_link&xtok=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/p/Dfl2ALSlBIr/embed/',
    caption: 'Garda terdepan pemadaman karhutla di Kalimantan, Papua, dan Sumatra.',
  },
  {
    id: 'asap-palangkaraya',
    shortcode: 'DfZwRZ3kwrM',
    url: 'https://www.instagram.com/p/DfZwRZ3kwrM/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/p/DfZwRZ3kwrM/embed/',
    caption: 'Darurat kabut asap pekat dan kemunculan titik api di Palangka Raya.',
  },
  {
    id: 'penyintas-api',
    shortcode: 'DfOU2JFE5wo',
    url: 'https://www.instagram.com/p/DfOU2JFE5wo/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/p/DfOU2JFE5wo/embed/',
    caption: 'Orangutan penyintas kobaran api yang kehilangan ruang hidup di Kalimantan.',
  },
] as const

// Tautan diisi setelah materi akun dan unggahan disetujui.
export const campaignLinks: Record<'instagram' | 'tiktok' | 'checkPost' | 'fieldPost' | 'webinar', string | null> = {
  instagram: 'https://www.instagram.com/wwf_1ndonesia?exln=N2V5OGY3NGRscTcy&utm_source=qr',
  tiktok: 'https://www.tiktok.com/@wwf_1ndonesia?_r=1&_t=ZS-9BKZTr2S2di',
  checkPost: 'https://www.instagram.com/p/DfZwRZ3kwrM/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA==',
  fieldPost: 'https://www.instagram.com/p/Dfl2ALSlBIr/?utm_source=ig_web_copy_link&xtok=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
  webinar: 'https://www.instagram.com/wwf_id?dlrf=MWRyN21qbzJlZHRocw==',
}

export const movementLink = {
  url: 'https://membership.wwf.id/id',
  verifiedOn: '2026-11-12',
  price: 'Mulai Rp10.000/bulan',
}

