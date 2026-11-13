# Persiapan aset aktif 2026; tidak lagi mengambil foto 2015.
from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).with_name('update-personal-2026.py')),run_name='__main__')
