from pathlib import Path
from PIL import Image
import json
root=Path(r'C:\Users\corne\.codex\generated_images\01a1be5a-c997-7e32-b6ac-58a1d2809e95')
out=Path('public/assets/images/before-the-fire')
records=[]
for src,name in [
 ('exec-02da3563-73eb-4014-8550-d53f9ea5bbcd.png','orangutan-grounded.webp'),
 ('exec-b2bca776-545a-4e9b-8bea-1d4c19ec2001.png','orangutan-drying.webp'),
 ('exec-09f75890-59bc-4d22-8ddb-11b5d4e45cae.png','orangutan-risk.webp'),
 ('exec-4d3d6f77-f674-448a-b421-842070fe1546.png','orangutan-burning.webp'),
 ('exec-c7f9ffc1-c01a-4408-8305-1a4914f93c30.png','orangutan-loss.webp')
]:
 im=Image.open(root/src);im.thumbnail((1000,850));assert im.mode=='RGBA' and im.getchannel('A').getextrema()==(0,255)
 im.save(out/name,quality=87,method=6)
 records.append(dict(file=name,source=src,size=im.size,bytes=(out/name).stat().st_size,transparent=True))
 print(name,im.size,(out/name).stat().st_size)
(out/'wildlife-provenance.json').write_text(json.dumps(dict(created='2026-11-10',method='OpenAI ImageGen bawaan, cutout orisinal; WebP quality 87',description='Lima pose satu orangutan: hidup, gelisah, lemas, terkulai, lalu kehilangan non-grafis. Skenario artistik, bukan dokumentasi satwa individual atau kejadian nyata.',promptFile='wildlife-prompts.json',assets=records),ensure_ascii=False,indent=2),encoding='utf-8')
