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
      <ul className={styles.navUl}>
        <li>
          <Link href="/offerBoard">Subjects</Link>
        </li>
        <li>
          <Link href="/offerBoard">offerBoard</Link>
        </li>
      </ul>
      <div className={styles.buttons}>
        <button className={styles.button1}>
          <Link href="/offerBoard" passHref>
            Find Wizard
          </Link>
        </button>
        <button className={styles.button2}>
          <Link href="/register" passHref>
            Become Wizard
          </Link>
        </button>
      </div>
    </div>
  );
}
