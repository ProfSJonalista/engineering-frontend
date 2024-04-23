import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={`${styles.navbar}`}>
      <ul className={styles.navMenu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bookings">Bookings</Link>
        </li>
      </ul>
    </nav>
  );
}
