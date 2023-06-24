"use client"

import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useDisableUserMutation,
} from "../../redux/services/userApi";
import { User } from "../../redux/services/userApi";

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
    <div>
      <h1>Disable Panel</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          overflowY: "scroll",
          maxHeight: "400px",
          width: "600px",
          backgroundColor: "white",
        }}
      >
          {filteredUsers?.filter(user => !user.isDisabled).sort((a,b) => a.reviews - b.reviews).map((user: User) => (
          <div
            key={user._id}
            style={{
              display: "flex",
              alignItems: "center",
              height: "60px",
              borderBottom: "1px solid gray",
              padding: "10px",
            }}
            >
          
            <img src={user.image} alt={user.name} width="50" height="50" />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p>{Number(user.reviews.toFixed(1))}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
            {!user.isDisabled && (
              <button
                onClick={() => handleDisableUser(user._id)}
                disabled={disableLoading}
                style={{ marginLeft: "auto" }}
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



