import logo from '../assets/img_logo.svg';
import styles from '../styles/Header.module.css';


function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="공부의 숲" />
    </header>
  );
}

export default Header;
