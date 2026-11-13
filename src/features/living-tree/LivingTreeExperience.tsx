import { lazy, Suspense, type ReactNode } from 'react';
import campaign from '../../content/campaign.json';
import { SceneBoundary } from './components/SceneBoundary';
import { TreeFallback } from './components/TreeFallback';
import { useSceneActivity } from './hooks/useSceneActivity';
import styles from './livingTree.module.css';
const TreeCanvas = lazy(() => import('./components/TreeCanvas'));
export function LivingTreeExperience({ children }: {
    children: ReactNode;
}) {
    const { container, moving, reduced, paused, setPaused } = useSceneActivity();
    return <figure className={styles.experience} aria-labelledby="scene-caption">
    <div ref={container} className={styles.stage}>
      <div className={styles.canvas}>
        <SceneBoundary fallback={<TreeFallback />}>
          <Suspense fallback={<TreeFallback loading/>}><TreeCanvas moving={moving}/></Suspense>
        </SceneBoundary>
      </div>
      {children}
      {!reduced && <button className={styles.motion} type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? campaign.scene.resume : campaign.scene.pause}</button>}
    </div>
    <figcaption id="scene-caption" className={styles.caption}>
      <span className="eyebrow">{campaign.scene.label}</span><span>{campaign.scene.description}</span>
    </figcaption>
  </figure>;
}
