import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/img_logo.svg';
import styles from '../../styles/Navigation.module.css';


export function Navigation() {
  const location = useLocation();
  console.log(location);
  return (
    <div className={styles.navBody}>
      <Link to="/">
        <img src={logo} className={styles.navLogo} />
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
