const directory = '/assets/images/campaign-actions/keeper'

export const keeperTemplates = [
  {
    id: 'kanopi', label: 'Kanopi', role: 'Penjaga Kanopi',
    story: 'Memilih menjaga teduhnya hutan sebelum langit berubah kelabu oleh asap.',
    image: `${directory}/kanopi.webp`, foreground: `${directory}/kanopi-front.webp`, accent: '#d4eca3',
  },
  {
    id: 'arus', label: 'Arus', role: 'Penjaga Tata Air',
    story: 'Percaya pencegahan dimulai dari air yang bertahan di kanal dan tanah gambut.',
    image: `${directory}/arus.webp`, foreground: `${directory}/arus-front.webp`, accent: '#a9e3f7',
  },
  {
    id: 'serat', label: 'Serat', role: 'Penjaga Tanah Gambut',
    story: 'Di bawah kaki kita tersimpan ribuan tahun kehidupan yang tak layak jadi abu.',
    image: `${directory}/serat.webp`, foreground: `${directory}/serat-front.webp`, accent: '#ffd0a1',
  },
  {
    id: 'fajar', label: 'Fajar', role: 'Penjaga Ruang Hidup',
    story: 'Berdiri di pihak satwa dan udara bersih, memastikan pagi tetap milik kehidupan.',
    image: `${directory}/fajar-back.webp`, foreground: `${directory}/fajar-front.webp`, accent: '#fbd2e6',
  },
  {
    id: 'rintik', label: 'Rintik', role: 'Penjaga Kabar Jernih',
    story: 'Menahan jempol dari kabar yang belum pasti, dan meneruskan fakta yang menjaga hutan.',
    image: `${directory}/rintik.webp`, foreground: `${directory}/rintik-front.webp`, accent: '#b8f2cf',
  },
] as const
