import type { ReactNode } from 'react'
import { useSceneActivity } from '../living-tree/hooks/useSceneActivity'
import { useHeroScene } from './hooks/useHeroScene'
import styles from './cinematicHero.module.css'

export function CinematicHero({ children }: { children: ReactNode }) {
  const forceReduced=import.meta.env.DEV && new URLSearchParams(window.location.search).get('motion')==='reduce'
  const { container, moving } = useSceneActivity(forceReduced)
  const { canvas, ready } = useHeroScene(moving, false, 'balanced')
  return (
    <figure className={styles.hero}>
      <div className={styles.stage} ref={container} data-motion={moving ? 'active' : 'paused'}>
        <img className={styles.still} src="/assets/hero/forest-clean-soft.webp" alt="Pohon tropis tua dengan batang beralur dan akar berlumut di tengah hutan." fetchPriority="high" />
        <canvas ref={canvas} className={`${styles.canvas} ${ready ? styles.ready : ''}`} aria-hidden="true" />
        <div className={styles.shade} aria-hidden="true" />
        {children}
      </div>
    </figure>
  )
}
