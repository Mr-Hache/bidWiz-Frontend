import Link from "next/link";
import styles from "./navbar.module.scss";
import { FaHatWizard } from "react-icons/fa";
import SearchBar from "../searchBar/searchBar";
import SelectorNavbar from "../selectorsNavbar/selectorNavbar";

export default function Navbar() {
  return (
    <div className={styles.navCont}>
      <div className={styles.icons}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className={styles.iconsLink}>
            <FaHatWizard className={styles.logoN} />
            <h1>BidWiz</h1>
          </div>
        </Link>
      </div>
      <div className={styles.links}>
        <SelectorNavbar filter="languages" />
        <SelectorNavbar filter="subjects" />
        <SearchBar />
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
