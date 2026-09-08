import { Link, useLocation } from 'react-router-dom';
import styles from '/src/styles/Navigation.module.css';
import logoIcon from '/src/assets/img_logo.svg';

export function Navigation() {
  const location = useLocation();
  console.log(location);
  return (
    <div className={styles.navBody}>
      <Link to="/">
        <img src={logoIcon} className={styles.navLogo} />
      </Link>
      {location.pathname === '/' ? (
        <Link to="/makestudy" className={styles.makeStudyButton}>
          스터디 만들기
        </Link>
      ) : (
        ''
      )}
    </div>
  );
}
