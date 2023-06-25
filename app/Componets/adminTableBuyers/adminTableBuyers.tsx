"use client";

import React from "react";
import { useEffect, useState } from "react";
import styles from "../adminTableEarners/adminTableEarners.module.scss";

export interface UserFormValues {
  totalPaid: number;
  user_info: {
    name: string;
    image: string;
  };
}

export default function adminTableBuyer() {
  const [buyerData, setBuyerData] = useState<UserFormValues[]>([]);

  useEffect(() => {
    fetch(
      "https://bidwiz-backend-production-db77.up.railway.app/jobs/top-buyers"
    )
      .then((response) => response.json())
      .then((data) => {
        setBuyerData(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Best Buyers</h1>
      <div className={styles.containerTable}>
        {buyerData.slice(0, 5).map((buyer) => (
          <div className={styles.tableContents}>
            <div className={styles.image}>
              <img
                className={styles.image}
                src={buyer.user_info.image}
                alt={""}
                width="50"
                height="50"
              />
            </div>
            <div className={styles.text}>
              <p>{buyer.user_info.name}</p>
              <p>
                <b>U$D {buyer.totalPaid}</b>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
