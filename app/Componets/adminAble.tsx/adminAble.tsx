"use client";

import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useAbleUserMutation,
} from "../../redux/services/userApi";
import { User } from "../../redux/services/userApi";
import styles from "../adminDisabled/adminDisabled.module.scss";

function AdminAble() {
  const { data: users, refetch } = useGetUsersQuery(null);
  const [ableUser, { isLoading: ableLoading }] = useAbleUserMutation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleAbleUser = async (userId: string) => {
    try {
      const response = await ableUser({ _id: userId });
      refetch();
    } catch (error) {
      console.error(error);
      console.error("Mutation error: ", error);
    }
  };

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.disabled}>
      <input
        type="text"
        placeholder="Search by name"
        className={styles.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.selector}>
        <div className={styles.titles}>
          <p style={{ minWidth: "50px", maxWidth: "50px" }}>&#9733;</p>
          <p style={{ minWidth: "150px", maxWidth: "150px" }}>Name</p>
          <p style={{ minWidth: "50px", maxWidth: "50px" }}>User</p>
        </div>
        {filteredUsers
          ?.filter((user) => user.isDisabled)
          .sort((a, b) => b.reviews - a.reviews)
          .map((user: User) => (
            <div className={styles.contens}>
              <img className={styles.image} src={user.image} alt={user.name} />
              <div className={styles.text}>
                <p style={{ minWidth: "50px", maxWidth: "50px" }}>
                  {Number(user.reviews.toFixed(1))}
                </p>
                <p style={{ minWidth: "150px", maxWidth: "150px" }}>
                  {user.name}
                </p>
                <p style={{ minWidth: "50px", maxWidth: "50px" }}>
                  {user.isWizard ? "Wizard" : "Student"}
                </p>
              </div>
              {user.isDisabled && (
                <button
                  onClick={() => handleAbleUser(user._id)}
                  disabled={ableLoading}
                  className={styles.botton2}
                >
                  Able
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminAble;
