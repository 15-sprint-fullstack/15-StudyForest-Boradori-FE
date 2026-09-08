import styles from '#styles/AlertBox.module.css';

export function Toast({ children, className }) {
  return (
    <div className={`${styles.alertContainer} ${className}`}>{children}</div>
  );
}
