import shutil
from pathlib import Path
from PIL import Image

brain_dir = Path(r'C:\Users\corne\.gemini\antigravity\brain\b5e3ddbf-cfd3-46ff-b469-51518d8f5a24')
animal_dest = Path('public/assets/design_instagram/asset_hewan')
env_dest = Path('public/assets/design_instagram/aset_lingkungan')

animal_dest.mkdir(parents=True, exist_ok=True)
env_dest.mkdir(parents=True, exist_ok=True)

animals = {
    'gajah_sumatra_peatland_1794510165173.jpg': 'gajah_sumatra_rawa_gambut',
    'harimau_sumatra_peatland_1794510182480.jpg': 'harimau_sumatra_kanopi_gambut',
    'bekantan_borneo_peatland_1794510200971.jpg': 'bekantan_sungai_air_hitam',
    'rangkong_badak_hornbill_1794510218009.jpg': 'burung_rangkong_badak_close_up',
    'tapir_asia_peatland_1794510237928.jpg': 'tapir_asia_tepi_gambut'
}

for src_name, clean_name in animals.items():
    src_path = brain_dir / src_name
    if src_path.exists():
        # Copy high-res JPG directly
        shutil.copy2(src_path, animal_dest / f'{clean_name}.jpg')
        # Also save as WebP for compact fast loading
        im = Image.open(src_path)
        im.save(animal_dest / f'{clean_name}.webp', 'WEBP', quality=92)
        print(f'Processed Animal: {clean_name} ({im.size[0]}x{im.size[1]})')
    else:
        print(f'Missing: {src_path}')

landscapes = {
    'gambut_drone_sungai_air_hitam_1794510165471.jpg': 'lanskap_drone_sungai_air_hitam',
    'gambut_kanopi_fajar_sunrays_1794510181916.jpg': 'kanopi_fajar_sunrays_pohon_raksasa',
    'gambut_bawah_air_akar_1794510202151.jpg': 'kubah_gambut_bawah_air_spons_karbon',
    'gambut_kontras_ancaman_asap_1794510219956.jpg': 'kontras_hutan_asli_vs_ancaman_asap'
}

for src_name, clean_name in landscapes.items():
    src_path = brain_dir / src_name
    if src_path.exists():
        # Copy high-res JPG directly
        shutil.copy2(src_path, env_dest / f'{clean_name}.jpg')
        # Also save as WebP
        im = Image.open(src_path)
        im.save(env_dest / f'{clean_name}.webp', 'WEBP', quality=92)
        print(f'Processed Landscape: {clean_name} ({im.size[0]}x{im.size[1]})')
    else:
        print(f'Missing: {src_path}')

print('DONE!')
