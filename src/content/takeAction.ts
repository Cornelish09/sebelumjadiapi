const verifiedOn = '2026-11-12'

export const actionSources = {
  peat: { url: 'https://www.wwf.id/id/blog/cegah-kebakaran-lahan-dengan-gambut', label: 'WWF Indonesia · Menyelamatkan gambut', period: 'Penjelasan pencegahan', verifiedOn },
  smoke: { url: 'https://www.wwf.id/id/blog/kabut-asap-dan-lahan-gambut-yang-terabaikan', label: 'WWF Indonesia · Kabut asap dan gambut', period: 'Konteks gambut Indonesia', verifiedOn },
  unep: { url: 'https://www.unep.org/en/news-and-stories/story/why-peatlands-matter', label: 'UNEP · Mengapa gambut penting', period: 'Penjelasan ekologis umum', verifiedOn },
  hotspots: { url: 'https://www.kehutanan.go.id/pers/zona-merah-turun-drastis-kemenhut-terus-fokus-operasi-karhutla', label: 'Kementerian Kehutanan · Arti titik panas', period: 'Rilis 4 September 2026', verifiedOn },
  sipongi: { url: 'https://sipongi.gakkum.kehutanan.go.id/peta', label: 'SiPongi+ · Kementerian Kehutanan', period: 'Periode yang dipilih di peta SiPongi+', verifiedOn },
}
export const actionRows = [
  { id: 'learn', label: 'Learn', title: 'Fakta atau Mitos?', cta: 'Mulai Tebak', time: '± 90 detik', image: '/assets/images/why-it-matters/peat-carbon.webp' },
  { id: 'check', label: 'Check', title: 'Cek Sebelum Percaya', cta: 'Bedah Postingan', time: '± 45 detik', image: '/assets/images/campaign-actions/check-viral-back.webp' },
  { id: 'share', label: 'Share', title: 'Bagikan Satu Fakta', cta: 'Pilih Kartu Fakta', time: '± 45 detik', image: '/assets/images/campaign-actions/facts/hotspot.webp' },
  { id: 'join', label: 'Join', title: 'Ikut Kegiatan', cta: 'Lihat Kegiatan', time: '± 60 detik', image: '/assets/images/campaign-actions/join-panda-mobile.webp' },
  { id: 'invite', label: 'Invite', title: 'Tantang Temanmu', cta: 'Buat Tantangan', time: '± 30 detik', image: '/assets/images/campaign-actions/invite-teman.webp' },
] as const
export type MissionId = typeof actionRows[number]['id']

export const quiz = [
  { statement: 'Menjaga gambut tetap basah membantu mencegah kebakaran meluas.', fact: true, reason: 'Gambut yang tetap lembap lebih sulit terbakar daripada gambut yang sudah mengering.', source: actionSources.peat },
  { statement: 'Cuaca panas sendiri menjelaskan semua kebakaran lahan gambut.', fact: false, reason: 'Pengeringan gambut dan penyalaan untuk pembukaan lahan juga dapat berperan.', source: actionSources.unep },
  { statement: 'Api gambut bisa merambat di bawah permukaan tanah.', fact: true, reason: 'Gambut kering dapat membara di bawah tanah sehingga apinya sulit dideteksi.', source: actionSources.unep, related: actionSources.smoke },
  { statement: 'Setiap titik panas di peta membuktikan ada kebakaran aktif.', fact: false, reason: 'Hotspot adalah indikasi dari satelit dan masih perlu dikonfirmasi.', source: actionSources.hotspots },
  { statement: 'Gambut menyimpan karbon dalam lapisan bahan organik.', fact: true, reason: 'Tumpukan bahan organik yang terbentuk dalam waktu lama menyimpan banyak karbon.', source: actionSources.unep },
] as const

export const verificationChecklist = [
  {
    id: 'source',
    pinLabel: '01 · Sumber',
    title: 'Siapa yang menyebarkan?',
    claim: 'Akun anonim: "Kiriman berantai grup — wajib sebar sekarang!"',
    verdict: 'Jangan langsung percaya akun repost.',
    text: 'Akun terusan sering memotong konteks biar ramai. Cek langsung di SiPongi+ Kemenhut atau kanal resmi @wwf_id.',
    x: 78,
    y: 29,
  },
  {
    id: 'time',
    pinLabel: '02 · Waktu',
    title: 'Kapan foto itu diambil?',
    claim: 'Keterangan: "Kondisi sore ini di lapangan!" (tanpa tanggal jelas)',
    verdict: 'Waspada foto lama yang didaur ulang.',
    text: 'Foto kebakaran besar tahun 2015 atau 2019 sering diunggah ulang tiap kemarau seolah baru kejadian hari ini.',
    x: 54,
    y: 48,
  },
  {
    id: 'satellite',
    pinLabel: '03 · Satelit',
    title: 'Apa arti angka titik panas?',
    claim: 'Judul klaim: "500 titik panas = 500 lokasi hutan sudah terbakar!"',
    verdict: '1 titik panas bukan berarti 1 titik api.',
    text: 'Satelit membaca suhu panas permukaan (hotspot), bukan vonis kebakaran. Pastinya tetap dicek lewat tingkat kepercayaan di peta resmi.',
    x: 72,
    y: 70,
  },
] as const

export const provinces = [
  'Aceh','Sumatera Utara','Sumatera Barat','Riau','Kepulauan Riau','Jambi','Sumatera Selatan','Bengkulu','Kepulauan Bangka Belitung','Lampung',
  'Banten','DKI Jakarta','Jawa Barat','Jawa Tengah','DI Yogyakarta','Jawa Timur','Bali','Nusa Tenggara Barat','Nusa Tenggara Timur',
  'Kalimantan Barat','Kalimantan Tengah','Kalimantan Selatan','Kalimantan Timur','Kalimantan Utara',
  'Sulawesi Utara','Gorontalo','Sulawesi Tengah','Sulawesi Barat','Sulawesi Selatan','Sulawesi Tenggara','Maluku','Maluku Utara',
  'Papua','Papua Barat','Papua Barat Daya','Papua Tengah','Papua Pegunungan','Papua Selatan',
] as const

const factImages = '/assets/images/campaign-actions/facts'

export const factCards = [
  {
    id: 'water', label: 'Air', title: 'Gambut aman selama airnya dijaga.',
    detail: 'Lahan gambut bekerja seperti spons raksasa. Sekali airnya dikuras kanal, seratnya mengering dan satu percikan kecil cukup menyulut api.',
    source: actionSources.peat, image: `${factImages}/air-back.webp`, foreground: `${factImages}/air-front.webp`, accent: '#a7e4cb',
  },
  {
    id: 'embers', label: 'Bara', title: 'Asapnya reda, bukan berarti apinya mati.',
    detail: 'Di tanah gambut, bara bisa terus merayap di bawah kaki tanpa nyala terlihat. Saat permukaan dikira aman, bara diam-diam menunggu angin.',
    source: actionSources.unep, image: `${factImages}/bara-back.webp`, foreground: `${factImages}/bara-front.webp`, accent: '#ffc29d',
  },
  {
    id: 'hotspots', label: 'Hotspot', title: 'Satu titik di peta belum tentu kebakaran.',
    detail: 'Sensor satelit cuma membaca suhu panas, bukan vonis kejadian. Biasakan cek tanggal, lokasi, dan sumber resmi sebelum meneruskan ke grup.',
    source: actionSources.hotspots, image: `${factImages}/hotspot-back.webp`, foreground: `${factImages}/hotspot-front.webp`, accent: '#b6d9fc',
  },
] as const

export const programs = [
  {
    label: 'Aksi Edukasi Lapangan',
    tab: 'Panda Mobile',
    title: 'Volunteer Panda Mobile',
    detail: 'Turun langsung ke sekolah dan ruang publik bareng tim edukasi lapangan. Bawa cerita hutan dan gambut ke anak-anak biar kepedulian tumbuh jauh sebelum bencana datang.',
    url: 'https://www.wwf.id/id/id/volunteer',
    image: '/assets/images/campaign-actions/join-panda-mobile.webp',
    credit: 'Dokumentasi Volunteer · WWF Indonesia (wwf.id)',
  },
  {
    label: 'Gerakan Komunitas Kota',
    tab: 'Earth Hour',
    title: 'Youth Activist / Earth Hour',
    detail: 'Nggak harus pergi ke pedalaman buat ikut menjaga hutan. Kumpul bareng anak muda di kotamu buat ngulik kampanye kreatif, diskusi publik, sampai aksi kolektif bareng.',
    url: 'https://www.wwf.id/id/act/campaign/earth-hour',
    image: '/assets/images/campaign-actions/join-earth-hour.webp',
    credit: 'Dokumentasi Earth Hour · Dika Yudha Rio / WWF Indonesia (wwf.id)',
  },
  {
    label: 'Forum & Ruang Diskusi',
    tab: 'Bincang Konservasi',
    title: 'Webinar & Bincang Konservasi',
    detail: 'Bedah langsung cerita dari balik riset gambut, kondisi lapangan, sampai strategi komunikasi publik bareng pegiatnya. Jadwal ikut diumumkan lewat kanal resmi WWF Indonesia.',
    url: null,
    image: '/assets/images/campaign-actions/join-webinar.webp',
    credit: null,
  },
] as const

