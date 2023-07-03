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

export default function slectorNavbar() {
  const { theme } = useTheme();

  //---Filter---

  const router = useRouter();

  const dispatch = useAppDispatch();

  const pathname = usePathname();

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

  const onClickFilterSubject = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const nameFilter: string = event.currentTarget.id;

    dispatch(setSubjects([nameFilter]));
    dispatch(setLanguages([]));
  };

  const onClickFilterLanguage = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const nameFilter: string = event.currentTarget.id;

    dispatch(setLanguages([nameFilter]));
    dispatch(setSubjects([]));
  };

  const onClickAllWizards = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    dispatch(setLanguages([]));
    dispatch(setSubjects([]));
    if (pathname !== "/offerBoard") {
      router.push("/offerBoard");
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownToggle}>
        <a onClick={handleDropdownToggle} style={{ display: "inline-block" }}>
          Uncover Your Wizard
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
          className={`${styles.container} ${
            theme === "dark" ? styles.containerDark : styles.containerLight
          }`}
        >
          <div className={styles.containerBy}>
            {" "}
            <p className={styles.title}> By Subject</p>
            <ul className={styles.subjectList}>
              {subjectsList.map((filter, index) => (
                <div className={styles.line} key={index}>
                  <label>
                    <span id={filter} onClick={onClickFilterSubject}>
                      {filter}
                    </span>
                  </label>
                </div>
              ))}
            </ul>
          </div>

          <div className={styles.containerBy}>
            <p className={styles.title}>By Language</p>
            <ul className={styles.languageList}>
              {languagesList.map((filter, index) => (
                <div className={styles.line} key={index}>
                  <label>
                    <span id={filter} onClick={onClickFilterLanguage}>
                      {filter}
                    </span>
                  </label>
                </div>
              ))}
            </ul>
          </div>
          <div className={styles.containerAll}>
            <span onClick={onClickAllWizards}>View all</span>
          </div>
        </div>
      )}
    </div>
  );
}
