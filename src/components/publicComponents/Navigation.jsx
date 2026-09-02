import { Link, useLocation } from 'react-router-dom';
import styles from '/src/styles/Navigation.module.css';

export function Navigation() {
  return (
    <div className={styles.navBody}>
      <Link to="/">
        <img src="src\assets\img_logo.svg" className={styles.navLogo} />
      </Link>
      <Link to="/makestudy" className={styles.makeStudyButton}>
        스터디 만들기
      </Link>
    </div>
  );
}
