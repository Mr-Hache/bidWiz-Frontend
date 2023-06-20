"use client";

import styles from "./landingWizards.module.scss";
import Link from "next/link";

import { setWizards } from "@/app/redux/services/wizardsSlice";
import { useGetWizardsQuery } from "@/app/redux/services/userApi";
import { useAppDispatch } from "@/app/redux/hooks";

export default function landingWizards() {
  const dispatch = useAppDispatch();
  const { data } = useGetWizardsQuery({});

  dispatch(setWizards(data));

  return (
    <section className={styles.wizards}>
      <div className={styles.title}>
        <h1>Want to learn from the best in BidWiz?</h1>
      </div>
      <div>
        <div className={styles.containerW}>
          {data?.slice(0, 6).map((user) => (
            <div className={styles.cardw} key={user._id}>
              <Link
                style={{ textDecoration: "none" }}
                href={`/detail/${user.username}`}
              >
                <div className={styles.containerImg}>
                  <img src={user.image} alt="" width={200} height={200} />
                </div>
                <div className={styles.text}>
                  <h3>{`${user.name} ${user.lastName}`}</h3>
                  <h4>
                    Gives {user.subjects.toString().split(/\W+/)[0]} classes
                  </h4>
                  <h4>
                    in {user.languages.toString().split(/\W+/)[1]} or{" "}
                    {user.languages.toString().split(/\W+/)[0]}
                  </h4>
                  <h4 className={styles.online}>Online</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button1}>
          <Link href="/offerBoard" passHref>
            Find Wizard
          </Link>
        </button>
        <button className={styles.button2}>
          <Link href="/register" passHref>
            Sign Up
          </Link>
        </button>
      </div>
    </section>
  );
}
