import json,subprocess,hashlib,sys,re
from pathlib import Path
import numpy as np
from faster_whisper import WhisperModel
sys.stdout.reconfigure(encoding='utf-8')
r=Path.cwd()
m=WhisperModel('small',device='cpu',compute_type='float32',cpu_threads=4,download_root=str(r/'tmp/audio-audit-models'))
source=json.loads((r/'docs/SEBELUMJADIAPI_MEDITATIONS_TRANSCRIPTS.json').read_text(encoding='utf-8'))
for ep in source['episodes']:
 out=r/'src/content/meditations/aligned'/f"{ep['id']}.json"
 if out.exists():continue
 print('PROCESS',ep['id'],flush=True)
 p=r/'public'/ep['audioCandidatePath'].lstrip('/')
 pcm=subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-f','f32le','-ar','16000','-ac','1','pipe:1'])
 segs,info=m.transcribe(np.frombuffer(pcm,dtype=np.float32),language='id',beam_size=3,word_timestamps=True,vad_filter=False,condition_on_previous_text=False)
 words=[]
 for s in segs:
  print(ep['id'],round(s.end,1),flush=True)
  for w in s.words or []:
   if w.end>w.start and w.word.strip():words.append({'start':round(w.start,3),'end':round(min(w.end,info.duration),3),'text':w.word.strip(),'probability':round(w.probability,3)})
 cues=[];group=[]
 def flush():
  if not group:return
  cues.append({'id':ep['id']+'-'+str(len(cues)+1).zfill(3),'start':group[0]['start'],'end':group[-1]['end'],'text':' '.join(w['text'] for w in group)})
  group.clear()
 for w in words:
  if group and (w['start']-group[-1]['end']>.65 or len(' '.join(x['text'] for x in group))+len(w['text'])>58 or len(group)>=9):flush()
  if group and w['start']<group[-1]['end']:w['start']=group[-1]['end']
  if w['end']<=w['start']:continue
  group.append(w)
  if re.search(r'[.!?]$',w['text']):flush()
 flush()
 ep.update(audioContentsVerified=True,audioKind='narration',timingStatus='AUTO_ALIGNED',alignment={'audioSrc':ep['audioCandidatePath'],'duration':info.duration,'reviewedAt':'','method':'faster-whisper small multilingual CPU float32 language=id word_timestamps=True','audioSha256':hashlib.sha256(p.read_bytes()).hexdigest()},cues=cues,words=words)
 out.write_text(json.dumps(ep,ensure_ascii=False,indent=2),encoding='utf-8')
 print('DONE',ep['id'],len(words),'words',len(cues),'cues',flush=True)

