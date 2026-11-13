from pathlib import Path
import numpy as np
import wave
sr=22050; duration=48; n=sr*duration
t=np.arange(n,dtype=np.float64)/sr
sound=np.zeros((n,2))
for i,f in enumerate([73.416,110.0,146.832,155.563,220.0]):
    amp=[.15,.065,.05,.025,.018][i]
    envelope=.64+.18*np.sin(2*np.pi*t/duration*(i+1)+i)
    # Nada panjang orisinal, tanpa sampel musik pihak lain.
    for ch in range(2):
        sound[:,ch]+=amp*envelope*np.sin(2*np.pi*f*t+(ch-.5)*.16*i)
rng=np.random.default_rng(714)
noise=rng.standard_normal(n)
freq=np.fft.rfftfreq(n,1/sr)
spectrum=np.fft.rfft(noise)/np.maximum(freq,45)**.65
spectrum[freq>1500]=0
wind=np.fft.irfft(spectrum,n=n);wind/=np.max(np.abs(wind))
sound+=wind[:,None]*.025*(.7+.2*np.sin(2*np.pi*t[:,None]/12))
# Loop halus: crossfade ujung, lalu normalisasi konservatif tanpa clipping.
fade=int(sr*2)
blend=np.linspace(0,1,fade)[:,None]
sound[-fade:]=sound[-fade:]*(1-blend)+sound[:fade]*blend
sound=sound[fade:]
sound*=.74/np.max(np.abs(sound))
out=Path('tmp/before-fire-tension.wav')
with wave.open(str(out),'wb') as f:
    f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr);f.writeframes((sound*32767).astype('<i2').tobytes())
print(out)
