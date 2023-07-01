"use client";

import React from "react";
import styles from "./adminDashboard.module.scss";
import AdminUsers from "../adminUsers/adminUsers";
//import AdminReview from "../adminReview/adminReview";
//import AdminDistribution from "../adminDistribution/adminDistribution";
import AdminTableSeller from "../adminTableSellers/adminTableSeller";
import AdminTableBuyers from "../adminTableBuyers/adminTableBuyers";
import AdminDisabled from "../adminDisabled/adminDisabled";
import AdminAble from "../adminAble.tsx/adminAble";
import AdminTableEarners from "../adminTableEarners/adminTableEarners";

export default function adminDashboard() {
  return (
    <div className={styles.dashboard}>
      <AdminUsers />
      <div className={styles.container}>
        {/* <AdminReview /> */}
        {/* <AdminDistribution /> */}
      </div>
      <div className={styles.container}>
        <AdminTableEarners />
        <AdminTableSeller />
        <AdminTableBuyers />
      </div>
      <h1>User Managment</h1>
      <div className={styles.container}>
        <AdminDisabled />
        <AdminAble />
      </div>
    </div>
  );
}
