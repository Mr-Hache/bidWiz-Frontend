"use client";

import React from "react";
import styles from "./adminUsers.module.scss";
import { FaUserGraduate } from "react-icons/fa";
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

interface User {
  pricePerTwo: number;
}

export default function adminUsers() {
  const dispatch = useAppDispatch();
  const { data: users } = useGetUsersQuery(null);

  useEffect(() => {}, [users]);

  const isStudents = users?.filter((item) => item.isWizard === false);
  const isWizards = users?.filter((item) => item.isWizard === true);
  const totalClases = isWizards?.reduce(
    (total, item) => total + item.experience.expJobs,
    0
  );
  // const averagePerClass = isWizards?.map((user) => user.pricePerTwo).reduce((sum, price) => sum + price, 0);

  return (
    <div className={styles.containerCubes}>
      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>{isStudents?.length}</h1>
          <div className={styles.icon}>
            <FaUserGraduate />
          </div>
        </div>
        <h2>Students</h2>
      </div>
      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>{isWizards?.length}</h1>
          <div className={styles.icon}>
            <FaChalkboardTeacher />
          </div>
        </div>
        <h2>Wizards</h2>
      </div>

      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>{users?.length}</h1>
          <div className={styles.icon}>
            <FaUsers />
          </div>
        </div>
        <h2>Total Users</h2>
      </div>

      <div className={styles.cube}>
        <div className={styles.number}>
          <div>
            <h1>{totalClases}</h1>
          </div>
          <div>
            <div className={styles.icon}>
              <FaBookOpen />
            </div>
          </div>
        </div>
        <h2>Total Classes</h2>
      </div>
      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>U$D 2.000</h1>
        </div>
        <h2>Total Classes</h2>
      </div>
    </div>
  );
}
