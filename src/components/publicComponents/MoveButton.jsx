import { Link } from 'react-router-dom';
import styles from '/src/styles/MoveButton.module.css';

export function MoveButton({ type }) {
  return (
    <>
      {type === 'home' ? (
        <Link to="/" className={styles.moveButton}>
          홈<img src="src\assets\ic_arrow_right.svg" />
        </Link>
      ) : type === 'habit' ? (
        <Link to="/habit" className={`${styles.moveButton} ${styles.moveButtonLong}`}>
          오늘의 습관
          <img src="src\assets\ic_arrow_right.svg" />
        </Link>
      ) : (
        <Link to="/focus" className={`${styles.moveButton} ${styles.moveButtonLong}`}>
          오늘의 집중
          <img src="src\assets\ic_arrow_right.svg" />
        </Link>
      )}
    </>
  );
}
