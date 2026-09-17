import styles from '#styles/Tag.module.css';

export function Tag({ emoji, count }) {
  return (
    <div className={styles.tagContainer}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.count}>{count}</span>
    </div>
  );
}
