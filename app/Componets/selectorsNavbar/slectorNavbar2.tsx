import { useRef, useState } from "react";
import styles from "./selectorNavbar.module.scss";

export default function slectorNavbar1() {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropdown = (state: boolean) => {
    setOpen(!state);
  };
  const handleClickDropdown = (event: any) => {
    if (open && !dropdownRef.current?.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  window.addEventListener("click", handleClickDropdown);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownToggle}>
        <a onClick={(event) => handleDropdown(open)}>Subjects</a>
      </div>
      {open && (
        <div className={styles.containerColumn}>
          <div className={styles.column}>
            <ul className={styles.list}>
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
            <ul className={styles.list}>
              <li>
                <a href="/">Accounting</a>
              </li>
              <li>
                <a href="/">Economics</a>
              </li>
              <li>
                <a href="/">Administration</a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <ul className={styles.list}>
              <li>
                <a href="/">Mathematics</a>
              </li>
              <li>
                <a href="/">Programming</a>
              </li>
              <li>
                <a href="/">Computer Sc.</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
