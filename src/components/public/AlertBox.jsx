import styles from '#styles/AlertBox.module.css';

export function AlertBox({ alertText }) {
  return <div className={styles.alertContainer}>{alertText}</div>;
}
