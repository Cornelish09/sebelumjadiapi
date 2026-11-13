from pathlib import Path
from PIL import Image
import json
root=Path(r'C:\Users\corne\.codex\generated_images\01a1be5a-c997-7e32-b6ac-58a1d2809e95')
out=Path('public/assets/images/before-the-fire')
files=[
('exec-4f9b9b32-1017-4b0e-aa66-7aef9bd6d86b.png','forest-alive.webp',1920),
('exec-6b85b66b-69f5-4ae3-b537-9a4e3346cff3.png','forest-drying.webp',1920),
('exec-23971656-bce4-427e-bab3-b846f2380fa7.png','forest-burning.webp',1920),
('exec-81a0867e-225a-421b-b5d4-286a7c9d22f3.png','forest-ash.webp',1920),
('exec-4b5ebb0c-bb9a-48db-8af4-d1d1c5310e37.png','tree-alive.webp',1200),
('exec-5425a9a7-31ca-4662-a1ce-5bdee3f974b3.png','tree-ash.webp',1200),
('exec-2ab1aeca-8b3f-4a3a-bb44-a2c5567908fe.png','foreground-alive.webp',1672),
('exec-6887df44-db24-499e-9a2f-c3b79575f9ea.png','foreground-ash.webp',1672),
]
records=[]
for source,name,width in files:
 im=Image.open(root/source); im.thumbnail((width,1600)); im.save(out/name,quality=87,method=6)
 alpha=im.mode=='RGBA' and im.getchannel('A').getextrema()==(0,255)
 records.append(dict(file=name,source=source,size=im.size,transparent=alpha,bytes=(out/name).stat().st_size))
 print(name,im.size,alpha,(out/name).stat().st_size)
(out/'provenance.json').write_text(json.dumps(dict(created='2026-11-09',method='OpenAI ImageGen; penyuntingan state dari satu kamera; WebP quality 87',notes='Skenario ilustratif. State berbeda disejajarkan lewat komposisi acuan; bukan dokumentasi kejadian atau rekonstruksi volumetrik. Layer batang/akar dan foreground benar-benar memiliki alpha terpisah.',reusedOriginals=['/assets/hero/canopy-layer.webp','/assets/images/why-it-matters/orangutan-bridge.webp'],assets=records),ensure_ascii=False,indent=2),encoding='utf-8')
