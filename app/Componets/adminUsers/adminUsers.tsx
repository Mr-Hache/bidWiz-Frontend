"use client";

import React from "react";
import styles from "./adminUsers.module.scss";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";

export default function adminUsers() {
  return (
    <div className={styles.containerCubes}>
      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>300</h1>
          <div className={styles.icon}>
            <FaUserGraduate />
          </div>
        </div>
        <h2>Students</h2>
      </div>
      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>100</h1>
          <div className={styles.icon}>
            <FaChalkboardTeacher />
          </div>
        </div>
        <h2>Wisards</h2>
      </div>
      <div className={styles.cube}>
        <div className={styles.number}>
          <h1>400</h1>
          <div className={styles.icon}>
            <FaUsers />
          </div>
        </div>
        <h2>Total Users</h2>
      </div>
      <div className={styles.cube}>
        <div className={styles.number}>
          <div>
            <h1>800</h1>
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
