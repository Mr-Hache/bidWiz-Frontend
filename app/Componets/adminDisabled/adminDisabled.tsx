"use client";

import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useDisableUserMutation,
} from "../../redux/services/userApi";
import { User } from "../../redux/services/userApi";
import styles from "./adminDisabled.module.scss";

function AdminDisabled() {
  const { data: users, refetch } = useGetUsersQuery(null);
  const [disableUser, { isLoading: disableLoading }] = useDisableUserMutation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDisableUser = async (userId: string) => {
    try {
      await disableUser({ _id: userId });
      // Refetch users after disabling a user
      refetch();
    } catch (error) {
      console.error(error);
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
          ?.filter((user) => !user.isDisabled)
          .sort((a, b) => a.reviews - b.reviews)
          .map((user: User) => (
            <div className={styles.contens}>
              <img className={styles.image} src={user.image} alt={user.name} />
              <div className={styles.text}>
                <p>{Number(user.reviews.toFixed(1))}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
              {!user.isDisabled && (
                <button
                  onClick={() => handleDisableUser(user._id)}
                  disabled={disableLoading}
                  className={styles.botton}
                >
                  Disable User
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminDisabled;
