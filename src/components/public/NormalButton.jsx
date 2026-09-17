import styles from '#styles/NormalButton.module.css';

export function NormalButton({ children, isClick }) {
  return (
    <button onClick={isClick} className={styles.buttonBody}>
      {children}
    </button>
  );
}
