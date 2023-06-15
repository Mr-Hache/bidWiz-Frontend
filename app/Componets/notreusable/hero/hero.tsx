import styles from "./hero.module.scss";
import Image from "next/image";
import Link from "next/link";

import landing1 from "../../../src/images/landing1.jpeg";

export default function hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.containerText}>
        <div className={styles.text}>
          <h1>Unlock Your Potential, Together!</h1>

          <h4>Ditch the Old Ways. Harness the Best Minds.</h4>
          <h4>Right Now. Right Here.</h4>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button1}>
            <Link href="/wizards" passHref>
              Find Wizard
            </Link>
          </button>
          <button className={styles.button2}>
            <Link href="/register" passHref>
              Become Wizard
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.containerImg}>
        <Image
          src={landing1}
          alt=""
          style={{ width: "25vw", height: "20vw" }}
        />
      </div>
    </section>
  );
}
