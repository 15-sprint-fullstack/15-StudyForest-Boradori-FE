import { Link } from 'react-router-dom';
import styles from '#styles/MoveButton.module.css';
import arrowIcon from '../../assets/ic_arrow_right.svg';

export function MoveButton({ route, children }) {
  return (
    <Link to={route} className={styles.moveButton}>
      {children}
      <img src={arrowIcon} />
    </Link>
  );
}
