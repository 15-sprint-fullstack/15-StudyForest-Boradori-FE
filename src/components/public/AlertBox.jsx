import styles from '#styles/AlertBox.module.css';

export function AlertBox({ children }) {
  return <div className={styles.alertContainer}>{children}</div>;
}
