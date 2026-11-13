import json,re,hashlib,subprocess,sys
from pathlib import Path
r=Path.cwd();report=[]
fix={'PENANGGA':'Pernah nggak...','kehendinya':'keheningan','pahun':'pohon','pahunan':'pepohonan'}
for p in sorted((r/'src/content/meditations/aligned').glob('*.json')):
 e=json.loads(p.read_text(encoding='utf-8'));cues=[];group=[]
 if 'words' not in e:e['words']=json.loads((r/'docs/meditations-word-timestamps'/p.name).read_text(encoding='utf-8'))
 normalized=[]
 for word in e['words']:
  word=dict(word)
  if word['text'].startswith('-') and normalized:
   normalized[-1]['text']+=word['text'];normalized[-1]['end']=word['end']
  else:normalized.append(word)
 e['words']=normalized
 def flush():
  if group:
   text=' '.join(w['text'] for w in group)
   text=re.sub(r'\s+-','-',text).replace('di daunan','dedaunan')
   cues.append({'id':e['id']+'-'+str(len(cues)+1).zfill(3),'start':group[0]['start'],'end':group[-1]['end'],'text':text})
   group.clear()
 for raw in e['words']:
  w=dict(raw);w['text']=fix.get(w['text'],w['text'])
  if group and (w['start']-group[-1]['end']>.55 or len(' '.join(x['text'] for x in group))+len(w['text'])>48 or (len(group)>=1 and w['text'].strip('.,!?') in {'Coba','Suara','Bukan','Tapi','Sekarang','Bayangkan','Padahal','Ketika','Kalau','Ada','Kita','Dan'})):flush()
  group.append(w)
  if re.search(r'[.!?]$',w['text']):flush()
 flush();e['cues']=cues
 previous=0
 for c in cues:
  assert 0<=c['start']<c['end']<=e['alignment']['duration']+.05
  assert c['start']>=previous,(p,c)
  assert len(c['text'])<=49
  previous=c['end']
 assert len(e['words'])>100
 audio=r/'public'/e['audioCandidatePath'].lstrip('/')
 assert hashlib.sha256(audio.read_bytes()).hexdigest()==e['alignment']['audioSha256']
 samples=[]
 for target in [0,e['alignment']['duration']*.25,e['alignment']['duration']*.5,e['alignment']['duration']*.75,e['alignment']['duration']-5]:
  c=min(cues,key=lambda c:abs(c['start']-target));samples.append(c)
 report.append({'id':e['id'],'words':len(e['words']),'cues':len(cues),'samples':samples,'validation':'bounds/order/hash checked; machine alignment, not human listening certification'})
 audit=r/'docs/meditations-word-timestamps';audit.mkdir(exist_ok=True)
 (audit/p.name).write_text(json.dumps(e['words'],ensure_ascii=False,indent=2),encoding='utf-8')
 e['wordCount']=len(e.pop('words'))
 p.write_text(json.dumps(e,ensure_ascii=False,indent=2),encoding='utf-8')
(r/'docs/MEDITATIONS_ALIGNMENT_QA.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps([{k:v for k,v in e.items() if k!='samples'} for e in report],indent=2))




# Koreksi editorial dijalankan terakhir agar regenerasi ASR tidak memunculkan typo lagi.
subprocess.run([sys.executable, str(r/'scripts/correct-meditation-text.py')],check=True)
for item in report:
 final=json.loads((r/'src/content/meditations/aligned'/(item['id']+'.json')).read_text(encoding='utf-8'))
 by_id={cue['id']:cue for cue in final['cues']}
 item['cues']=len(final['cues'])
 item['samples']=[by_id[cue['id']] for cue in item['samples'] if cue['id'] in by_id]
(r/'docs/MEDITATIONS_ALIGNMENT_QA.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
