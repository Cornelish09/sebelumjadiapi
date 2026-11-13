import campaign from '../../../content/campaign.json';
import styles from '../livingTree.module.css';
export function TreeFallback({ loading = false }: {
    loading?: boolean;
}) {
    return (<p className={styles.fallback}>
      {loading ? campaign.scene.loading : campaign.scene.unavailable}
    </p>);
}
