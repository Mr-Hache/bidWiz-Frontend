"use client";

import { useRef, useState, ChangeEvent, useEffect } from "react";
import styles from "./selectorNavbar.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setLanguages, setSubjects } from "@/app/redux/services/filtersSlice";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import Link from "next/link";

const languagesList = [
  "Chinese",
  "English",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Portuguese",
  "Russian",
  "Spanish",
];
const subjectsList = [
  "Accounting",
  "Biology",
  "Business Administration",
  "Chemistry",
  "Computer Science",
  "Economics",
  "Law",
  "Mathematics",
  "Music Theory",
  "Physics",
  "Political Science",
  "Programming",
];

export default function slectorNavbar({ filter }: { filter: string }) {
  const { theme } = useTheme();

  //---Filter---

  const router = useRouter();

  const dispatch = useAppDispatch();

  let filterList: string[] = [""];
  if (filter === "languages") {
    filterList = languagesList;
  } else {
    filterList = subjectsList;
  }

  const pathname = usePathname();

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropdown = (state: boolean) => {
    setOpen(!state);
  };
  const handleClickDropdown = (event: MouseEvent) => {
    if (open && !dropdownRef.current?.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  window.addEventListener("click", handleClickDropdown);

  const onClickFilter = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const nameFilter: string = event.currentTarget.id;
    console.log(nameFilter);
    if (filter === "languages") {
      dispatch(setLanguages([nameFilter]));
      dispatch(setSubjects([]));
    } else {
      dispatch(setSubjects([nameFilter]));
      dispatch(setLanguages([]));
    }
    if (pathname !== "/offerBoard") {
      router.push("/offerBoard");
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownToggle}>
        <a
          onClick={(event) => handleDropdown(open)}
          style={{ display: "inline-block" }}
        >
          {filter}
          <div
            className={styles.arrow}
            style={{ marginLeft: "10px", display: "inline-block" }}
          >
            ⮟
          </div>
        </a>
      </div>
      {open && (
        <div
          className={
            filter === "languages"
              ? `${styles.containerColumn} ${
                  theme === "dark"
                    ? styles.containerColumnDark
                    : styles.containerColumnLight
                }`
              : `${styles.containerColumn2} ${
                  theme === "dark"
                    ? styles.containerColumn2Dark
                    : styles.containerColum2Light
                }`
          }
        >
          <div className={styles.column}>
            {filter === "languages" ? (
              <h3>Wizards speak</h3>
            ) : (
              <h3>Wizards knowledge</h3>
            )}
            <ul className={styles.list}>
              {filterList.map((filter, index) => (
                <div className={styles.line} key={index}>
                  <label>
                    <span id={filter} onClick={onClickFilter}>
                      {filter}
                    </span>
                  </label>
                </div>
              ))}
              <div className={styles.viewAll}>
                <Link
                  href="/offerBoard"
                  passHref
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h4>View all</h4>
                </Link>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
