import { Link } from 'react-router-dom';
import styles from '#styles/MoveButton.module.css';

export function MoveButton({ route, children }) {
  return (
    <Link to={route} className={styles.moveButton}>
      {children}<img src="src\assets\ic_arrow_right.svg" />
    </Link>
  );
}
