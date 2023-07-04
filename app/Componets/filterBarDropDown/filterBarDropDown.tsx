"use client";

import React from "react";
import { useRef, useState, useEffect } from "react";
import styles from "./filterBarDropDown.module.scss";
import FilterBar from "../filterBar/filterBar";
import { HiChevronLeft } from "react-icons/hi";

export default function filterBarDropDown() {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleClickDropdown = (event: MouseEvent) => {
    if (
      open &&
      dropdownRef.current &&
      selectRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !selectRef.current.contains(event.target as Node)
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
            <FilterBar selectRef={selectRef} />
          </div>
        )}
      </div>
      <div className={styles.dropdown} ref={dropdownRef}>
        <a onClick={handleDropdownToggle}>
          Filters <HiChevronLeft />
        </a>
      </div>
    </div>
  );
}
