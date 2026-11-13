"""
Script to generate ultra-high-resolution, transparent PNG design frames,
badges, overlays, and seamless carousel connector templates for Instagram
(Feeds 1080x1350 / 1080x1080 and Reels 1080x1920) for #SebelumJadiApi.
"""
import math
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FRAMES_DIR = Path('public/assets/design_instagram/aset_frame')
OTHER_DIR = Path('public/assets/design_instagram/aset_lainnya')
FRAMES_DIR.mkdir(parents=True, exist_ok=True)
OTHER_DIR.mkdir(parents=True, exist_ok=True)

# Font loading helpers
def get_font(name='segoeui.ttf', size=24):
    font_path = Path('C:/Windows/Fonts') / name
    if font_path.exists():
        try:
            return ImageFont.truetype(str(font_path), size)
        except Exception:
            pass
    return ImageFont.load_default()

FONT_MONO = get_font('consola.ttf', 20)
FONT_MONO_SM = get_font('consola.ttf', 16)
FONT_SANS = get_font('segoeui.ttf', 24)
FONT_SANS_SM = get_font('segoeui.ttf', 18)
FONT_BOLD = get_font('segoeuib.ttf', 32)
FONT_BOLD_LG = get_font('segoeuib.ttf', 44)
FONT_BOLD_XL = get_font('segoeuib.ttf', 64)
FONT_TITLE = get_font('arialbd.ttf', 48)

# Colors
C_DARK = (15, 17, 20, 255)
C_DARK_A = (15, 17, 20, 220)
C_DARK_MED = (24, 28, 34, 255)
C_GOLD = (235, 175, 60, 255)
C_ORANGE = (242, 107, 43, 255)
C_RED_FIRE = (225, 65, 45, 255)
C_GREEN = (46, 175, 110, 255)
C_WHITE = (245, 245, 240, 255)
C_MUTED = (160, 165, 175, 255)
C_SUBTLE = (80, 85, 95, 255)
C_BORDER = (100, 105, 115, 140)

def draw_corner_brackets(draw, x0, y0, x1, y1, length=40, width=3, color=C_GOLD):
    # Top Left
    draw.line([(x0, y0), (x0 + length, y0)], fill=color, width=width)
    draw.line([(x0, y0), (x0, y0 + length)], fill=color, width=width)
    # Top Right
    draw.line([(x1, y0), (x1 - length, y0)], fill=color, width=width)
    draw.line([(x1, y0), (x1, y0 + length)], fill=color, width=width)
    # Bottom Left
    draw.line([(x0, y1), (x0 + length, y1)], fill=color, width=width)
    draw.line([(x0, y1), (x0, y1 - length)], fill=color, width=width)
    # Bottom Right
    draw.line([(x1, y1), (x1 - length, y1)], fill=color, width=width)
    draw.line([(x1, y1), (x1, y1 - length)], fill=color, width=width)

# -------------------------------------------------------------
# 1. FRAME 01: IG FEEDS PORTRAIT MINIMAL DARK (1080 x 1350)
# -------------------------------------------------------------
def make_frame_feed_portrait():
    W, H = 1080, 1350
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)

    # Margins
    mx, my = 50, 60
    pw0, py0, pw1, py1 = mx + 20, my + 100, W - mx - 20, H - my - 120

    # Upper header bar background (subtle translucent)
    draw.rounded_rectangle([(mx, my), (W - mx, my + 80)], radius=12, fill=(12, 14, 18, 220), outline=C_BORDER, width=1)
    
    # Header tag
    draw.text((mx + 25, my + 26), 'WWF INDONESIA · DIGITAL PR', fill=C_GOLD, font=FONT_BOLD)
    draw.text((W - mx - 290, my + 30), '0°32\'S 102°45\'E · GAMBUT', fill=C_MUTED, font=FONT_MONO)

    # Photo Window: Transparent cutout with sleek border
    draw.rectangle([(pw0, py0), (pw1, py1)], outline=(60, 65, 75, 120), width=1)
    draw_corner_brackets(draw, pw0 - 8, py0 - 8, pw1 + 8, py1 + 8, length=50, width=3, color=C_GOLD)

    # Center watermarks / grid cues on photo window corners
    draw.text((pw0 + 20, py0 + 20), '[ RAW ARCHIVE: PEATLAND ]', fill=(255, 255, 255, 90), font=FONT_MONO_SM)
    draw.text((pw1 - 180, py0 + 20), 'REC · 4K 60FPS', fill=(242, 107, 43, 160), font=FONT_MONO_SM)

    # Bottom bar background
    draw.rounded_rectangle([(mx, H - my - 100), (W - mx, H - my)], radius=12, fill=(12, 14, 18, 220), outline=C_BORDER, width=1)
    draw.text((mx + 25, H - my - 76), '#SebelumJadiApi', fill=C_WHITE, font=FONT_BOLD_LG)
    draw.text((W - mx - 320, H - my - 66), 'GESER UNTUK MELIHAT  →', fill=C_GOLD, font=FONT_BOLD)

    out = FRAMES_DIR / 'frame_01_feed_portrait_minimal_dark.png'
    im.save(out, 'PNG')
    print(f'Created: {out.name}')

# -------------------------------------------------------------
# 2. FRAME 02: IG FEEDS SQUARE EDITORIAL (1080 x 1080)
# -------------------------------------------------------------
def make_frame_feed_square():
    W, H = 1080, 1080
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)

    mx, my = 48, 48
    draw.rectangle([(mx, my), (W - mx, H - my)], outline=C_BORDER, width=2)
    draw.rectangle([(mx + 8, my + 8), (W - mx - 8, H - my - 8)], outline=(40, 45, 55, 160), width=1)

    # Header tab
    draw.rectangle([(mx + 40, my), (W - mx - 40, my + 60)], fill=(15, 18, 22, 240), outline=C_BORDER, width=1)
    draw.text((mx + 60, my + 15), 'DOKUMENTASI SPESIES PENJAGA GAMBUT', fill=C_WHITE, font=FONT_BOLD)
    draw.text((W - mx - 180, my + 20), 'VOL. 01', fill=C_GOLD, font=FONT_MONO)

    # Transparent Photo Area: center
    cx0, cy0, cx1, cy1 = mx + 40, my + 85, W - mx - 40, H - my - 95
    draw.rectangle([(cx0, cy0), (cx1, cy1)], outline=(70, 75, 85, 90), width=1)
    draw_corner_brackets(draw, cx0, cy0, cx1, cy1, length=35, width=2, color=C_ORANGE)

    # Footer banner
    draw.rectangle([(mx + 40, H - my - 80), (W - mx - 40, H - my - 20)], fill=(15, 18, 22, 240), outline=C_BORDER, width=1)
    draw.text((mx + 60, H - my - 62), '#SebelumJadiApi', fill=C_GOLD, font=FONT_BOLD)
    draw.text((mx + 380, H - my - 58), '|  SUMATRA & KALIMANTAN  |  STATUS: DILINDUNGI', fill=C_MUTED, font=FONT_MONO_SM)

    out = FRAMES_DIR / 'frame_02_feed_square_editorial.png'
    im.save(out, 'PNG')
    print(f'Created: {out.name}')

# -------------------------------------------------------------
# 3. FRAME 03: IG REELS & STORY VERTICAL (1080 x 1920)
# -------------------------------------------------------------
def make_frame_reels_vertical():
    W, H = 1080, 1920
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)

    # IG Reels Safe Zones:
    # Top ~220px is reserved for Story/Reels header UI.
    # Bottom ~340px is reserved for caption, audio tag, like/comment buttons.
    # Main content zone: 220 to 1580 px.

    # Top Safe Header Bar (at y=160 to 240)
    draw.rounded_rectangle([(60, 160), (W - 60, 240)], radius=40, fill=(16, 20, 26, 220), outline=C_BORDER, width=1)
    draw.ellipse([(90, 188), (114, 212)], fill=C_ORANGE)
    draw.text((130, 182), 'CATATAN PENJAGA GAMBUT', fill=C_WHITE, font=FONT_BOLD)
    draw.text((W - 320, 186), 'EDISI DARURAT KARHUTLA', fill=C_GOLD, font=FONT_MONO_SM)

    # Central framing brackets
    draw_corner_brackets(draw, 50, 270, W - 50, 1560, length=70, width=4, color=C_GOLD)

    # Subtle side rule / measurement markers
    for i in range(10):
        y = 350 + i * 110
        draw.line([(55, y), (70, y)], fill=(200, 200, 200, 100), width=2)
        draw.line([(W - 70, y), (W - 55, y)], fill=(200, 200, 200, 100), width=2)

    # Bottom safe overlay card (at y=1440 to 1570)
    draw.rounded_rectangle([(60, 1440), (W - 60, 1560)], radius=20, fill=(14, 18, 22, 240), outline=(235, 175, 60, 180), width=2)
    draw.text((95, 1465), '#SebelumJadiApi', fill=C_GOLD, font=FONT_BOLD_LG)
    draw.text((95, 1515), 'Ketahui fakta sebelum api melahap habis ruang hidup mereka.', fill=C_MUTED, font=FONT_SANS_SM)

    out = FRAMES_DIR / 'frame_03_reels_story_vertical.png'
    im.save(out, 'PNG')
    print(f'Created: {out.name}')

# -------------------------------------------------------------
# 4. SEAMLESS CAROUSEL PUZZLE SLIDES (1080 x 1350 each)
# Connects Slide 1 -> Slide 2 -> Slide 3
# -------------------------------------------------------------
def make_seamless_carousel():
    W, H = 1080, 1350
    HY = 960  # Y position of the continuous connecting horizon line

    # --- SLIDE 01 (Left Side of Panorama) ---
    im1 = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d1 = ImageDraw.Draw(im1)
    
    # Outer frame
    d1.rectangle([(40, 50), (W, H - 60)], outline=(80, 85, 95, 100), width=1)
    
    # Header tag
    d1.rounded_rectangle([(60, 70), (420, 135)], radius=10, fill=(15, 18, 24, 230), outline=C_BORDER, width=1)
    d1.text((85, 88), 'SLIDE 01 / 05', fill=C_GOLD, font=FONT_BOLD)
    d1.text((270, 92), 'EKOSISTEM', fill=C_MUTED, font=FONT_MONO)

    # Connecting Line: Starts from center and shoots right across the right edge!
    d1.line([(60, HY), (W, HY)], fill=C_GOLD, width=4)
    d1.ellipse([(60 - 6, HY - 6), (60 + 6, HY + 6)], fill=C_GOLD)
    # Right edge connecting indicator
    d1.polygon([(W - 25, HY - 15), (W, HY), (W - 25, HY + 15)], fill=C_GOLD)
    d1.text((W - 320, HY - 45), 'HUBUNGAN TAK TERPUTUS  →', fill=C_WHITE, font=FONT_BOLD)

    # Bottom branding
    d1.text((65, H - 120), '#SebelumJadiApi', fill=C_WHITE, font=FONT_BOLD_LG)
    d1.text((65, H - 75), 'Hutan Rawa Gambut Bukan Sekadar Pohon — Ini Spons Kehidupan', fill=C_MUTED, font=FONT_SANS_SM)

    out1 = FRAMES_DIR / 'frame_04_carousel_puzzle_slide_01.png'
    im1.save(out1, 'PNG')
    print(f'Created: {out1.name}')

    # --- SLIDE 02 (Middle Continuous Slide) ---
    im2 = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(im2)

    # Outer frame open on both left and right for seamless blend
    d2.line([(0, 50), (W, 50)], fill=(80, 85, 95, 100), width=1)
    d2.line([(0, H - 60), (W, H - 60)], fill=(80, 85, 95, 100), width=1)

    # Header tag
    d2.rounded_rectangle([(60, 70), (420, 135)], radius=10, fill=(15, 18, 24, 230), outline=C_BORDER, width=1)
    d2.text((85, 88), 'SLIDE 02 / 05', fill=C_GOLD, font=FONT_BOLD)
    d2.text((270, 92), 'JARINGAN', fill=C_MUTED, font=FONT_MONO)

    # Connecting Line: enters from x=0 at HY, passes straight to x=W at HY!
    d2.line([(0, HY), (W, HY)], fill=C_GOLD, width=4)
    # Left edge marker
    d2.polygon([(25, HY - 15), (0, HY), (25, HY + 15)], fill=C_GOLD)
    # Right edge marker
    d2.polygon([(W - 25, HY - 15), (W, HY), (W - 25, HY + 15)], fill=C_GOLD)

    # Center callout card (semi-transparent dark)
    cx, cy = W // 2, 600
    d2.rounded_rectangle([(120, cy - 140), (W - 120, cy + 140)], radius=16, fill=(15, 18, 24, 220), outline=C_GOLD, width=2)
    d2.text((160, cy - 110), 'FAKTA KUBAH GAMBUT', fill=C_ORANGE, font=FONT_BOLD)
    d2.text((160, cy - 60), 'Menyimpan hingga 10x karbon hutan tropis biasa.', fill=C_WHITE, font=FONT_BOLD)
    d2.text((160, cy - 10), 'Saat kanopi mengering, satu percikan api', fill=C_MUTED, font=FONT_SANS)
    d2.text((160, cy + 25), 'mampu membakar hingga kedalaman 4 meter di bawah tanah.', fill=C_MUTED, font=FONT_SANS)
    d2.text((160, cy + 80), 'GESER KE SLIDE BERIKUTNYA  →', fill=C_GOLD, font=FONT_BOLD)

    out2 = FRAMES_DIR / 'frame_05_carousel_puzzle_slide_02.png'
    im2.save(out2, 'PNG')
    print(f'Created: {out2.name}')

    # --- SLIDE 03 (Closing Action Slide) ---
    im3 = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d3 = ImageDraw.Draw(im3)

    d3.rectangle([(0, 50), (W - 40, H - 60)], outline=(80, 85, 95, 100), width=1)

    # Header tag
    d3.rounded_rectangle([(60, 70), (420, 135)], radius=10, fill=(15, 18, 24, 230), outline=C_BORDER, width=1)
    d3.text((85, 88), 'SLIDE 05 / 05', fill=C_GOLD, font=FONT_BOLD)
    d3.text((270, 92), 'AKSI NYATA', fill=C_GREEN, font=FONT_MONO)

    # Connecting Line enters from left and ends at an action circle!
    d3.line([(0, HY), (W // 2, HY)], fill=C_GOLD, width=4)
    d3.ellipse([(W // 2 - 20, HY - 20), (W // 2 + 20, HY + 20)], fill=C_GOLD, outline=C_WHITE, width=3)

    # Action Banner at bottom
    d3.rounded_rectangle([(60, H - 360), (W - 60, H - 100)], radius=20, fill=(14, 18, 24, 240), outline=C_GOLD, width=2)
    d3.text((100, H - 330), 'JADILAH PENJAGA GAMBUT', fill=C_WHITE, font=FONT_TITLE)
    d3.text((100, H - 260), 'Kunjungi: sebelumjadiapi.my.id', fill=C_GOLD, font=FONT_BOLD)
    d3.text((100, H - 215), 'Cek Fakta · Pelajari Mitigasi · Pasang Janji Aksi Nyata', fill=C_MUTED, font=FONT_SANS)
    d3.text((100, H - 165), '#SebelumJadiApi — WWF Indonesia Digital PR', fill=C_MUTED, font=FONT_MONO_SM)

    out3 = FRAMES_DIR / 'frame_06_carousel_puzzle_slide_03.png'
    im3.save(out3, 'PNG')
    print(f'Created: {out3.name}')

# -------------------------------------------------------------
# 5. FRAME 07: POLAROID FIELD SPECIMEN (1080 x 1350)
# -------------------------------------------------------------
def make_polaroid_frame():
    W, H = 1080, 1350
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)

    # White/pale aged polaroid border
    draw.rounded_rectangle([(60, 60), (W - 60, H - 80)], radius=16, fill=(240, 238, 230, 255), outline=(200, 195, 185, 255), width=2)

    # Transparent Photo Cutout (leaves bottom 280px for handwritten notes)
    # The cutout is made transparent by drawing on an alpha mask
    mask = Image.new('L', (W, H), 0)
    d_mask = ImageDraw.Draw(mask)
    d_mask.rounded_rectangle([(60, 60), (W - 60, H - 80)], radius=16, fill=255)
    # Cut out photo window
    px0, py0, px1, py1 = 110, 120, W - 110, H - 380
    d_mask.rectangle([(px0, py0), (px1, py1)], fill=0)

    # Create solid polaroid base and apply mask
    base = Image.new('RGBA', (W, H), (238, 236, 228, 255))
    d_base = ImageDraw.Draw(base)
    # Inner shadow / border around photo window
    d_base.rectangle([(px0 - 2, py0 - 2), (px1 + 2, py1 + 2)], outline=(170, 165, 155, 255), width=2)

    # Notes section at bottom of polaroid
    d_base.text((110, H - 340), 'DOKUMENTASI LAPANGAN / FIELD LOG', fill=(80, 85, 95, 255), font=FONT_BOLD)
    d_base.text((110, H - 290), 'Subjek: Fauna Endemik Rawa Gambut Sumatra-Kalimantan', fill=(30, 35, 40, 255), font=FONT_TITLE)
    d_base.text((110, H - 225), 'Koordinat: 00° 32\' 14" S - 102° 45\' 22" E  |  Status: Terancam Asap', fill=(100, 105, 115, 255), font=FONT_MONO)
    d_base.text((110, H - 180), '#SebelumJadiApi · WWF Indonesia', fill=(225, 65, 45, 255), font=FONT_BOLD)

    # Composite with transparent window
    im.paste(base, (0, 0), mask)

    out = FRAMES_DIR / 'frame_07_polaroid_field_specimen.png'
    im.save(out, 'PNG')
    print(f'Created: {out.name}')

# -------------------------------------------------------------
# 6. FRAME 08: SPLIT BEFORE & AFTER COMPARISON (1080 x 1350)
# -------------------------------------------------------------
def make_split_frame():
    W, H = 1080, 1350
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)

    # Two transparent windows separated by a caution center bar
    # Top window: y = 120 to 620
    # Center caution band: y = 635 to 715
    # Bottom window: y = 730 to 1230

    # Top Label Bar
    draw.rounded_rectangle([(60, 50), (W - 60, 110)], radius=8, fill=(15, 20, 26, 240), outline=C_GREEN, width=2)
    draw.text((85, 68), '● SEBELUM : HUTAN GAMBUT ALAMI (BASAH & KAYA)', fill=C_GREEN, font=FONT_BOLD)

    # Top Window Brackets
    draw_corner_brackets(draw, 60, 120, W - 60, 620, length=40, width=3, color=C_GREEN)

    # Center Warning Band
    draw.rectangle([(0, 635), (W, 715)], fill=(20, 22, 26, 255), outline=C_ORANGE, width=2)
    # Caution stripes
    for x in range(-50, W + 100, 40):
        draw.polygon([(x, 715), (x + 20, 715), (x + 40, 635), (x + 20, 635)], fill=(242, 107, 43, 80))
    draw.rectangle([(W // 2 - 220, 645), (W // 2 + 220, 705)], fill=(15, 17, 20, 240), outline=C_ORANGE, width=1)
    draw.text((W // 2 - 180, 660), 'VS RISIKO PENGERINGAN', fill=C_WHITE, font=FONT_BOLD)

    # Bottom Label Bar
    draw.rounded_rectangle([(60, 730), (W - 60, 790)], radius=8, fill=(15, 20, 26, 240), outline=C_RED_FIRE, width=2)
    draw.text((85, 748), '▲ SAAT API MUNCUL : KARHUTLA & ASAP PEKAT', fill=C_RED_FIRE, font=FONT_BOLD)

    # Bottom Window Brackets
    draw_corner_brackets(draw, 60, 800, W - 60, 1260, length=40, width=3, color=C_RED_FIRE)

    # Bottom footer tag
    draw.text((65, H - 65), '#SebelumJadiApi · Cegah sebelum tanah gambut terbakar.', fill=C_MUTED, font=FONT_MONO)

    out = FRAMES_DIR / 'frame_08_split_before_after.png'
    im.save(out, 'PNG')
    print(f'Created: {out.name}')

# -------------------------------------------------------------
# 7. BADGES & GRAPHIC ACCENTS (aset_lainnya)
# -------------------------------------------------------------
def make_campaign_badges():
    # Badge 1: Round Seal
    S = 800
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)

    cx, cy, r = S // 2, S // 2, 340
    draw.ellipse([(cx - r, cy - r), (cx + r, cy + r)], fill=(16, 20, 26, 240), outline=C_GOLD, width=6)
    draw.ellipse([(cx - r + 20, cy - r + 20), (cx + r - 20, cy + r - 20)], outline=(100, 105, 115, 160), width=2)

    draw.text((cx - 240, cy - 140), 'WWF INDONESIA', fill=C_WHITE, font=FONT_BOLD)
    draw.text((cx - 270, cy - 60), '#SebelumJadiApi', fill=C_GOLD, font=FONT_TITLE)
    draw.text((cx - 220, cy + 20), 'PENJAGA GAMBUT', fill=C_ORANGE, font=FONT_BOLD)
    draw.text((cx - 180, cy + 90), '2026 · SUMATRA - KALIMANTAN', fill=C_MUTED, font=FONT_MONO)

    out = OTHER_DIR / 'badge_sebelumjadiapi_seal.png'
    im.save(out, 'PNG')
    print(f'Created: {out.name}')

    # Badge 2: Critical Biodiversity Warning Strip
    BW, BH = 800, 220
    im2 = Image.new('RGBA', (BW, BH), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(im2)
    d2.rounded_rectangle([(10, 10), (BW - 10, BH - 10)], radius=16, fill=(20, 22, 28, 245), outline=C_ORANGE, width=3)
    # Caution diagonal accent
    for x in range(0, 140, 25):
        d2.line([(x, 10), (x + 30, BH - 10)], fill=(242, 107, 43, 100), width=8)
    d2.text((160, 35), 'CRITICAL BIODIVERSITY ZONE', fill=C_ORANGE, font=FONT_BOLD)
    d2.text((160, 85), 'EKOSISTEM KUBAH GAMBUT INDONESIA', fill=C_WHITE, font=FONT_BOLD_LG)
    d2.text((160, 150), 'DILINDUNGI DARI PENGERINGAN & KARHUTLA', fill=C_MUTED, font=FONT_MONO)

    out2 = OTHER_DIR / 'badge_critical_biodiversity.png'
    im2.save(out2, 'PNG')
    print(f'Created: {out2.name}')

    # Badge 3: Swipe Indicators Sheet
    IW, IH = 1080, 260
    im3 = Image.new('RGBA', (IW, IH), (0, 0, 0, 0))
    d3 = ImageDraw.Draw(im3)

    # Style A: Pill swipe
    d3.rounded_rectangle([(80, 30), (460, 110)], radius=40, fill=(20, 24, 30, 230), outline=C_GOLD, width=2)
    d3.text((120, 52), 'GESER KE KIRI  →', fill=C_WHITE, font=FONT_BOLD)
    d3.ellipse([(410, 52), (430, 72)], fill=C_GOLD)

    # Style B: Dots indicator
    for i in range(5):
        cx = 580 + i * 40
        cy = 70
        color = C_GOLD if i == 0 else (120, 125, 135, 200)
        d3.ellipse([(cx - 8, cy - 8), (cx + 8, cy + 8)], fill=color)

    # Style C: Clean bracket swipe indicator
    d3.rounded_rectangle([(80, 140), (W := 1000, 220)], radius=12, fill=(16, 20, 26, 220), outline=C_BORDER, width=1)
    d3.text((120, 162), 'PELAJARI DAMPAKNYA PADA FAUNA & IKLIM', fill=C_MUTED, font=FONT_SANS)
    d3.text((820, 162), 'SWIPE  >>>', fill=C_ORANGE, font=FONT_BOLD)

    out3 = OTHER_DIR / 'element_swipe_indicators.png'
    im3.save(out3, 'PNG')
    print(f'Created: {out3.name}')

    # Badge 4: Sticker Jaga Gambut
    SW = 600
    im4 = Image.new('RGBA', (SW, SW), (0, 0, 0, 0))
    d4 = ImageDraw.Draw(im4)
    d4.rounded_rectangle([(20, 20), (SW - 20, SW - 20)], radius=30, fill=(24, 28, 34, 245), outline=C_GREEN, width=4)
    d4.text((60, 70), '#JagaGambut', fill=C_GREEN, font=FONT_TITLE)
    d4.text((60, 150), 'Keringkan Gambut,', fill=C_WHITE, font=FONT_BOLD_LG)
    d4.text((60, 220), 'Undang Api.', fill=C_ORANGE, font=FONT_BOLD_LG)
    d4.text((60, 310), 'Basahkan Gambut,', fill=C_WHITE, font=FONT_BOLD_LG)
    d4.text((60, 380), 'Jaga Masa Depan.', fill=C_GREEN, font=FONT_BOLD_LG)
    d4.text((60, 480), 'WWF INDONESIA · #SebelumJadiApi', fill=C_MUTED, font=FONT_MONO)

    out4 = OTHER_DIR / 'sticker_jaga_gambut.png'
    im4.save(out4, 'PNG')
    print(f'Created: {out4.name}')

# -------------------------------------------------------------
# 8. ATMOSPHERE OVERLAYS (Smoke, embers)
# -------------------------------------------------------------
def make_overlays():
    W, H = 1080, 1350
    # 1. Glowing Embers / Spark Overlay
    im_ember = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d_emb = ImageDraw.Draw(im_ember)
    random.seed(42)
    for _ in range(160):
        ex = random.randint(0, W)
        ey = random.randint(0, H)
        size = random.randint(2, 8)
        alpha = random.randint(120, 240)
        # Gradient orange to golden ember
        c_choice = random.choice([
            (255, 180, 40, alpha),
            (255, 110, 30, alpha),
            (255, 60, 20, alpha)
        ])
        d_emb.ellipse([(ex, ey), (ex + size, ey + size)], fill=c_choice)
        # soft outer glow
        if size > 4:
            d_emb.ellipse([(ex - 4, ey - 4), (ex + size + 4, ey + size + 4)], fill=(255, 100, 20, alpha // 3))

    out_emb = OTHER_DIR / 'overlay_embers_spark.png'
    im_ember.save(out_emb, 'PNG')
    print(f'Created: {out_emb.name}')

    # 2. Peat Fog & Mist Overlay
    im_smoke = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d_smk = ImageDraw.Draw(im_smoke)
    # Draw soft diffuse smoky cloud shapes
    for _ in range(40):
        sx = random.randint(-100, W + 100)
        sy = random.randint(H // 3, H + 100)
        rx = random.randint(200, 500)
        ry = random.randint(100, 260)
        alpha = random.randint(15, 45)
        d_smk.ellipse([(sx - rx, sy - ry), (sx + rx, sy + ry)], fill=(200, 205, 215, alpha))

    # Apply Gaussian blur for super soft organic smoke texture
    im_smoke = im_smoke.filter(ImageFilter.GaussianBlur(radius=60))
    out_smk = OTHER_DIR / 'overlay_smoke_particles.png'
    im_smoke.save(out_smk, 'PNG')
    print(f'Created: {out_smk.name}')

if __name__ == '__main__':
    print('Generating Instagram Frames & Design Assets...')
    make_frame_feed_portrait()
    make_frame_feed_square()
    make_frame_reels_vertical()
    make_seamless_carousel()
    make_polaroid_frame()
    make_split_frame()
    make_campaign_badges()
    make_overlays()
    print('ALL FRAMES & GRAPHIC ASSETS GENERATED SUCCESSFULLY!')
