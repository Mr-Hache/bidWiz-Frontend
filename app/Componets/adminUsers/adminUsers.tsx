"use client";

import React from "react";
import styles from "./adminUsers.module.scss";
import { FaGraduationCap } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { setWizards } from "@/app/redux/services/wizardsSlice";
import {
  useGetWizardsQuery,
  useGetUsersQuery,
} from "@/app/redux/services/userApi";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";

export default function adminUsers() {
  const dispatch = useAppDispatch();
  const { data: users } = useGetUsersQuery(null);
  const [jobsData, setJobsData] = useState({ totalSales: 0, totalRevenue: 0 });

  //-------------USERS---------------

  useEffect(() => {}, [users]);

  const isStudents = users?.filter(
    (item) => item.isWizard === false && item.isDisabled === false
  );
  const isWizards = users?.filter(
    (item) => item.isWizard === true && item.isDisabled === false
  );

  //--------------SALES AND REVENUE------------

  useEffect(() => {
    fetch("https://bidwiz-backend-production-db77.up.railway.app/jobs/totals")
      .then((response) => response.json())
      .then((data) => {
        setJobsData(data);
      });
  }, []);

  let totalRevenue = jobsData.totalRevenue
    .toLocaleString("en", {
      minimumFractionDigits: 0,
    })
    .replace(",", ".");

  return (
    <div className={styles.containerCubes}>
      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>{isStudents?.length}</h1>
          <FaGraduationCap className={styles.icon} />
        </div>
        <h2>Enabled Students</h2>
      </div>
      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>{isWizards?.length}</h1>
          <FaChalkboardTeacher className={styles.icon} />
        </div>
        <h2>Enabled Wizards</h2>
      </div>

      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>{users?.length}</h1>
          <FaUsers className={styles.icon} />
        </div>
        <h2>Total Users</h2>
      </div>

      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>{jobsData.totalSales}</h1>
          <FaBookOpen className={styles.icon} />
        </div>
        <h2>Total Classes</h2>
      </div>
      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>{totalRevenue}</h1>
        </div>
        <h2>Total Revenue</h2>
      </div>
    </div>
  );
}
