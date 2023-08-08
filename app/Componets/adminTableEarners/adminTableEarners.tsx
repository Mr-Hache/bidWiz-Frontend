"use client";

import React from "react";
import { useEffect, useState } from "react";
import styles from "./adminTableEarners.module.scss";

export interface UserFormValues {
  totalEarned: number;
  user_info: {
    name: string;
    image: string;
  };
}

export default function adminTableEarners() {
  const [earnersData, setEarnersData] = useState<UserFormValues[]>([]);

  useEffect(() => {
    fetch(
      "https://bid-wiz-backend.vercel.app/jobs/top-earners"
    )
      .then((response) => response.json())
      .then((data) => {
        setEarnersData(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Highest Earners</h1>
      <div className={styles.containerTable}>
        {earnersData.slice(0, 5).map((seller) => (
          <div className={styles.tableContents}>
            <img
              className={styles.image}
              src={seller.user_info.image}
              alt={""}
              width="50"
              height="50"
            />

            <div className={styles.text}>
              <p>{seller.user_info.name}</p>
              <p>
                <b> U$D {seller.totalEarned}</b>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
