"""
Generate a comprehensive, beautifully formatted Word (.docx) briefing guide
for Communication Science students presenting the website https://sebelumjadiapi.my.id/
"""
import os
from pathlib import Path
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def create_document():
    doc = docx.Document()

    # Set Margins (1 inch / 2.54 cm all around)
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    # Color Palette Constants
    COLOR_PRIMARY = RGBColor(30, 86, 49)      # Forest Green #1E5631
    COLOR_SECONDARY = RGBColor(217, 130, 43)  # Amber / Terakota #D9822B
    COLOR_DARK = RGBColor(33, 37, 41)         # Charcoal Dark #212529
    COLOR_MUTED = RGBColor(108, 117, 125)     # Gray #6C757D
    HEX_CALLOUT_BG = "F8F9FA"
    HEX_ANALOGY_BG = "F4F8F4"
    HEX_QNA_BG = "FFF8F0"
    HEX_GREEN_BORDER = "1E5631"
    HEX_AMBER_BORDER = "D9822B"

    # Helper: Set paragraph style
    def style_paragraph(p, space_before=0, space_after=6, line_spacing=1.15):
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing

    # Helper: Add Heading 1
    def add_h1(text):
        h = doc.add_paragraph()
        style_paragraph(h, space_before=16, space_after=6)
        run = h.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(16)
        run.font.bold = True
        run.font.color.rgb = COLOR_PRIMARY
        return h

    # Helper: Add Heading 2
    def add_h2(text):
        h = doc.add_paragraph()
        style_paragraph(h, space_before=12, space_after=4)
        run = h.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(13)
        run.font.bold = True
        run.font.color.rgb = COLOR_SECONDARY
        return h

    # Helper: Add Body Paragraph
    def add_p(text, bold_prefix="", italic=False):
        p = doc.add_paragraph()
        style_paragraph(p, space_before=0, space_after=6)
        if bold_prefix:
            r_pre = p.add_run(bold_prefix + " ")
            r_pre.font.name = "Segoe UI"
            r_pre.font.size = Pt(10.5)
            r_pre.font.bold = True
            r_pre.font.color.rgb = COLOR_DARK
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(10.5)
        run.font.italic = italic
        run.font.color.rgb = COLOR_DARK
        return p

    # Helper: Add Bullet point
    def add_bullet(bold_prefix, text):
        p = doc.add_paragraph(style='List Bullet')
        style_paragraph(p, space_before=0, space_after=4)
        if bold_prefix:
            r_pre = p.add_run(bold_prefix + " ")
            r_pre.font.name = "Segoe UI"
            r_pre.font.size = Pt(10.5)
            r_pre.font.bold = True
            r_pre.font.color.rgb = COLOR_DARK
        run = p.add_run(text)
        run.font.name = "Segoe UI"
        run.font.size = Pt(10.5)
        run.font.color.rgb = COLOR_DARK
        return p

    # Helper: Add Callout Box with left border
    def add_callout(title, body, bg_hex=HEX_ANALOGY_BG, border_hex=HEX_GREEN_BORDER, icon="💡"):
        tbl = doc.add_table(rows=1, cols=1)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = tbl.cell(0, 0)
        cell.width = Inches(6.5)

        # Background color
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{bg_hex}"/>')
        cell._tc.get_or_add_tcPr().append(shd)

        # Left border only (thick)
        borders = parse_xml(f'''
            <w:tcBorders {nsdecls("w")}>
                <w:top w:val="none"/>
                <w:left w:val="single" w:sz="36" w:space="0" w:color="{border_hex}"/>
                <w:bottom w:val="none"/>
                <w:right w:val="none"/>
            </w:tcBorders>
        ''')
        cell._tc.get_or_add_tcPr().append(borders)

        # Internal margins / padding
        mar = parse_xml(f'''
            <w:tcMar {nsdecls("w")}>
                <w:top w:w="140" w:type="dxa"/>
                <w:left w:w="220" w:type="dxa"/>
                <w:bottom w:w="140" w:type="dxa"/>
                <w:right w:w="220" w:type="dxa"/>
            </w:tcMar>
        ''')
        cell._tc.get_or_add_tcPr().append(mar)

        p = cell.paragraphs[0]
        style_paragraph(p, space_before=0, space_after=3)
        r_title = p.add_run(f"{icon} {title}\n")
        r_title.font.name = "Segoe UI"
        r_title.font.size = Pt(10.5)
        r_title.font.bold = True
        r_title.font.color.rgb = COLOR_PRIMARY if border_hex == HEX_GREEN_BORDER else COLOR_SECONDARY

        r_body = p.add_run(body)
        r_body.font.name = "Segoe UI"
        r_body.font.size = Pt(10)
        r_body.font.color.rgb = COLOR_DARK

        # Spacer after table
        sp = doc.add_paragraph()
        style_paragraph(sp, space_before=0, space_after=4)

    # -------------------------------------------------------------
    # COVER / HEADER TITLE
    # -------------------------------------------------------------
    p_meta = doc.add_paragraph()
    style_paragraph(p_meta, space_before=0, space_after=2)
    r_cat = p_meta.add_run("PANDUAN PRESENTASI & CHEAT SHEET RESMI · ILMU KOMUNIKASI")
    r_cat.font.name = "Segoe UI"
    r_cat.font.size = Pt(9.5)
    r_cat.font.bold = True
    r_cat.font.color.rgb = COLOR_SECONDARY

    p_title = doc.add_paragraph()
    style_paragraph(p_title, space_before=2, space_after=4)
    r_main = p_title.add_run("Bedah Web Kampanye Digital PR: #SebelumJadiApi")
    r_main.font.name = "Segoe UI"
    r_main.font.size = Pt(22)
    r_main.font.bold = True
    r_main.font.color.rgb = COLOR_PRIMARY

    p_sub = doc.add_paragraph()
    style_paragraph(p_sub, space_before=0, space_after=12)
    r_sub = p_sub.add_run("Live URL: https://sebelumjadiapi.my.id  |  Studi Kasus: Digital PR WWF Indonesia (Konservasi Rawa Gambut)")
    r_sub.font.name = "Segoe UI"
    r_sub.font.size = Pt(10.5)
    r_sub.font.italic = True
    r_sub.font.color.rgb = COLOR_MUTED

    # Quick Summary Table (Executive Card)
    meta_table = doc.add_table(rows=4, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_data = [
        ("Nama Kampanye", "#SebelumJadiApi (Pencegahan Karhutla Ekosistem Gambut)"),
        ("Tujuan Komunikasi", "Menggeser fokus publik dari kepanikan saat api berkobar menjadi aksi pencegahan dini sebelum tanah gambut mengering dan terbakar."),
        ("Target Audiens", "Generasi muda, mahasiswa, netizen perkotaan, dan penggerak komunitas lingkungan."),
        ("Peran Website", "Campaign Hub (Pusat Kampanye) yang interaktif, tempat edukasi cek hoaks, uji visual, dan komitmen aksi nyata di Cloud.")
    ]
    for idx, (lbl, val) in enumerate(meta_data):
        c0, c1 = meta_table.cell(idx, 0), meta_table.cell(idx, 1)
        c0.width, c1.width = Inches(2.0), Inches(4.5)
        # zebra shading
        bg = "F4F6F4" if idx % 2 == 0 else "FFFFFF"
        for c in (c0, c1):
            shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{bg}"/>')
            c._tc.get_or_add_tcPr().append(shd)
            b = parse_xml(f'''
                <w:tcBorders {nsdecls("w")}>
                    <w:top w:val="single" w:sz="4" w:color="E0E0E0"/>
                    <w:bottom w:val="single" w:sz="4" w:color="E0E0E0"/>
                    <w:left w:val="none"/><w:right w:val="none"/>
                </w:tcBorders>
            ''')
            c._tc.get_or_add_tcPr().append(b)
        
        p0 = c0.paragraphs[0]
        style_paragraph(p0, space_before=2, space_after=2)
        r0 = p0.add_run(lbl)
        r0.font.name = "Segoe UI"
        r0.font.size = Pt(9.5)
        r0.font.bold = True
        r0.font.color.rgb = COLOR_PRIMARY

        p1 = c1.paragraphs[0]
        style_paragraph(p1, space_before=2, space_after=2)
        r1 = p1.add_run(val)
        r1.font.name = "Segoe UI"
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = COLOR_DARK

    sp = doc.add_paragraph()
    style_paragraph(sp, space_before=4, space_after=4)

    # -------------------------------------------------------------
    # BAGIAN 1: KAMUS IT BAHASA GAMPANG (UNTUK ANAK ILKOM)
    # -------------------------------------------------------------
    add_h1("1. Kamus Istilah Web & IT untuk Anak Ilmu Komunikasi")
    add_p("Jangan minder kalau asisten dosen (asdos) nanya istilah teknis! Gunakan analogi sehari-hari di bawah ini biar terdengar pintar, paham logika sistem, dan tetap santai:")

    # Analogi 1: Frontend vs Backend
    add_h2("A. Apa itu Frontend dan Backend?")
    add_bullet("Frontend (Bagian Depan):", "Semua yang dilihat dan disentuh langsung oleh mata pengunjung website. Mulai dari warna hitam elegan, teks bergerak, gambar pohon, suara musik hutan, sampai tombol yang kamu klik.")
    add_bullet("Backend (Bagian Belakang):", "Sistem mesin di balik layar yang bekerja tanpa kelihatan. Tugasnya menerima data (seperti ketikan email atau janji aksi) dan menyimpannya ke brankas/database di cloud.")
    
    add_callout(
        "Analogi Bioskop / Teater Megah",
        "Bayangin sebuah pertunjukan drama teater di panggung megah:\n"
        "• Frontend adalah panggungnya: aktornya, lampu sorot, dekorasi pohon, kostum, dan efek suara yang dinikmati penonton.\n"
        "• Backend adalah kru di balik panggung: orang yang mengatur listrik mesin, mencatat data tiket penonton, dan menyimpan barang di gudang.",
        bg_hex=HEX_ANALOGY_BG, border_hex=HEX_GREEN_BORDER, icon="🎭"
    )

    # Analogi 2: Parallax 2.5D
    add_h2("B. Apa itu 'Parallax 2.5D' (Kenapa Gambarnya Bisa Gerak Pas Kursor Digeser)?")
    add_bullet("Penjelasan Singkat:", "Gambar di website kita bukan gambar datar biasa, tapi dipotong jadi beberapa lembar (latar belakang, pohon di tengah, dan daun di depan). Waktu mouse digerakkan, tiap lembar bergerak dengan kecepatan berbeda.")
    
    add_callout(
        "Analogi Jendela Kereta Api",
        "Bayangin kamu lagi duduk di kereta api yang lagi jalan kencang, lalu nengok ke jendela:\n"
        "• Tiang listrik di dekat rel melesat cepat banget (lapisan depan).\n"
        "• Pohon di kejauhan bergeraknya sedang (lapisan tengah).\n"
        "• Gunung di ujung cakrawala rasanya hampir diam (lapisan belakang).\n"
        "Efek ini bikin mata otak kita merasa ada 'ruang 3D dan kedalaman', padahal medianya cuma layar datar!",
        bg_hex=HEX_ANALOGY_BG, border_hex=HEX_GREEN_BORDER, icon="🚆"
    )

    # Analogi 3: Audio Engine
    add_h2("C. Kenapa Musiknya Nggak Mati Pas Pindah Tab atau Ganti Halaman?")
    add_bullet("Penjelasan Singkat:", "Website ini memakai sistem 'Single Audio Engine' (Pemutar Audio Tunggal). Musik tidak menempel di satu halaman web tertentu, melainkan mengalun dari sistem pusat website.")
    
    add_callout(
        "Analogi Speaker Bluetooth di Pundak",
        "Bayangin kamu jalan-jalan keliling rumah bawa speaker bluetooth yang ditaruh di pundak:\n"
        "Waktu kamu pindah dari ruang tamu (halaman Home) ke ruang belajar (halaman Jejak Kehidupan), lagunya tetap nyetel dari speaker yang sama tanpa terputus sama sekali! Bahkan kalau kamu buka Instagram sebentar (pindah tab browser), lagunya tetap nemenin kamu.",
        bg_hex=HEX_ANALOGY_BG, border_hex=HEX_GREEN_BORDER, icon="📻"
    )

    # Analogi 4: Netlify Blobs Cloud Storage
    add_h2("D. Di mana Data Janji (Wall of Action) dan Email Disimpan?")
    add_bullet("Penjelasan Singkat:", "Website ini tidak memakai database fisik lokal (seperti MySQL/XAMPP yang ribet), melainkan teknologi modern 'Cloud Storage' bernama Netlify Blobs melalui Serverless API.")
    
    add_callout(
        "Analogi Papan Mading di Atas Awan",
        "Bayangin papan mading digital yang melayang di awan (cloud):\n"
        "Siapapun yang menempelkan kertas janji di website dari manapun di seluruh dunia, serverless API akan langsung mencatatnya ke buku catatan di awan itu dalam 0,1 detik. Hasilnya langsung muncul di layar orang lain tanpa perlu kita sewa komputer server raksasa sendiri.",
        bg_hex=HEX_ANALOGY_BG, border_hex=HEX_GREEN_BORDER, icon="☁️"
    )

    # Analogi 5: React + TypeScript
    add_h2("E. Kenapa Bikinnya Pakai React dan TypeScript, Bukan HTML Biasa?")
    add_bullet("Penjelasan Singkat:", "Biar website dibangun seperti rakitan balok LEGO yang rapi, cepat, dan anti-error saat ditampilkan di layar proyektor atau HP audiens.")
    
    add_callout(
        "Analogi Balok LEGO Berlabel",
        "• HTML biasa itu kayak bikin patung dari satu bongkahan semen utuh. Kalau mau benerin jarinya yang retak, bisa-bisa seluruh patung hancur.\n"
        "• React itu kayak bikin bangunan pakai balok LEGO. Tombol, kartu satwa, dan formulir adalah balok-balok terpisah yang bisa diganti kapan saja tanpa merusak halaman lain.\n"
        "• TypeScript adalah instruksi stiker di tiap balok LEGO yang memastikan balok merah cuma bisa dipasang di colokan yang pas, jadi nggak ada cerita website mendadak nge-crash atau eror pas presentasi!",
        bg_hex=HEX_ANALOGY_BG, border_hex=HEX_GREEN_BORDER, icon="🧱"
    )

    # -------------------------------------------------------------
    # BAGIAN 2: BEDAH ALUR PRESENTASI WEB SEBELUMJADIAPI
    # -------------------------------------------------------------
    add_h1("2. Alur Bedah Website https://sebelumjadiapi.my.id/")
    add_p("Saat presentasi, buka websitenya di proyektor lalu ikuti alur narasi 3 halaman utama ini:")

    add_h2("A. Halaman Utama: HOME (Pohon 2.5D Interaktif)")
    add_bullet("Fungsi Komunikasi:", "First Impression (Kesan Pertama) yang memikat audiens dengan visual pohon gambut sinematik berbalut partikel cahaya misterius.")
    add_bullet("Yang Harus Dilakukan Saat Demo:", "Gerakkan kursor mouse pelan-pelan ke kiri dan kanan. Tunjukkan bahwa cahaya pohon merespons arah mouse, dan audio hutan alami menyala otomatis secara tenang tanpa bising.")
    add_bullet("Kalimat untuk Diucapkan:", "'Website ini diawali dengan visual pohon kehidupan rawa gambut. Kami sengaja merancang antarmuka hitam pekat berpadu hijau hutan untuk menciptakan atmosfer reflektif: apa yang sebenarnya kita pertaruhkan sebelum api melahap semuanya?'")

    add_h2("B. Halaman Inti: JEJAK KEHIDUPAN (Enam Bab Kampanye Terstruktur)")
    add_p("Ini adalah jantung kampanye Digital PR kita. Terbagi menjadi 6 babak berurutan yang membawa emosi audiens dari 'sadar' hingga 'bergerak nyata':")

    add_bullet("01 / Why It Matters (Mengapa Gambut Berharga):", "Menjelaskan fungsi rawa gambut sebagai spons air raksasa dan penyerap miliaran ton karbon bumi. Ada fitur interaktif 'Jika Satu Bagian Rusak': perlihatkan bahwa jika kanopi/gambut dirusak, burung rangkong, akar mikoriza, dan air gambut ikut binasa.")
    add_bullet("02 / Before The Fire (Kondisi Sebelum Api Datang):", "Simulasi dramatis transisi hutan dari kondisi hijau segar, mengering akibat kanalisasi ilegal, hingga terbakar menjadi abu arang.")
    add_bullet("03 / Make It Personal (Menyentuh Sisi Kemanusiaan):", "Menggeser isu dari sekadar 'pohon terbakar' menjadi 'paru-paru anak kita yang terancam'. Menampilkan foto dokumentasi kabut asap nyata di kota (Medan, Palangka Raya), serta data kesehatan resmi WHO.")
    add_bullet("04 / Take Action — Prevention Lab (Edukasi Cek Hoaks & Mitigasi):", "FITUR UNGGULAN: Simulasi 'Bedah Postingan Viral / Cek Sebelum Percaya' berlayar 2.5D. Tunjukkan kepada asdos bagaimana website ini mengedukasi publik agar tidak termakan hoaks 'pembakaran lahan alami' vs fakta ilmiah karhutla buatan manusia.")
    add_bullet("05 / Show Your Action (Dinding Aksi / Wall of Action Live Cloud):", "Formulir interaktif di mana audiens bisa memilih janji aksi (misal: 'Saya berjanji cek fakta sebelum share kabar karhutla'). Saat dikirim, nama dan kotanya langsung muncul di dinding publik secara real-time!")
    add_bullet("06 / Stay in the Movement (Closing & Kartu Penjaga Gambut):", "Audiens mendapatkan kartu digital personal 'Penjaga Gambut', pendaftaran buletin kabar berkala (tersimpan di cloud), serta tautan resmi keanggotaan WWF MoNa (Movement for Nature).")

    add_h2("C. Halaman Khusus: MEDITATIONS (Ruang Dengar & Olah Rasa)")
    add_bullet("Fungsi Komunikasi:", "Memberikan ruang refleksi batin bagi generasi muda yang sering merasa cemas terhadap krisis iklim (climate anxiety).")
    add_bullet("Isi:", "5 babak audio naratif mendalam: Peace (Kedamaian), Awareness (Kesadaran), Sorrow (Duka), Anger (Kemarahan), dan Hope (Harapan).")

    # -------------------------------------------------------------
    # BAGIAN 3: BOCORAN TANYA-JAWAB ASDOS (FAQ & SKRIP JAWABAN)
    # -------------------------------------------------------------
    add_h1("3. Bocoran Pertanyaan Asdos & Skrip Jawaban Siap Pakai")
    add_p("Ini adalah daftar pertanyaan yang PALING MUNGKIN ditanyakan oleh asisten dosen atau dosen penguji. Hafalkan poin jawabannya:")

    # Q1: Legalitas WWF
    add_callout(
        "TANYA 1: 'Website ini resmi dibuat sama kantor WWF Indonesia atau gimana?'",
        "SKRIP JAWABAN:\n"
        "'Bukan website korporat resmi WWF, Kak. Ini adalah PROTOTIPE AKADEMIK untuk kampanye Digital Public Relations (DPR) yang kami rancang berbasis studi kasus nyata konservasi WWF Indonesia.\n\n"
        "Di dalam website, kami mencantumkan disclaimer akademik yang jelas, tidak mengklaim endorsement resmi, dan menjaga integritas logo serta data sekunder yang kami ambil dari publikasi ilmiah terverifikasi.'",
        bg_hex=HEX_QNA_BG, border_hex=HEX_AMBER_BORDER, icon="⚖️"
    )

    # Q2: Mengapa #SebelumJadiApi
    add_callout(
        "TANYA 2: 'Kenapa temanya #SebelumJadiApi? Kenapa nggak pas kebakaran aja biar dramatis?'",
        "SKRIP JAWABAN:\n"
        "'Secara strategi komunikasi krisis publik, pendekatan 'fear appeal' saat api sudah berkobar sering kali sudah terlambat dan hanya memicu kepanikan tanpa solusi nyata.\n\n"
        "Karakteristik tanah gambut itu unik: kalau api sudah masuk ke bawah kubah gambut, ia membakar di kedalaman 4 meter di bawah tanah dan mustahil dipadamkan manusia sampai musim hujan tiba. Jadi kampanye kami mengedukasi publik bahwa kunci penyelamatan gambut adalah PENCEGAHAN (sebelum jadi api), bukan pemadaman.'",
        bg_hex=HEX_QNA_BG, border_hex=HEX_AMBER_BORDER, icon="🔥"
    )

    # Q3: Efektivitas Web vs Medsos
    add_callout(
        "TANYA 3: 'Zaman sekarang kan orang sukanya TikTok/IG, kenapa kelompok kalian malah bikin web rumit gini?'",
        "SKRIP JAWABAN:\n"
        "'Media sosial seperti Instagram dan TikTok sifatnya cepat lewat (ephemeral) dan rentan disinformasi. Website ini kami posisikan sebagai 'Campaign Hub' (Pusat Ekosistem Kampanye).\n\n"
        "Konten di IG/TikTok berfungsi sebagai pintu masuk (traffic generator), sedangkan website ini memberikan 'deep engagement' (keterlibatan mendalam): pengunjung bisa merasakan atmosfer hutan 2.5D, membedah hoaks secara interaktif, dan menandatangani komitmen aksi di Wall of Action.'",
        bg_hex=HEX_QNA_BG, border_hex=HEX_AMBER_BORDER, icon="🎯"
    )

    # Q4: Database Wall of Action
    add_callout(
        "TANYA 4: 'Itu form Wall of Action dan Newsletter cuma tampilan bohong-bohongan (dummy) atau beneran kesimpan?'",
        "SKRIP JAWABAN:\n"
        "'Beneran tersimpan secara nyata di Cloud, Kak! Kami menggunakan arsitektur modern Serverless Functions Netlify yang langsung terhubung ke Netlify Blobs.\n\n"
        "Saat pengunjung klik tombol kirim, data nama, kota, dan pilihan janji langsung dienkripsi dan disimpan di cloud storage terdistribusi. Jadi kalau dibuka dari HP manapun, data wall-nya tetap sinkron dan live!'",
        bg_hex=HEX_QNA_BG, border_hex=HEX_AMBER_BORDER, icon="💾"
    )

    # Q5: Gambar 2.5D
    add_callout(
        "TANYA 5: 'Kok gambarnya bisa goyang-goyang pas mouse digerakin? Pake apa itu?'",
        "SKRIP JAWABAN:\n"
        "'Teknik yang kami gunakan adalah Multi-Layer 2.5D Parallax menggunakan animasi GSAP dan Canvas WebGL.\n\n"
        "Aset visual hutan dipisahkan menjadi beberapa lapisan kedalaman (foreground, subjek satwa, dan background). Sensor koordinat pointer mouse kemudian menggerakkan tiap lapisan dengan rasio kecepatan matematis yang berbeda sehingga mata kita menangkap ilusi kedalaman spasial.'",
        bg_hex=HEX_QNA_BG, border_hex=HEX_AMBER_BORDER, icon="🎨"
    )

    # Q6: Pengukuran Keberhasilan PR
    add_callout(
        "TANYA 6: 'Gimana cara kalian mengukur keberhasilan kampanye Digital PR ini (KPI-nya apa)?'",
        "SKRIP JAWABAN:\n"
        "'Kami mengukurnya melalui 3 tingkatan evaluasi Public Relations:\n"
        "1. Kognitif (Pengetahuan): Interaksi pada fitur Bedah Postingan Viral untuk melihat pemahaman publik atas fakta vs hoaks karhutla.\n"
        "2. Afektif (Sikap/Emosi): Durasi dengar (dwell time) pada ruang Meditations dan scroll depth pada bab Make It Personal.\n"
        "3. Konatif (Aksi Nyata): Jumlah pledge nyata yang terkumpul di Wall of Action publik serta konversi pendaftaran relawan di WWF MoNa.'",
        bg_hex=HEX_QNA_BG, border_hex=HEX_AMBER_BORDER, icon="📊"
    )

    # -------------------------------------------------------------
    # BAGIAN 4: TIPS PRESENTASI & DEMO HARI INI
    # -------------------------------------------------------------
    add_h1("4. Tips Eksekusi Presentasi Hari Ini (Biar Nilai A!)")
    
    add_bullet("1. Buka Website Sejak Awal di Browser:", "Buka https://sebelumjadiapi.my.id di tab Google Chrome atau Edge sebelum giliran kelompokmu maju. Pastikan volume laptop di angka 40-50% agar audio hutannya terdengar elegan di ruangan.")
    add_bullet("2. Scroll Santai, Jangan Buru-Buru:", "Website interaktif dinilai dari *rasa* (feel) dan kehalusannya. Scroll perlahan saat melewati transisi Before The Fire agar asdos bisa melihat perubahan visualnya.")
    add_bullet("3. Pamerkan Fitur 'Bedah Postingan Viral':", "Di bab 04 (Take Action), luangkan waktu 30 detik untuk klik simulasi cek fakta. Katakan: 'Ini solusi kami melawan framing hoaks karhutla di media sosial'. Asdos komunikasi pasti sangat suka poin literasi digital ini!")
    add_bullet("4. Coba Submit Janji di Depan Asdos:", "Di bab 05 (Show Your Action), ketik namamu atau nama kelompokmu langsung di layar proyektor, lalu klik kirim. Tunjukkan bahwa namamu langsung muncul detik itu juga di dinding aksi! Ini bukti nyata bahwa teknologinya berjalan hidup.")
    add_bullet("5. Kalau Ada Eror Teknis Mendadak:", "Tetap tenang dan tersenyum. Katakan: 'Website ini dioptimalkan dengan prinsip responsive design dan cloud fallback. Jika jaringan kampus mengalami latensi, sistem tetap mengamankan data lokal pengguna'. Jawaban ini sangat profesional!")

    # Footer note
    sp_end = doc.add_paragraph()
    style_paragraph(sp_end, space_before=16, space_after=2)
    r_end = sp_end.add_run("Dokumen ini disusun untuk Tim Presentasi Kampanye #SebelumJadiApi · Semester Ganjil 2026")
    r_end.font.name = "Segoe UI"
    r_end.font.size = Pt(9)
    r_end.font.italic = True
    r_end.font.color.rgb = COLOR_MUTED

    # Save documents
    out_root = Path("PANDUAN_PRESENTASI_SEBELUMJADIAPI.docx")
    out_docs = Path("docs/PANDUAN_PRESENTASI_SEBELUMJADIAPI.docx")
    out_docs.parent.mkdir(parents=True, exist_ok=True)
    
    doc.save(out_root)
    doc.save(out_docs)
    print(f"Document successfully created at:")
    print(f" - {out_root.resolve()}")
    print(f" - {out_docs.resolve()}")

if __name__ == '__main__':
    create_document()
