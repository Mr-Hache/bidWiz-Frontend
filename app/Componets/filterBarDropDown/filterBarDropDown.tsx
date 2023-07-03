"use client";

import React from "react";
import { useRef, useState, useEffect } from "react";
import styles from "./filterBarDropDown.module.scss";
import FilterBar from "../filterBar/filterBar";

export default function filterBarDropDown() {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickDropdown = (event: MouseEvent) => {
    if (
      open &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickDropdown);

    return () => {
      document.removeEventListener("click", handleClickDropdown);
    };
  }, [open]);

  const handleDropdownToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className={styles.selectorFilter}>
      <div>
        {open && (
          <div className={styles.containerLink}>
            <FilterBar />
          </div>
        )}
      </div>
      <div className={styles.dropdown} ref={dropdownRef}>
        <a onClick={handleDropdownToggle}>Filters</a>
      </div>
    </div>
  );
}
