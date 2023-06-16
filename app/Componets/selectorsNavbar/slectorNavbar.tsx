import styles from "./selectorNavbar.module.scss";
import Link from "next/link";

export default function slectorNavbar() {
  function toggleDropdown() {
    const dropdownContent = document.getElementById(
      "dropdownContent"
    ) as HTMLUListElement;
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  }

  return (
    <div className={styles.links}>
      <ul className={styles.navUl}>
        <li>
          <Link href="/offerBoard">offerBoard</Link>
        </li>
      </ul>

      <div className={styles.dropdown}>
        <ul className={styles.navUl}>
          <li>
            <div className={styles.dropdownToggle} onClick={toggleDropdown}>
              <a>Subjects</a>
            </div>
          </li>
        </ul>
        <div className={styles.dropdownContent} id="dropdownContent">
          <div className={styles.containerColumn}>
            <div className={styles.column}>
              <ul>
                <li>
                  <a href="/">Biology</a>
                </li>
                <li>
                  <a href="/">Physics</a>
                </li>
                <li>
                  <a href="/">Chemistry</a>
                </li>
              </ul>
            </div>
            <div className={styles.column}>
              <ul>
                <li>
                  <a href="/">Mathematics</a>
                </li>
                <li>
                  <a href="/">Computer Science</a>
                </li>
                <li>
                  <a href="/">Programming</a>
                </li>
              </ul>
            </div>
            <div className={styles.column}>
              <ul>
                <li>
                  <a href="/">Economics</a>
                </li>
                <li>
                  <a href="/">Administration</a>
                </li>
                <li>
                  <a href="/">Accounting</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
