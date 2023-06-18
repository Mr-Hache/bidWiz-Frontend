"use client";

import { useRef, useState, ChangeEvent, useEffect } from "react";
import styles from "./selectorNavbar.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setLanguages, setSubjects } from "@/app/redux/services/filtersSlice";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const languagesList = [
  "English",
  "Spanish",
  "Portuguese",
  "German",
  "French",
  "Chinese",
  "Japanese",
  "Russian",
  "Italian",
];
const subjectsList = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "Economics",
  "Law",
  "Accounting",
  "Programming",
  "Music Theory",
  "Computer Science",
  "Political Science",
  "Business Administration",
];

export default function slectorNavbar({ filter }: { filter: string }) {
  //---Filter---

  const router = useRouter();
  const languages = useAppSelector((state) => state.filters.languages);

  const dispatch = useAppDispatch();

  let filterList: string[] = [""];
  if (filter === "languages") {
    filterList = languagesList;
  } else {
    filterList = subjectsList;
  }

  // const [listLanguages, setListLanguages] = useState(
  //   languagesList.map((language) => ({
  //     name: language,

  //   }))
  // );

  // const [stateSubjectsCheckbox, setStateSubjectsCheckbox] = useState(
  //   subjectsList.map((subject) => ({
  //     name: subject,
  //     checked: false,
  //   }))
  // );

  // const handleLanguageCheckboxChange = (
  //   event: ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const updatedLanguagesCheckbox = [...stateLanguagesCheckbox];
  //   updatedLanguagesCheckbox[index].checked = event.target.checked;
  //   setStateLanguagesCheckbox(updatedLanguagesCheckbox);

  //   const selectedLanguages = updatedLanguagesCheckbox
  //     .filter((checkbox) => checkbox.checked)
  //     .map((checkbox) => checkbox.name);
  //   dispatch(setLanguages(selectedLanguages));
  // };

  // const handleSubjectCheckboxChange = (
  //   event: ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const updatedSubjectsCheckbox = [...stateSubjectsCheckbox];
  //   updatedSubjectsCheckbox[index].checked = event.target.checked;
  //   setStateSubjectsCheckbox(updatedSubjectsCheckbox);

  //   const selectedSubjects = updatedSubjectsCheckbox
  //     .filter((checkbox) => checkbox.checked)
  //     .map((checkbox) => checkbox.name);
  //   dispatch(setSubjects(selectedSubjects));
  // };

  // ----------dropDown-------------

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
        <a onClick={(event) => handleDropdown(open)}>{filter} ⮟</a>
      </div>
      {open && (
        <div className={styles.containerColumn}>
          <div className={styles.column}>
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
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
