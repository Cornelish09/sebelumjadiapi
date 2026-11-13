import campaign from '../../content/campaign.json'
import { CinematicHero } from '../cinematic-hero/CinematicHero'
import styles from './immersiveIntro.module.css'

export function ImmersiveIntro() {
  return (
    <section className={styles.intro} aria-labelledby="campaign-title">
      <CinematicHero>
      <div className={styles.heading}>
        <p className="eyebrow">{campaign.eyebrow}</p>
        <h1 id="campaign-title">
          {campaign.headline[0]}<br />
          <span>{campaign.headline[1]}</span>
        </h1>
        <p className={styles.lead}>{campaign.introduction}</p>
      </div>
      </CinematicHero>
    </section>
  )
}
