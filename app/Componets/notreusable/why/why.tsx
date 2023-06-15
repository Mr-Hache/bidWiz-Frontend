"use client";

import styles from "./why.module.scss";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

import w1 from "../../../src/images/landing/w1.jpg";
import w2 from "../../../src/images/landing/w2.jpg";
import w3 from "../../../src/images/landing/w3.jpg";
import w4 from "../../../src/images/landing/w4.jpg";
import w5 from "../../../src/images/landing/w5.jpg";

export default function why() {
  return (
    <section className={styles.why}>
      <div className={styles.containerWhy}>
        <div className={styles.blockWhy}>
          <div className={styles.containerImg}>
            <Image src={w1} alt="" width={200} height={200} />
          </div>
          <h3>Access to Wizards</h3>
          <h4>
            Get direct access to a large community of wizards in different
            fields and disciplines, ready to provide advice and support in your
            academic endeavors.
          </h4>
        </div>
        <div className={styles.blockWhy}>
          <div className={styles.containerImg}>
            <Image src={w2} alt="" width={200} height={200} />
          </div>
          <h3>Quality and Trust</h3>
          <h4>
            Reviews from previous users guarantee the reputation and experience
            of the wizards. Make the right decisions when choosing the best
            option for you.
          </h4>
        </div>
        <div className={styles.blockWhy}>
          <div className={styles.containerImg}>
            <Image src={w3} alt="" width={200} height={200} />
          </div>
          <h3>Flexible Schedule</h3>
          <h4>
            Get academic help when it s convenient for you. Our app adapts to
            your schedule, connecting you with available wizards at any time.
          </h4>
        </div>
      </div>
      <div className={`${styles.containerWhy} ${styles.containerBottom}`}>
        <div className={styles.blockWhy}>
          <div className={styles.containerImg}>
            <Image src={w4} alt="" width={200} height={200} />
          </div>
          <h3>Secure and transparent</h3>
          <h4>
            You can rest easy knowing that financial arrangements with Wizards
            are made in a trustworthy manner, and the payment process is
            protected and well managed.
          </h4>
        </div>
        <div className={styles.blockWhy}>
          <div className={styles.containerImg}>
            <Image src={w5} alt="" width={200} height={200} />
          </div>
          <h3>Wide variety of topics</h3>
          <h4>
            BidWiz covers everything from academic subjects to specialized
            skills. Find help in any area of study or project, regardless of its
            level of specificity.
          </h4>
        </div>
      </div>
    </section>
  );
}
