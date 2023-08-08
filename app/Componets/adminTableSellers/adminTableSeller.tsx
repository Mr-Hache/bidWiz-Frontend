"use client";

import React from "react";
import { useEffect, useState } from "react";
import styles from "../adminTableEarners/adminTableEarners.module.scss";

export interface UserFormValues {
  name: string;
  experience: {
    expJobs: number;
  };
  image: string;
}

export default function adminTableSeller() {
  const [sellerData, setSellerData] = useState<UserFormValues[]>([]);

  useEffect(() => {
    fetch(
      "https://bid-wiz-backend.vercel.app/users/top-sellers"
    )
      .then((response) => response.json())
      .then((data) => {
        setSellerData(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Best Sellers</h1>
      <div className={styles.containerTable}>
        {sellerData.slice(0, 5).map((seller) => (
          <div className={styles.tableContents}>
            <img
              className={styles.image}
              src={seller.image}
              alt={""}
              width="50"
              height="50"
            />
            <div className={styles.text}>
              <p>{seller.name}</p>
              <p>
                <b>{seller.experience.expJobs} class</b>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
