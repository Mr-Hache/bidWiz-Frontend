import Link from "next/link";
import styles from "./navbar.module.scss";
import { FaHatWizard } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className={styles.navCont}>
      <div className={styles.icons}>
        <li>
          <Link href="/">
            <FaHatWizard className={styles.logo} />
          </Link>
        </li>
      </div>
      <div className={styles.links}>
        <ul className={styles.navUl}>
          <li>
            <Link href="/offerBoard">Subjects</Link>
          </li>
          <li>
            <Link href="/offerBoard">offerBoard</Link>
          </li>
        </ul>
      </div>
      <div className={styles.buttons}>
        <h3 className={styles.log}>
          <Link href="/login" passHref>
            Login
          </Link>
        </h3>
        <button className={styles.button2}>
          <Link href="/register" passHref>
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
}
