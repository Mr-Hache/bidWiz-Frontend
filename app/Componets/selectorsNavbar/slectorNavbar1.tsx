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
        <a onClick={(event) => handleDropdown(open)}>Languages</a>
      </div>
      {open && (
        <div className={styles.containerColumn}>
          <div className={styles.column}>
            <ul className={styles.list}>
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
            <ul className={styles.list}>
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
            <ul className={styles.list}>
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
      )}
    </div>
  );
}
