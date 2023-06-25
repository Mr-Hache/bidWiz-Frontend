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
    console.log("handleAbleUser called with userId: ", userId);
    try {
      const response = await ableUser({ _id: userId });
      console.log("Mutation response: ", response);
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
          <p>&#9733;</p>
          <p>Name</p>
          <p>E-mail</p>
        </div>
        {filteredUsers
          ?.filter((user) => user.isDisabled)
          .sort((a, b) => b.reviews - a.reviews)
          .map((user: User) => (
            <div className={styles.contens}>
              <img className={styles.image} src={user.image} alt={user.name} />
              <div className={styles.text}>
                <p>{Number(user.reviews.toFixed(1))}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
              {user.isDisabled && (
                <button
                  onClick={() => handleAbleUser(user._id)}
                  disabled={ableLoading}
                  className={styles.botton2}
                >
                  Able User
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminAble;
