"use client";

import styles from "./hero.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import landing1 from "../../src/images/landing/landing2.png";

export default function hero() {
  const { theme } = useTheme();

  return (
    <section className={styles.hero}>
      <div
        className={`${styles.container} ${
          theme === "dark" ? styles.containerDark : styles.containerLight
        }`}
      >
        <div className={styles.containerText}>
          <div className={styles.text}>
            <h1>Unlock Your Potential, Together!</h1>

            <h4>Ditch the Old Ways. Harness the Best Minds.</h4>
            <h4>Right Now. Right Here.</h4>
          </div>
          <div className={styles.buttons}>
            <button className={styles.button1}>
              <Link href="/offerBoard" passHref>
                Find Wizard
              </Link>
            </button>
            <button className={styles.button2}>
              <Link href="/register" passHref>
                Become BidWiz
              </Link>
            </button>
          </div>
        </div>
        <div className={styles.containerImg}>
          <Image
            src={landing1}
            alt=""
            style={{ width: "23vw", height: "35vw" }}
          />
        </div>
      </div>
      <div className={styles.whyText}>
        <h1>Discover Why BidWiz Make a Difference</h1>
      </div>
    </section>
  );
}
