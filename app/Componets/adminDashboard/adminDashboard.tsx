"use client";

import React from "react";
import styles from "./adminDashboard.module.scss";
import AdminUsers from "../adminUsers/adminUsers";
import AdminSales from "../adminSales/adminSales";
import AdminDistribution from "../adminDistribution/adminDistribution";
import AdminTableSeller from "../adminTableSellers/adminTableSeller";
import AdminTableBuyers from "../adminTableBuyers/adminTableBuyers";
import AdminDisabled from "../adminDisabled/adminDisabled";
import AdminTableEarners from "../adminTableEarners/adminTableEarners";

export default function adminDashboard() {
  return (
    <div className={styles.dashboard}>
      <AdminUsers />
      <div className={styles.container}>
        <AdminSales />
        <AdminDistribution />
      </div>
      <div className={styles.container}>
        <AdminTableEarners />
        <AdminTableSeller />
        <AdminTableBuyers />
      </div>
      <div>
        <AdminDisabled />
      </div>
    </div>
  );
}
