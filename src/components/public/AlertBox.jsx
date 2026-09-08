import styles from '#styles/AlertBox.module.css';

export function AlertBox({ children, className }) {
  return (
    <div className={`${styles.alertContainer} ${className}`}>{children}</div>
  );
}
