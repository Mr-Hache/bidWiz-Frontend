import { useEffect, useRef, useState } from "react";
import styles from "./selectorNavbar.module.scss";

export default function slectorNavbar() {
  function toggleDropdown0() {
    const dropdownContent0 = document.getElementById(
      "dropdownContent0"
    ) as HTMLUListElement;
    dropdownContent0.style.display =
      dropdownContent0.style.display === "block" ? "none" : "block";
  }

  function toggleDropdown() {
    const dropdownContent = document.getElementById(
      "dropdownContent"
    ) as HTMLUListElement;
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  }

  return (
    <div className={styles.links}>
      {/* LANGUAGES DROPDOWN */}

      <div className={styles.dropdown}>
        <ul className={styles.navUl}>
          <li>
            <div className={styles.dropdownToggle} onClick={toggleDropdown0}>
              <a>Languages</a>
            </div>
          </li>
        </ul>
        <div className={styles.dropdownContent} id="dropdownContent0">
          <div className={styles.containerColumn}>
            <div className={styles.column}>
              <ul>
                <li>
                  <a href="/">English</a>
                </li>
                <li>
                  <a href="/">Spanish</a>
                </li>
                <li>
                  <a href="/">Portuguese</a>
                </li>
              </ul>
            </div>
            <div className={styles.column}>
              <ul>
                <li>
                  <a href="/">German</a>
                </li>
                <li>
                  <a href="/">French</a>
                </li>
                <li>
                  <a href="/">Chinese</a>
                </li>
              </ul>
            </div>
            <div className={styles.column}>
              <ul>
                <li>
                  <a href="/">Japanese</a>
                </li>
                <li>
                  <a href="/">Russian</a>
                </li>
                <li>
                  <a href="/">Italian</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SUBJECT DROPDOWN */}

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
