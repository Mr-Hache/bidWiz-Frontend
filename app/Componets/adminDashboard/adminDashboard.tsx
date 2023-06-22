import React from "react";
import styles from "./adminDashboard.module.scss";
import AdminUsers from "../adminUsers/adminUsers";

export default function adminDashboard() {
  return (
    <div className={styles.dashboard}>
      <AdminUsers />
    </div>
  );
}
