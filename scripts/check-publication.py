import sys,time,json,concurrent.futures,requests
from pathlib import Path
from urllib.parse import quote
base=sys.argv[1].rstrip('/')
start=time.perf_counter();r=requests.get(base+'/',timeout=40);r.raise_for_status();html=r.text
assert 'type="module"' in html and 'id="root"' in html,'Unexpected landing response'
files=[p for p in Path('dist').rglob('*') if p.is_file()]
def check(p):
 path=quote(p.relative_to('dist').as_posix(),safe='/');res=requests.head(base+'/'+path,timeout=40,allow_redirects=True)
 return dict(path=path,status=res.status_code,size=p.stat().st_size)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=list(pool.map(check,files))
failed=[x for x in results if x['status']!=200]
audio='/assets/audio/jejak kehidupan/Before The Fire_The Last Breath.mp3'
res=requests.get(base+quote(audio,safe='/'),headers={'Range':'bytes=0-1023'},timeout=40,stream=True)
range_result={'status':res.status_code,'content_range':res.headers.get('Content-Range'),'type':res.headers.get('Content-Type')};res.close()
report=dict(url=base,entry_status=r.status_code,entry_seconds=round(r.elapsed.total_seconds(),3),files_checked=len(results),failed=failed,audio_range=range_result,total_check_seconds=round(time.perf_counter()-start,2))
Path('tmp/publication-check.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps(report,indent=2));assert not failed
