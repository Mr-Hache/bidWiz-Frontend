import React from "react";
import styles from "./adminDashboard.module.scss";
import AdminUsers from "../adminUsers/adminUsers";
import AdminSales from "../adminSales/adminSales";
import AdminDistribution from "../adminDistribution/adminDistribution";

export default function adminDashboard() {
  return (
    <div className={styles.dashboard}>
      <AdminUsers />
      <div className={styles.container}>
        <AdminSales />
        <AdminDistribution />
      </div>
    </div>
  );
}
