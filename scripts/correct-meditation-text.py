"""Menerapkan koreksi editorial tanpa mengubah timestamp hasil alignment."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
patch=json.loads((root/'src/content/meditations/text-corrections.json').read_text(encoding='utf-8'))['corrections']
for p in (root/'src/content/meditations/aligned').glob('*.json'):
 e=json.loads(p.read_text(encoding='utf-8'));fixed=[]
 for c in e['cues']:
  change=patch.get(c['id'])
  if change:
   assert c['text'] in (change['from'],change['to']),(c['id'],'Cue berubah; tinjau ulang koreksi')
   if change['to'] is None:continue
   c['text']=change['to']
  fixed.append(c)
 e['cues']=fixed
 p.write_text(json.dumps(e,ensure_ascii=False,indent=2),encoding='utf-8')
print('Koreksi teks diterapkan; start/end seluruh cue yang dipertahankan tidak berubah.')
