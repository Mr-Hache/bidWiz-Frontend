"use client";

import styles from "./footer.module.scss";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import Link from "next/link";

import { useRef, useState, ChangeEvent, useEffect } from "react";
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

export default function Footer() {
  //--------Filter----------------

  const router = useRouter();
  const dispatch = useAppDispatch();

  let filterList: string[] = subjectsList;

  const pathname = usePathname();

  const onClickFilter = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const nameFilter: string = event.currentTarget.id;
    console.log(nameFilter);
    dispatch(setSubjects([nameFilter]));
    if (pathname !== "/offerBoard") {
      router.push("/offerBoard");
    }
  };

  return (
    <section className={styles.footer}>
      <div className={styles.containerMedium}>
        <div className={styles.title}>
          <h2>You can study</h2>
        </div>
        <div className={styles.subject}>
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
      </div>
      <div className={styles.containerSmall}>
        <div className={styles.icons}>
          <Link href="/not-found" className={styles.link}>
            <BsFacebook className={styles.face} />
          </Link>
          <Link href="/not-found" className={styles.link}>
            <BsInstagram className={styles.inst} />
          </Link>
          <Link href="/not-found" className={styles.link}>
            <BsTwitter className={styles.twit} />
          </Link>
          <Link href="/not-found" className={styles.link}>
            <BsYoutube className={styles.yout} />
          </Link>
          <Link href="/not-found" className={styles.link}>
            <BsLinkedin className={styles.lin} />
          </Link>
        </div>
        <div className={styles.containerCopy}>
          <small>Copyright &copy; BidWiz Company</small>
        </div>
      </div>
    </section>
  );
}
